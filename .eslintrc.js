module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-sieutoc`
  extends: ["sieutoc"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
