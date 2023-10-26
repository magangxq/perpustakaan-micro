# Perpustakaan Backend

## Installation
To install the project, follow these steps: 
1. Clone the repository: 
```
git clone -b backend https://github.com/magangxq/perpustakaan-micro.git
```
2. Install the dependencies:
```
npm install
```
3. Create a database in PostgreSQL and configure it in the config/Database.js file:
``` JavaScript
const db = new Sequelize('yourdatabase', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgresql',
});
```
4. Create a new file named `.env` at root path then copy and paste code from `.env.dev` to `.env`. Then setup your Database URL in `.env`
5. Migrate the seed data:
```
npm run migrate-model
```
6. Migrate the seed data: 
```
npm run generate
npm run seeder
```
7. Start the server:
```
npm start
```

## API Methods

The API methods for the Perpustakaan backend are as follows:

**Auth**
- POST `/register` : Register a new user.
- POST `/login` : Login an existing user.
- DEL `/logout` : Logout the current user.

**Profile**
- GET `/user/profile` : Show the active session user profile.
- PATCH `/user/profile/:uuid` : Edit name of profile.

**Member Applicants**
- GET `/member-applicant` : Get a list of all member applicants.
- GET `/member-applicant/:id` : Get the details of a specific member applicant.
- PATCH `/member-applicant/:id` : Update the registration status of a member applicant.

**User**
- GET `/member-list/users` : Get a list of all users.
- GET `/member-list/users/:id` : Get the details of a specific user.
- PATCH `/member-list/users/:id` : Update the details of a specific user.

**Books**
- POST `/books` : Create a new book.
- GET `/books` : Get a list of all books.
- GET `/books/:id` : Get the details of a specific book.
- PATCH `/books/:id` : Update the details of a specific book.
- DEL `/books/:id` : Delete a book.


## Folder Structure
```
perpustakaan
├── config
│   └── Database.js
├── controllers
│   ├── Applicant.js
│   ├── Auth.js
│   ├── Books.js
│   ├── Profile.js
│   └── Users.js
├── middleware
│   └── AuthUser.js
├── models
│   ├── BookModel.js
│   └── UserModel.js
├── node_modules
├── prisma
│   ├── schema.prisma
│   ├── seedBook.js
│   └── seedUser.js
├── routes
│   ├── ApplicantRoute.js
│   ├── AuthRoute.js
│   ├── BookRoute.js
│   ├── ProfileRoute.js
│   └── UserRoute.js
├── .env
├── .env.dev
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

