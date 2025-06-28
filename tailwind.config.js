/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-down': 'slideDown 0.6s ease-out',
                'slide-right': 'slideRight 0.6s ease-out',
                'slide-left': 'slideLeft 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'logo-bounce': 'logoBounce 2s ease-in-out infinite',
                'gradient-shift': 'gradientShift 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideRight: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideLeft: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                logoBounce: {
                    '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '40%, 43%': { transform: 'translate3d(0, -10px, 0)' },
                    '70%': { transform: 'translate3d(0, -5px, 0)' },
                    '90%': { transform: 'translate3d(0, -2px, 0)' },
                },
                gradientShift: {
                    '0%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                    '100%': { 'background-position': '0% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            backgroundColor: {
                'glass': 'rgba(255, 255, 255, 0.1)',
            },
            borderColor: {
                'glass': 'rgba(255, 255, 255, 0.2)',
            },
        },
    },
    plugins: [],
}
