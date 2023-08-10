import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './src/styles/style.scss';

const baseLightTheme = {
    dark: false,
    colors: {
        background: '#ffffff',
        surface: '##f0f0f0',
        primary: '#007bff',
        'primary-darken-1' : '#17c671',
        secondary: '#17c671',
    }
}

const baseDarkTheme = {
    dark: true,
    colors: {
        background: '#121212',
        surface: '#333333',
        primary: '#ff9800',
        secondary: '#ff7043',
    }
}

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        defaultTheme: 'baseLightTheme',
        themes: {
            baseLightTheme,
            baseDarkTheme
        }
    }
})