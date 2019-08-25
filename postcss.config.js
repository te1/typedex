const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./public/index.html', './src/**/*.vue'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelistPatterns: [
    /normal$/,
    /fire$/,
    /water$/,
    /electric$/,
    /grass$/,
    /ice$/,
    /fighting$/,
    /poison$/,
    /ground$/,
    /flying$/,
    /psychic$/,
    /bug$/,
    /rock$/,
    /ghost$/,
    /dragon$/,
    /dark$/,
    /steel$/,
    /fairy$/,
  ],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
