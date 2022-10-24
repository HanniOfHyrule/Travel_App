# Evaluate A News Article with Natural Language Processing

This is the 4th project from the [Udacity](Udacity.com) Web Developer Nanodegree program.

This project allows to analyze the user's article using NLP.
the user enters the URL of any blog or newsletter article and gets a response from the meaningcloud API API with the analyzed values.

## Build tools

- HTML
- SCSS
- JavaScript
- Jest
- Node
- Express
- Webpack
- meaningcloud API
- Workbox

## Installation

Check if node and npm/yarn are installed.

`npm -v`
`node -v`
`yarn -v`

Move to the project folder

`cd <yourprojectFolder>`

Clone the repo

`git clone <reponame>`

Install with npm or yarn

`npm install`
`yarn install`

Install loaders and plugins

Choose the installation for your development mode

`npm i -D @babel/core @babel/preset-env babel-loader`
`npm i -D style-loader node-sass css-loader sass-loader`
`npm i -D clean-webpack-plugin`
`npm i -D html-webpack-plugin`
`npm i -D mini-css-extract-plugin`
`npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin`

Go to the [meaningcloudAPI](meaningcloud.com) and get your personal API Key.

Configurate your environment files and using dotenv

`npm install dotenv`

Create a `.env` file and don't forget to add them to the `.gitignore` file.
Fill the `.env` file with your API KEY for example:

`API_KEY=***********************`

now you can build the project with

`npm run build-dev` or `npm run build-prod`

after that you can start it

`npm start`

Open your browser at http://localhost:8080

## And this is what it looks like:

![The page](./src/client/assets/images/Article_analysis_with_NLP.png)
