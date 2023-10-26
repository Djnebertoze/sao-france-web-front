const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'fr-FR',
        locales: ['fr-FR', 'en-US'],
        localeDetection: false,
    },
    localePath: path.resolve('./public/locales'),
};
