# Travel App :cloud:

This is the 5th and the Capstone project from the [Udacity](Udacity.com) Web Developer Nanodegree program.

City trips and vacations can be planned with the Travel App. After entering the location and the arrival and departure date, current data on the weather, how many days are left until the trip are displayed and a nice picture of your destination. This project was built without using modern frontend frameworks, just vanilla JavaScript. Nevertheless, modern tools were used such as Webpack, Node.js and Express to initialize my own backend. Using three APIs, the weather data, the location and an image of the specified location were fetched and displayed in the UI.

## Build tools :hammer:

- HTML
- SCSS
- JavaScript
- Jest
- Node
- Express
- Webpack
- [geoname API](https://www.geonames.org/export/)
- [weatherbit API](https://www.weatherbit.io/)
- [pixabay API](https://pixabay.com/)
- Workbox

## How it look like :eyeglasses:

![picture of the Travel planner](./src/client/media/images/Screenshot%202022-11-14%20145701.png)

## Installation :on:

Check if node and npm are installed.

`npm -v`
`node -v`

Move to the project folder

`cd <yourprojectFolder>`

Clone the repo

`git clone <reponame>`

Install with npm

`npm install`

Install loaders and plugins

Choose the installation for your development mode

`npm i -D @babel/core @babel/preset-env babel-loader`
`npm i -D style-loader node-sass css-loader sass-loader`
`npm i -D clean-webpack-plugin`
`npm i -D html-webpack-plugin`
`npm i -D mini-css-extract-plugin`
`npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin`

Go to the [geoname API](https://www.geonames.org/export/), [weatherbit API](https://www.weatherbit.io/) and [pixabay API](https://pixabay.com/) and get your personal API Key.

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
