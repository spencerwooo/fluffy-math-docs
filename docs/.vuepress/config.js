module.exports = {
  title: 'Fluffy Math',
  description: '四则运算计算题的生成与解决类库',
  base: '/fluffy-math-docs/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.png'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#00ABE9'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: '/favicon.png'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/favicon.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#06BDFF'
    }]
  ],
  themeConfig: {
    nav: [
      {
        text: '小组成员',
        items: [{
          text: 'Spencer',
          link: '/Spencer/'
        },{
          text: 'Garvey',
          link: '/Garvey/'
        }]
      },{
        text: 'GitHub',
        items: [{
          text: 'Fluffy Math Core',
          link: 'https://github.com/spencerwooo/fluffy-math'
        },{
          text: 'Fluffy Math Frontend',
          link: 'https://github.com/spencerwooo/fluffy-math-spa'
        }]
      }
    ],
    sidebar: {
      '/Spencer/': [''],
      '/Garvey/': [''],
      '/': ['']
    },
    lastUpdated: 'Last Updated'
  }
}