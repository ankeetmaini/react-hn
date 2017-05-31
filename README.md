## running
```
npm install
npm start
```

if you're building it for the first time you'll get this error
`Error: ENOENT: no such file or directory` which is because `index.html` doesn't exist.

Calm down and do `npm run build && npm run start`

## global styles - whose classnames are not changed by post-css
- app can have at most one global stylesheet
- add the file at the root of the app, and name it `<app-name>-global-styles.css`
- you can declare variables file for specifying color variables. name your file in this manner and all will run smooth `variables.scss` in your app

## to do
- [x] babel setup
- [x] eslint & prettier
- [x] webpack 2 setup (webpack config created)
  - [x] dev and prod setup
  - [x] most loaders
  - [x] most plugins
  - [x] entry/output paths
- [ ] code splitting with bundle-loader
- [x] node server.js
- [x] index template file
- [ ] HMR
- [x] dev middleware
- [x] add resolvers
- [ ] Figure out how to use import/no-unresolved eslint rule with the resolver

## how to code?

### styles
 - you can have two types of styles, global stylesheets for your app, or localized modules.
 - always prefer modules
 - [read more about them here](http://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/)