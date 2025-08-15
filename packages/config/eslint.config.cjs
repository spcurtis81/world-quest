module.exports = { root:false, parser:"@typescript-eslint/parser",
  plugins:["@typescript-eslint","import","unused-imports","react"],
  extends:["eslint:recommended","plugin:@typescript-eslint/recommended","plugin:import/recommended","plugin:import/typescript","plugin:react/recommended"],
  settings:{ react:{ version:"detect" } },
  rules:{ "unused-imports/no-unused-imports":"warn", "import/order":["warn",{ "alphabetize":{"order":"asc"}, "newlines-between":"always"}] } };
