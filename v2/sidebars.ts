import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  docsSidebar: [
    'index',
    {
      type: 'category',
      label: 'DevOps',
      items: [
        {
          type: 'category',
          label: 'Databases',
          items: [
            'devops/databases/postgres',
            'devops/databases/mysql-tips',
            'devops/databases/bash-mysql-backup',
            'devops/databases/node-mongo',
          ],
        },
        {
          type: 'category',
          label: 'Linux Tips',
          items: [
            'devops/linux-tips/welcome-banner',
            'devops/linux-tips/user-management',
            'devops/linux-tips/lets-encrypt',
            'devops/linux-tips/performance-testing-commands',
            'devops/linux-tips/general-tips',
            'devops/linux-tips/tomcat',
            'devops/linux-tips/fail-2-ban',
            'devops/linux-tips/tasksel',
            'devops/linux-tips/recursive-delete',
          ],
        },
        {
          type: 'category',
          label: 'Networking',
          items: ['devops/networking/go-access', 'devops/networking/ngrok'],
        },
        {
          type: 'category',
          label: 'Miscellaneous',
          items: [
            'devops/misc/docker',
            'devops/misc/environment-vars',
            'devops/misc/load-testing',
            'devops/misc/putty',
            'devops/misc/redis',
            'devops/misc/sitemap-gen',
            'devops/misc/vbox',
            'devops/misc/wsl-lamp',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Engineering',
      items: [
        {
          type: 'category',
          label: 'Git',
          items: [
            'engineering/git/git-quickstart',
            'engineering/git/gitignore',
            'engineering/git/undo-mistakes',
            'engineering/git/rebase-merge',
            'engineering/git/no-merge-commit',
            'engineering/git/migrate',
            'engineering/git/friend-finder',
            'engineering/git/empty-commit',
          ],
        },
        {
          type: 'category',
          label: 'JavaScript',
          items: [
            {
              type: 'category',
              label: 'Jest',
              items: ['engineering/javascript/jest/helpful-tips'],
            },
            {
              type: 'category',
              label: 'Node.js',
              items: [
                'engineering/javascript/node/colour-logging',
                'engineering/javascript/node/eslintrc',
                'engineering/javascript/node/node-cleanup',
              ],
            },
            {
              type: 'category',
              label: 'NPM',
              items: [
                'engineering/javascript/npm/local-packages',
                'engineering/javascript/npm/npm-tips',
                'engineering/javascript/npm/nvm',
              ],
            },
            {
              type: 'category',
              label: 'React',
              items: [
                'engineering/javascript/react/msw-search-method',
                'engineering/javascript/react/msw-unhandled-requests',
                'engineering/javascript/react/react-class-timeout',
                'engineering/javascript/react/react-devtools',
                'engineering/javascript/react/scroll-top-HOC',
              ],
            },
            {
              type: 'category',
              label: 'Snippets',
              items: [
                'engineering/javascript/snippets/currying',
                'engineering/javascript/snippets/debounce',
                'engineering/javascript/snippets/match-all',
                'engineering/javascript/snippets/svg-wrap-hack',
              ],
            },
            {
              type: 'category',
              label: 'Test Doubles',
              items: [
                'engineering/javascript/test-double/stubbing-chained-methods',
              ],
            },
            {
              type: 'category',
              label: 'TypeScript',
              items: [
                'engineering/javascript/ts/typescript-omit-function',
                'engineering/javascript/ts/typescript-range-type',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Miscellaneous',
          items: [
            'engineering/misc/atom',
            'engineering/misc/cli-spellcheck',
            'engineering/misc/generate-sha',
            'engineering/misc/joel',
            'engineering/misc/markdown-tips',
            'engineering/misc/mkdocs-swagger',
            'engineering/misc/xmlhttp',
          ],
        },
        {
          type: 'category',
          label: 'Ruby',
          items: ['engineering/ruby/handling-json'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Sysadmin',
      items: [
        {
          type: 'category',
          label: 'macOS',
          items: [
            'sysadmin/macos/screen',
            'sysadmin/macos/terminal',
            'sysadmin/macos/xc-run',
          ],
        },
        {
          type: 'category',
          label: 'Windows',
          items: [
            'sysadmin/windows/lost-window',
            'sysadmin/windows/powershell',
            'sysadmin/windows/reserved-ports',
            'sysadmin/windows/robocopy',
            'sysadmin/windows/vmmem',
          ],
        },
      ],
    },
  ],
}

export default sidebars
