module.exports = {
  title: 'Careteen',
  description: 'Careteen Blog',
  base: '/blog/',
  themeConfig: {
    nav: [
      {
        text: '作品',
        link: '/production/'
      },
      {
        text: '文章',
        link: '/article/'
      },
    ],
    sidebar: {
      '/production/': [
        ''
      ],
      '/article/': [
        ''
      ],
      '/': [
        ''
      ],
    },
    lastUpdated: 'Last Updated',
    repo: 'careteenL',
    smoothScroll: true,
  }
}
