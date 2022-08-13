const colors = require("tailwindcss/colors")

const DEFAULT_COLOR = {
    primary: "var(--color-brand-primary)",
    "primary--light": "var(--color-brand-primary--light)",
    "primary--darknight": "var(--color-brand-primary--darknight)",
    "primary--dark": "var(--color-brand-primary--dark)",
    secondary: "var(--color-brand-secondary)",
    tertiary: "var(--color-brand-tertiary)",
    quaternary: "var(--color-brand-quaternary)",
    quinary: "var(--color-brand-quinary)",
    "quinary--light": "var(--color-brand-quinary--light)",
    border: "var(--color-border)",
    hover: "var(--color-hover)",
    transparent: "transparent",
    current: "currentColor",
    white: colors.white,
    black: colors.black
}

module.exports = {
    mode: "jit",
    purge: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/containers/**/*.{js,jsx,ts,tsx}",
        "./src/layout/**/*.{js,jsx,ts,tsx}"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            tablet: "768px",
            laptop: "1024px",
            desktop: "1280px"
        },
        zIndex: {
            6: "60",
            7: "70",
            8: "80",
            9: "90",
            10: "100",
            9999: "9999",
            99999: "99999",
            999999: "999999"
        },
        fontFamily: {
            primary: "var(--fontFamily-primary)"
        },
        colors: DEFAULT_COLOR,
        boxShadow: {
            DEFAULT: "var(--boxShadow-primary)",
            secondary: "var(--boxShadow-secondary)",
            tertiary: "var(--boxShadow-tertiary)",
            border: "var(--boxShadow-border)",
            "bottom-primary": "var(--boxShadow-bottom-primary)"
        },
        textColor: DEFAULT_COLOR,
        borderColor: (theme) => ({
            ...theme("colors"),
            ...DEFAULT_COLOR
        }),
        extend: {
            flex: {
                0: "0 0 auto"
            },
            outline: {
                secondary: "2px solid var(--color-brand-secondary)",
                "primary--darknight": "2px solid var(--color-brand-primary--darknight)"
            },
            fontSize: {
                0: "0rem"
            },
            maxWidth: {
                page: "var(--maxWidth-page)",
                halfOfPage: "var(--maxWidth-halfOfPage)",
                screen: "100vw"
            },
            minWidth: {
                navMobile: "var(--minWidth-navMobile)",
                0: "0",
                "1/6": "16.7%",
                "1/5": "20%",
                "1/4": "25%",
                "1/3": "33.3%",
                "1/2": "50%",
                "3/4": "75%",
                screen: "100vw"
            },
            spacing: {
                "3/10": "30%",
                0: "0",
                1: "0.25rem",
                2: "0.5rem",
                3: "0.75rem",
                4: "1rem",
                5: "1.25rem",
                6: "1.5rem",
                7: "2rem",
                8: "2.5rem",
                9: "3rem",
                10: "3.5rem",
                11: "4rem"
            },
            height: {
                fit: "fit-content"
            },
            scale: {
                102: "1.02"
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
            textColor: ["hover"],
            backgroundOpacity: ["hover"],
            opacity: ["active , hover"],
            transform: ["hover"],
            width: ["hover", "focus"],
            boxShadow: ["hover"]
        }
    },
    plugins: [],
    corePlugins: {
        maxWidth: true,
        minWidth: true,
        height: true
    }
}
