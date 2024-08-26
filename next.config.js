const withMDX = require('@next/mdx')()

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['next-mdx-remote'],

})