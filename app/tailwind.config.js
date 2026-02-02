/** @type {import('tailwindcss').Config} */

const dingobytes = {
    colors: {
        "blaze-orange": {
            DEFAULT: '#FF6600',
            50: '#FFD4B8',
            100: '#FFC8A3',
            200: '#FFAF7A',
            300: '#FF9752',
            400: '#FF7E29',
            500: '#FF6600',
            600: '#C75000',
            700: '#8F3900',
            800: '#572300',
            900: '#1F0C00',
            950: '#030100'
        },
        platinum: {
            DEFAULT: '#EBEBEB',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#FFFFFF',
            300: '#FFFFFF',
            400: '#FFFFFF',
            500: '#EBEBEB',
            600: '#CFCFCF',
            700: '#B3B3B3',
            800: '#979797',
            900: '#7B7B7B',
            950: '#6D6D6D'
        },
        silver: {
            DEFAULT: '#C0C0C0',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#FDFDFD',
            300: '#E9E9E9',
            400: '#D4D4D4',
            500: '#C0C0C0',
            600: '#A4A4A4',
            700: '#888888',
            800: '#6C6C6C',
            900: '#505050',
            950: '#424242'
        },
        "bright-ocean": {
            DEFAULT: '#3A88D1',
            50: '#CFE2F4',
            100: '#BED8F0',
            200: '#9DC4E8',
            300: '#7CB0E0',
            400: '#5B9CD9',
            500: '#3A88D1',
            600: '#286CAB',
            700: '#1D4F7D',
            800: '#133250',
            900: '#081623',
            950: '#03070C'
        },
        "steel-azure": {
            DEFAULT: '#004E98',
            50: '#51AAFF',
            100: '#3CA0FF',
            200: '#138CFF',
            300: '#0078EA',
            400: '#0063C1',
            500: '#004E98',
            600: '#003160',
            700: '#001428',
            800: '#000000',
            900: '#000000',
            950: '#000000'
        },
    }
}

export default {
    content: [
        // Nuxt 4 / codemod: source lives under ./app/ (srcDir)
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/**/*.vue",
        // Markdown content: HTML with Tailwind classes must be scanned or they get purged
        "./content/**/*.md",
        "./composables/**/*.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: dingobytes.colors['blaze-orange'],
                secondary: dingobytes.colors['steel-azure'],
                light: dingobytes.colors['bright-ocean'],
                platinum: dingobytes.colors.platinum,
                silver: dingobytes.colors.silver,
                "steel-azure": dingobytes.colors['steel-azure'],
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                hind: ['Hind', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
    // Preserve Tailwind classes used in markdown HTML (e.g. alert boxes) when content scan misses them
    safelist: [
        { pattern: /^(bg-red|text-red|border-red|rounded-t|rounded-b|px-4|py-2|py-3|font-bold|border|border-t-0)/ },
    ],
}

