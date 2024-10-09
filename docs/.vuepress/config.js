module.exports = {
  title: "Careteen's Blog",
  description: "Careteen's Blog",
  // base: '/blog/',
  base: "/",
  themeConfig: {
    nav: [
      {
        text: "作品",
        link: "/production/",
      },
      {
        text: "文章",
        link: "/article/",
      },
      {
        text: "内推",
        link: "/recruit/",
      },
    ],
    sidebar: {
      "/production/": [""],
      "/article/": [""],
      "/": [""],
    },
    lastUpdated: "Last Updated",
    repo: "careteenL/blog",
    docsDir: "docs",
    editLinks: true,
    smoothScroll: true,
  },
};
