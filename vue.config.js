
module.exports = {
  pages: {
    index: 'src/index.ts',
    example: 'example/index.js'
  },
  publicPath: './',
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  css: { extract: false }
}
