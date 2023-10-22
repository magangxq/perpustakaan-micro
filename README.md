## dependencies installation
```
npm install
```
## configuration steps
1. install dependencies
2. create your database then config the database at /config/Database.js
```
const db = new Sequelize('yourdatabase', 'user', 'password', {
    host: "localhost",
    dialect: "postgresql"
});
```
3. migrate the schema model 
4. migrate the seed (uncomplete)
5. run the server

## migrate data model
1. go to index.js
2. uncomment the code this code in the index.js: 
```
// this code
(async()=>{
    await db.sync();
})();

// and this
store.sync();
```

## run server
```
npx nodemon run
```

## api method
```

```

## api routes
```
```
