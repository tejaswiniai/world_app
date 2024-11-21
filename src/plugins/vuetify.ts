// src/plugins/vuetify.ts

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
  directives,
    theme: {
        themes: {
            light: {
                colors: {
                    primary: 'hsl(200, 15%, 8%)', //text
                    secondary: 'hsl(0, 0%, 100%)', //ele bg
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                    background:'hsl(0, 0%, 98%)' //bg
                },
            },
            dark: {
                colors: {
                    primary: 'hsl(0, 0%, 100%)', //text
                    secondary: 'hsl(209, 23%, 22%)', //ele bg
                    accent: '#03DAC6',
                    error: '#CF6679',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                    background:'hsl(207, 26%, 17%)' //bg
                },
            },
        },
        defaultTheme: 'light', // Set the default theme to light
    },
});

export default vuetify;
