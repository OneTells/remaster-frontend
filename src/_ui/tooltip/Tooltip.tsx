import React, {useEffect, useMemo, useRef, useState} from 'react';


type Props = {
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    width?: number | string;
    maxWidth?: number | string;
    offset?: number;
    textAlign?: 'left' | 'center' | 'right';
    hideOnTooltipHover?: boolean;
}

export function Tooltip(
    {
        text,
        children,
        position = 'bottom',
        align = 'center',
        width = 'auto',
        maxWidth = '300px',
        offset = 8,
        textAlign = 'center',
        hideOnTooltipHover = true,
    }: Props
) {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({position, align});
    const tooltipRef = useRef<HTMLDivElement>(null);
    const tooltipContentRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    const handleTooltipMouseEnter = () => hideOnTooltipHover && setVisible(false);

    useEffect(() => {
        if (!visible || !tooltipRef.current || !tooltipContentRef.current) return;

        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const contentRect = tooltipContentRef.current.getBoundingClientRect();
        const {innerWidth: winW, innerHeight: winH} = window;

        let newPosition = position;
        let newAlign = align;

        const fitsBottom = tooltipRect.bottom + contentRect.height + offset <= winH;
        const fitsTop = tooltipRect.top - contentRect.height - offset >= 0;
        const fitsRight = tooltipRect.right + contentRect.width + offset <= winW;
        const fitsLeft = tooltipRect.left - contentRect.width - offset >= 0;

        if (position === 'bottom' && !fitsBottom && fitsTop) newPosition = 'top';
        else if (position === 'top' && !fitsTop && fitsBottom) newPosition = 'bottom';
        else if (position === 'right' && !fitsRight && fitsLeft) newPosition = 'left';
        else if (position === 'left' && !fitsLeft && fitsRight) newPosition = 'right';

        if (['top', 'bottom'].includes(newPosition)) {
            if (align === 'start' && tooltipRect.left + contentRect.width > winW) newAlign = 'end';
            if (align === 'end' && tooltipRect.right - contentRect.width < 0) newAlign = 'start';
        } else {
            if (align === 'start' && tooltipRect.top + contentRect.height > winH) newAlign = 'end';
            if (align === 'end' && tooltipRect.bottom - contentRect.height < 0) newAlign = 'start';
        }

        setPos({position: newPosition, align: newAlign});
    }, [visible, position, align, offset]);

    const tooltipStyle = useMemo(() => {
        const style: React.CSSProperties = {
            position: 'absolute',
            zIndex: 1000,
            padding: '8px 12px',
            borderRadius: '6px',
            backgroundColor: '#4e5057',
            color: '#fff',
            fontSize: '12px',
            lineHeight: '1.4',
            visibility: visible ? 'visible' : 'hidden',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.2s ease, visibility 0.2s ease',
            width: typeof width === 'number' ? `${width}px` : width,
            maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            textAlign,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            pointerEvents: hideOnTooltipHover ? 'auto' : 'none',
        };

        const offsetPx = `${offset}px`;

        const vertical = pos.position === 'top' || pos.position === 'bottom';
        const horizontal = pos.position === 'left' || pos.position === 'right';

        if (vertical) {
            Object.assign(style,
                pos.position === 'top' ? {bottom: `calc(100% + ${offsetPx})`} : {top: `calc(100% + ${offsetPx})`}
            );
            style.left = pos.align === 'center' ? '50%' : pos.align === 'end' ? 'auto' : '0';
            style.right = pos.align === 'end' ? '0' : undefined;
            if (pos.align === 'center') style.transform = 'translateX(-50%)';
        }

        if (horizontal) {
            Object.assign(style,
                pos.position === 'left' ? {right: `calc(100% + ${offsetPx})`} : {left: `calc(100% + ${offsetPx})`}
            );
            style.top = pos.align === 'center' ? '50%' : pos.align === 'end' ? 'auto' : '0';
            style.bottom = pos.align === 'end' ? '0' : undefined;
            if (pos.align === 'center') style.transform = 'translateY(-50%)';
        }

        return style;
    }, [visible, width, maxWidth, textAlign, hideOnTooltipHover, pos, offset]);

    return (
        <div
            ref={tooltipRef}
            className="tooltip-container"
            style={{position: 'relative', display: 'inline-block'}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div
                ref={tooltipContentRef}
                className="tooltip-content"
                style={tooltipStyle}
                onMouseEnter={handleTooltipMouseEnter}
            >
                {text}
            </div>
        </div>
    );
}
