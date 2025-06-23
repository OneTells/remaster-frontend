#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};
use tauri::{Manager, RunEvent};
use tauri_plugin_shell::process::{CommandChild};
use tauri_plugin_shell::ShellExt;


fn spawn_sidecar(app_handle: tauri::AppHandle) -> Result<(), String> {
    // Check if a sidecar process already exists
    if let Some(state) = app_handle.try_state::<Arc<Mutex<Option<CommandChild>>>>() {
        let child_process = state.lock().unwrap();
        if child_process.is_some() {
            println!("[tauri] Sidecar is already running. Skipping spawn.");
            return Ok(());
        }
    }

    // Spawn sidecar
    let (mut _rx, child) = app_handle
        .shell()
        .sidecar("api")
        .map_err(|e| e.to_string())?
        .spawn()
        .map_err(|e| e.to_string())?;

    // Store the child process in the app state
    if let Some(state) = app_handle.try_state::<Arc<Mutex<Option<CommandChild>>>>() {
        *state.lock().unwrap() = Some(child);
    } else {
        return Err("Failed to access app state".to_string());
    }

    Ok(())
}

#[tauri::command]
fn show_window(window: tauri::Window) -> Result<(), String> {
    window
        .show()
        .map_err(|e| format!("Failed to show window: {}", e))?;
    window
        .set_focus()
        .map_err(|e| format!("Failed to set focus: {}", e))?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|_app, _argv, _cwd| {}))
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            app.manage(Arc::new(Mutex::new(None::<CommandChild>)));

            let app_handle = app.handle().clone();

            println!("[tauri] Creating sidecar...");
            spawn_sidecar(app_handle).ok();
            println!("[tauri] Sidecar spawned and monitoring started.");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![show_window])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app_handle, event| match event {
            RunEvent::ExitRequested { .. } => {
                let Some(child_process) = app_handle.try_state::<Arc<Mutex<Option<CommandChild>>>>() else { return };
                let Ok(mut child) = child_process.lock() else { return };
                let Some(process) = child.as_mut() else { return };

                let command = "sidecar shutdown\n";
                let buf: &[u8] = command.as_bytes();
                let _ = process.write(buf);

                println!("[tauri] Sidecar closed.");
            }
            _ => {}
        });
}
