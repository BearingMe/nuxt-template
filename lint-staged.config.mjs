export default {
  "*.{js,cjs,mjs,ts}": ["eslint --fix", "prettier --write"],

  "*.{json,css,scss,md}": ["prettier --write"],

  "*.vue": ["eslint --fix", "prettier --write"],
};
