require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `Carson Wright`,
    // Default title of the page
    siteTitleAlt: `Carson Wright`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Carson Wright - Designer and Keyboard Enthusiast`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://carsonwright.me`,
    // Used for SEO
    siteDescription: `Hey I'm Carson and you've found the home of all my mechanical keyboard projects. Here you'll find weekly status updates, general project information including where to purchase my work, and any documentation relating to my designs.`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `Carson Wright`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        blogPath: `/updates`,
        navigation: [
          {
            title: `Updates`,
            slug: `/updates`,
          },
          {
            title: `Projects`,
            slug: `/projects`,
          },
          {
            title: `Store`,
            slug: `/store`,
          },
        ],
        externalLinks: [
          {
            name: `Store`,
            url: `https://store.carsonwright.me`,
          },
          {
            name: `Discord`,
            url: `https://discord.gg/tfCnAxaYtR`,
          },
          {
            name: `Instagram`,
            url: `https://www.instagram.com/carsonwrightdesign/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "products-pages",
        path: "./content/products",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "project-info",
        path: "./content/projects",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Carson Wright - Custom Keyboard Design`,
        short_name: `Carson Wright`,
        description: `Hey I'm Carson and you've found the (temporary) home of all my mechanical keyboard projects. Here you'll find weekly status updates, general project information including where to purchase my work, and any documentation relating to my designs.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000000`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // without options
          "gatsby-remark-normalize-paths",
          // or
          // with options
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
