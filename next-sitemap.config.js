/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'http://coverpagemaker.com',
    generateRobotsTxt: true, // (optional)
    // ...other options
}