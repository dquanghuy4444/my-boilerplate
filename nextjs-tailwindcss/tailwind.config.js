const colors = require('tailwindcss/colors');

const DEFAULT_COLOR = {
    'primary': 'var(--color-primary--main)',
    'primary--dark': 'var(--color-primary--dark)',
    'primary--light': 'var(--color-primary--light)',
    'secondary': 'var(--color-secondary--main)',
    'secondary--dark': 'var(--color-secondary--dark)',
    'secondary--light': 'var(--color-secondary--light)',
    transparent: 'transparent',
    current: 'currentColor',
    white: colors.white,
    black: colors.black
};

module.exports = {
    mode: 'jit',
    purge: [
        './src/pages/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
        './src/containers/**/*.{js,jsx,ts,tsx}',
        './src/layout/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            tablet: '768px',
            laptop: '1024px',
            desktop: '1280px'
        },
        zIndex: {
            9: '9',
            99: '99',
            999: '999',
            9999: '9999',
            99999: '99999',
            999999: '999999'
        },
        colors: DEFAULT_COLOR,
        textColor: DEFAULT_COLOR,
        borderColor: (theme) => ({
            ...theme('colors'),
            ...DEFAULT_COLOR
        }),
        extend: {
            boxShadow: {
                DEFAULT: 'var(--box-shadow-primary)'
            },
            maxWidth: {
                "primary": 'var(--max-width-primary)'
            },
            minWidth: {
                0: '0',
                '1/6': '16.7%',
                '1/5': '20%',
                '1/4': '25%',
                '1/3': '33.3%',
                '1/2': '50%',
                screen: '100vw'
            },
            spacing: {
                0: '0',
                1: '0.25rem',
                2: '0.5rem',
                3: '0.75rem',
                4: '1rem',
                5: '1.25rem',
                6: '1.5rem',
                7: '1.75rem',
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem'
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            textColor: ['hover'],
            backgroundOpacity: ['hover'],
            opacity: ['active , hover'],
            transform: ['hover'],
            width: ['hover', 'focus'],
            boxShadow: ['hover']
        }
    },
    plugins: [],
    corePlugins: {
        maxWidth: true,
        minWidth: true,
        height: true
    }
};
