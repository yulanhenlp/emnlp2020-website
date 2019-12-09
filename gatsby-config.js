module.exports = {
  siteMetadata: {
    title: "EMNLP 2020 Conference",
    siteUrl: "https://2020.emnlp.org",
    sponsors: [],
    sponsorLevels: []
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sass",
    "gatsby-plugin-remove-trailing-slashes",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    "gatsby-transformer-csv",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-141744087-1",
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/img/favicon.png",
      },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
