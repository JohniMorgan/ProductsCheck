import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './src/styles/style.scss';

const baseLightTheme = {
    dark: false,
    colors: {
        background: '#ffffff',
        surface: '#f5f5f5',
        primary: '#2196F3',
        'on-primary': '#ffffff',
        'primary-hover': '#64b5f6',
        active: '#66bb6A',
        text: '#333333',
        graphic: '#4caf50',
    }
}

const baseDarkTheme = {
    dark: true,
    colors: {
        background: '#121212',
        surface: '#1f1f1f',
        primary: '#e65100',
        'on-primary': "#ffffff",
        'primary-hover': 'ff6f00',
        active: '#ff7043',
        text: '#ffffff',
        graphic: '4caf50',
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
    },
})