/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://mytechfolio.live',
    generateRobotsTxt: true, // (optional)
    exclude: ['/server-sitemap-index.xml'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://mytechfolio.live/server-sitemap-index.xml', // <==== Add here
        ],
    },
}