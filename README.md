# **Perpustakaan**

# configuration steps
1. [install dependencies](#dependencies-installation)
2. create your database in postgresql then config the database at /config/Database.js
```
const db = new Sequelize('yourdatabase', 'user', 'password', {
    host: "localhost",
    dialect: "postgresql"
});
```
3. [migrate the data model](#migrate-data-model) 
4. [migrate the seed ](#migrate-the-seeder)
5. [run the server](#run-server)

## dependencies installation
```
npm install
```

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
3. then run the server, if the query already executed, comment again thats code

## migrate the seeder
1. setup your database url in .env
2. npx prisma generate
3. npx prisma db seed

## run server
```
npx nodemon run
```

## api method
```
api method

auth/
- POST register _(All Role)_                  : register user
- POST login **(All Role)**                     : login user
- DEL logout *(All Role)*                     : logout user

users - profile/
- GET profile *(All Role)*                    : melihat profile 
- PATCH edit profile *(All Role: Verified)*   : mengedit profile 

ma - member applicant/
- GET applicant *(Dev, Admin)*                : melihat semua calon anggota perpustakaan yang belum terverifikasi
- GET applicant uuid *(Dev, Admin)*           : melihat detail dari calon anggota perpus yang belum terverifikasi
- PATCH update regStatus *(Dev, Admin)*       : mengupdate/meng-verifikasi user yang sudah sesuai profile datanya

ma - users/
- GET users *(Dev, Admin)*                    : melihat semua akun yang ada di perpustakan
- GET users id *(Dev, Admin)*                 : melihat detail dari akun yang terdaftar di perpustakaan
- PATCH update role *(Dev, Admin)*            : mengupdate role dari akun user yang ingin di update

books/ 
- POST create book *(Dev, Admin, Pust)*       : membuat/menambahkan buku 
- GET all books *(All Role: Verified)*        : melihat semua list buku
- GET book id *(All Role: Verified)*          : melihat detail dari satu buku
- PATCH edit book *(Dev, Admin, Pust)*        : mengedit buku
- DEL delete book *(Dev, Admin, Pust)*        : menghapus buku

```
