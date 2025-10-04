import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

import { getImageUrl } from "./src/utils/images";

const config: Config = {
  title: "react-text-to-speech",
  tagline: "An easy to use React.js library for converting text to speech.",
  favicon: getImageUrl("favicon.ico"),

  // Set the production url of your site here
  url: "https://rtts.vercel.app/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "SahilAggarwal2004", // Usually your GitHub org/user name.
  projectName: "react-text-to-speech", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/SahilAggarwal2004/react-text-to-speech/tree/master/website/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: "https://github.com/SahilAggarwal2004/react-text-to-speech/tree/master/website/",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-VRHGDS097Y",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "react-text-to-speech",
      // logo: {
      //   alt: "react-text-to-speech Logo",
      //   src: getImageUrl("logo.jpeg"),
      // },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        { to: "/faqs", label: "FAQs", position: "left" },
        { to: "/demo", label: "Demo", position: "left" },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/SahilAggarwal2004/react-text-to-speech",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/docs/",
            },
            {
              label: "Usage",
              to: "/docs/usage/useSpeech",
            },
            {
              label: "API Reference",
              to: "/docs/api/useSpeech",
            },
          ],
        },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/react-text-to-speech",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/docusaurus",
        //     },
        //   ],
        // },
        {
          title: "More",
          items: [
            // {
            //   label: "Blog",
            //   to: "/blog",
            // },
            {
              label: "GitHub",
              href: "https://github.com/SahilAggarwal2004/react-text-to-speech",
            },
            {
              label: "npm",
              href: "https://www.npmjs.com/package/react-text-to-speech",
            },
            {
              label: "Product Hunt",
              href: "https://www.producthunt.com/posts/react-text-to-speech",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} react-text-to-speech`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
