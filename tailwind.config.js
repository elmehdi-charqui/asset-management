import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
                display: ['Syne', 'sans-serif'],
            },
            colors: {
                ocp: {
                    green: '#006B3F',
                    navy: '#0A0F1E',
                    sidebar: '#0D1321',
                    gold: '#C9A84C',
                    accent: '#10B981',
                    light: '#F8FAFC',
                }
            }
        },
    },

    plugins: [forms],
};
