## Classifieds

Educational projects implementing classifieds adds web app with Express.js (Node.js) + Vue.js. 

Main reason for this project is to try out different technologies/frameworks/libraries.

Current implementation includes:
- Joint frontend + backend project both served by Node.js (no additional web server required) 
- Docker file to run app in container
- npm as package manager
- Webpack as JavaScript module bundler
- Frontend (Vue.js)
  - Vuetify material design components
  - Single page application with routing
  - Infinite loading (scroll down to load more data)
  - Simple crud operations
  - More advanced UI with add categories
  - Data validation
- Backend (Express.js)
  - Sequelize as ORM (Sqlite database)
  - Routing to serve backend + frontend
  - crud operations
  - Data validation
  - Seeding some test data

Things to implement in future:
* Authentication with google/facebook
* Image upload
* Filtering/sorting
* Search

## Basic instructions

Install Node.js, npm, nodemon (optional)

Run app with: `npm run start` or `npm run start-nodemon`

Bundle frontend: `npm run webpack-dev`