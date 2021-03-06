const config = require('./contrib/config.js')
const fs = require('fs')
const admonitions = require('remark-admonitions');

const links = [
  {
    to: 'index',
    activeBasePath: `docs`,
    label: `Docs`,
    position: 'left',
  },
  {
    href: 'https://www.ory.sh/blog', label: 'Blog',
    position: 'left',
  },
  {
    href: 'https://community.ory.sh', label: 'Forum',
    position: 'left',
  },
  {
    href: 'https://www.ory.sh/chat', label: 'Chat',
    position: 'left',
  },
  {
    href: `https://github.com/ory/${config.projectSlug}`,
    label: 'GitHub',
    position: 'left',
  },
]

if (fs.existsSync('./versions.json')) {
  const version = require('./versions.json');
  if (version && version.length > 0) {
    links.push({
      label: version[0],
      position: 'right',
      to: 'versions'
    });
  }
}

module.exports = {
  title: config.projectName,
  tagline: config.projectTagLine,
  url: `https://www.ory.sh/`,
  baseUrl: `/docs/`,
  favicon: 'img/favico.png',
  organizationName: 'ory', // Usually your GitHub org/user name.
  projectName: config.projectSlug, // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-71865250-1',
      anonymizeIP: true,
    },
    algolia: {
      apiKey: '8463c6ece843b377565726bb4ed325b0',
      indexName: 'ory',
      algoliaOptions: {
        facetFilters: [['tags:ecosystem','tags:cloud', 'tags:hydra', 'tags:keto', 'tags:oathkeeper', 'tags:kratos']],
      },
    },
    navbar: {
      logo: {
        alt: config.projectName,
        src: `img/logo-${config.projectSlug}.svg`,
        href: 'https://www.ory.sh/'
      },
      links: links
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} ORY GmbH`,
      links: [
        {
          title: 'Company',
          items: [
            {
              label: 'Imprint',
              href: 'https://www.ory.sh/imprint',
            },
            {
              label: 'Privacy',
              href: 'https://www.ory.sh/privacy',
            },
            {
              label: 'Terms',
              href: 'https://www.ory.sh/tos',
            },
          ],
        },
      ],
    },
  },
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        path: config.projectSlug === 'docusaurus-template' ? 'contrib/docs' : 'docs',
        sidebarPath: require.resolve('./contrib/sidebar.js'),
        editUrl:
          `https://github.com/ory/docs/edit/master`,
        routeBasePath: '',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [admonitions],
      },
    ],
    [
      "@docusaurus/plugin-content-pages",
    ],
    ["@docusaurus/plugin-google-analytics"],
    ["@docusaurus/plugin-sitemap"]
  ],
  themes: [
    [
      "@docusaurus/theme-classic",
      {
        customCss: config.projectSlug === 'docusaurus-template' ? require.resolve('./contrib/theme.css') : require.resolve('./src/css/theme.css'),
      }
    ], [
      "@docusaurus/theme-search-algolia"
    ]
  ],
};
