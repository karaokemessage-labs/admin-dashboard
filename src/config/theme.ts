// Theme Configuration
// Primary Color: #fcd535 (Golden Yellow - Kara Club Brand Color)

export const themeConfig = {
    colors: {
        primary: {
            DEFAULT: '#fcd535',
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#fcd535', // Primary
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
        },
        secondary: {
            DEFAULT: '#1e293b',
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
        },
        success: {
            DEFAULT: '#22c55e',
            light: '#dcfce7',
            dark: '#16a34a',
        },
        warning: {
            DEFAULT: '#f59e0b',
            light: '#fef3c7',
            dark: '#d97706',
        },
        error: {
            DEFAULT: '#ef4444',
            light: '#fee2e2',
            dark: '#dc2626',
        },
        info: {
            DEFAULT: '#3b82f6',
            light: '#dbeafe',
            dark: '#2563eb',
        },
    },

    // Semantic colors for UI components
    ui: {
        background: '#f8fafc',
        surface: '#ffffff',
        border: '#e2e8f0',
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
            muted: '#94a3b8',
        },
    },
};

// CSS Variables for use in stylesheets
export const cssVariables = {
    '--color-primary': '#fcd535',
    '--color-primary-hover': '#facc15',
    '--color-primary-active': '#eab308',
    '--color-primary-light': '#fef9c3',
    '--color-primary-dark': '#ca8a04',
};

// Tailwind-compatible color classes
export const colorClasses = {
    primary: {
        bg: 'bg-[#fcd535]',
        bgHover: 'hover:bg-[#facc15]',
        bgLight: 'bg-[#fef9c3]',
        text: 'text-[#fcd535]',
        textDark: 'text-[#ca8a04]',
        border: 'border-[#fcd535]',
    },
};

export default themeConfig;
