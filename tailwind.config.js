module.exports = {
  content: [
    "./_includes/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./posts/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./.eleventy.js",
    "./src/index.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
