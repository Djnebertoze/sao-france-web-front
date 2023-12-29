import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const fonts = {
    body: 'Zen Kaku Gothic New',
};

const colors = {
    blue: {
        500: '#3552e3',
        600: '#5194dd',
    },
    white: {
        500: '#ffffff',
        600: '#f1f1f1',
    }
};

const breakpoints = {
    base: "0em", // 0px
    vsm: "21em", // ~338px
    sm: "30em", // ~480px. em is a relative unit and is dependent on the font size.
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
};


export const theme = extendTheme({ fonts, colors, config, breakpoints });