import React from "react";

export function ShowMore(props: { style?: React.CSSProperties | undefined }) {
    return (
        <svg
            {...props}
            viewBox="0 0 13 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.382387 2.22945L6.47753 8.32459L6.49599 8.30613L6.52217 8.33231L12.6173 2.23716C13.1274 1.72713 13.1274 0.900189 12.6173 0.39015C12.1073 -0.119889 11.2803 -0.119888 10.7703 0.390151L6.50371 4.65674L2.2294 0.38243C1.71936 -0.12761 0.892425 -0.127609 0.382386 0.38243C-0.127653 0.892469 -0.127653 1.71941 0.382387 2.22945Z"
                fill="#949494"
            />
        </svg>
    )
}