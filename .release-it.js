const COMMIT_HASH_LENGTH = 7;

const typeMap = {
  feat: "Features",
  fix: "Bug Fixes",
  chore: "Chores",
  perf: "Performance Improvements",
  revert: "Reverts",
  docs: "Documentation",
  style: "Styles",
  refactor: "Code Refactoring",
  test: "Tests",
  build: "Build System",
  ci: "Continuous Integration",
};

module.exports = {
  git: {
    commit: true,
    tag: true,
    push: true,
    commitMessage: "release: ${version}",
    tagName: "v${version}",
  },
  github: {
    release: true,
  },
  hooks: {
    "after:bump": "pnpm run compile",
    "after:release": "pnpm run deploy && pnpm run publish",
  },
  npm: {
    publish: false,
  },
  plugins: {
    "@release-it/bumper": {
      in: "./package/package.json",
      out: "./package/package.json",
    },
    "@release-it/conventional-changelog": {
      preset: "conventionalcommits",
      infile: "CHANGELOG.md",
      writerOpts: {
        transform: (commit, context) => {
          const notes = commit.notes.map((note) => ({ ...note, title: "BREAKING CHANGES" }));
          const type = typeMap[commit.type] || "Other";
          const scope = commit.scope === "*" ? "" : commit.scope;
          const shortHash = typeof commit.hash === "string" ? commit.hash.substring(0, COMMIT_HASH_LENGTH) : commit.shortHash;
          const issues = [];

          let message = commit.subject || "";
          if (message) {
            if (!/[.!?]$/.test(message)) message += ".";
            message += " ";
          }
          if (commit.body) message += commit.body.trim();

          let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl;
          if (url) {
            url = `${url}/issues/`;
            // Issue URLs
            message = message.replace(/#([0-9]+)/g, (_, issue) => {
              issues.push(issue);
              return `[#${issue}](${url}${issue})`;
            });
          }

          if (context.host) {
            // User URLs
            message = message.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
              if (username.includes("/")) return `@${username}`;
              return `[@${username}](${context.host}/${username})`;
            });
          }

          // remove references that already appear in the subject/body
          const references = commit.references.filter((reference) => !issues.includes(reference.issue));

          return {
            notes,
            type,
            scope,
            shortHash,
            subject: message,
            references,
          };
        },
      },
    },
  },
};
