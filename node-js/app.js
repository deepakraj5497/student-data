const express = require('express');

const app = express();
const bodyparser = require('body-parser');
//const morgan = require('morgan');
//const cookieParser = require('cookie-parser');
//const session = require('express-session');
//const MySQLStore = require('express-mysql-session')(session);

const port = process.env.PORT || 3500;

app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({ extended: false }));
//app.use(morgan('dev'));
//app.use(cookieParser());

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*' );

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});


var mysql = require('mysql');

var mysql_connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "deepakraj5497",
    database: "images"
});

/* var sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
        tableName: 'USERS_SESSIONS',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, mysql_connection); */

/*app.use(session({
    key: 'connect-sid',
    secret: 'some secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
})); */

mysql_connection.connect((err) => {
    if(!err)
        console.log('Database connection was successful');
    else
        console.log('Database connection was failed')
});

let image_table = `create table if not exists image_table(
                            id int primary key auto_increment,
                            name varchar(255)not null,
                            english int not null,
                            tamil int not null,
                            maths int not null,
                            science int not null,
                            social int not null,
                            gender varchar(255)not null,
                            department varchar(255)not null, 
                            image_type varchar(255)not null,
                            image_name varchar(255)not null
                    )`;
  
mysql_connection.query(image_table, (err, rows, fields) => {
      if (!err) {
        console.log(err);
      }else {
          console.log("table created successfully");
      }
});

let sign_up = `create table if not exists sign_up(
                        id int primary key auto_increment,
                        email varchar(255)not null,
                        password varchar(255) not null,
                        mobile_number BIGINT not null
                    )`;

mysql_connection.query(sign_up, (err, rows, fields) => {
    if (!err) {
        console.log(err);
    }else {
        console.log("Sign up table created successfully");
    }
});


//Get all student data from mysql database
app.get('/get_data', (req, res) => {
    mysql_connection.query('SELECT * FROM image_table', (err, rows, fields) =>{
        if(!err){
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

app.post('/upload_data', (req, res) => {
    const data = req.body;
    let statement = `INSERT INTO image_table(name,english,tamil,maths,science,social,gender,department,image_type,image_name)
            VALUES(?,?,?,?,?,?,?,?,?,?)`;
    let dataValues = [data.name,data.english,data.tamil,data.maths,data.science,data.social,data.gender,data.department,data.imgType,data.imgName];
    var files = data.img.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    require("fs").writeFile(`../redux-react/src/assets/${data.imgName}`, files, {encoding: 'base64'}, (err) =>{
        if(err){
            console.log(err);
        }
        console.log("saved successfully!")
      });
    mysql_connection.query(statement, dataValues, (err, rows, fields) => {
        if(!err){
            res.send(rows);
        } else {
            console.log(err);
        }
    });
    
});

app.patch("/update_data", (req, res) => {
    let data = req.body;
    let id = req.params.id;

    let sql = `UPDATE image_table SET name = ?, english = ?, tamil = ?, maths = ?, science = ?, social = ?, gender = ?, department = ?,
                image_name = ? WHERE id = ?`;
    let dataValues = [data.name, data.english, data.tamil, data.maths, data.science, data.social, data.gender, data.department,
                        data.imgName, data.id]
    if(data.imgData === false){
        var files = data.img.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        require("fs").writeFile(`../redux-react/src/assets/${data.imgName}`, files, {encoding: 'base64'}, (err) =>{
            if(err){
                console.log(err);
            }
                console.log("saved successfully!")
            });
    }
    mysql_connection.query(sql, dataValues, (err, rows, fields) => {
        if(!err){
            res.send(rows);
        } else {
            console.log(err);
        }
    });

});

app.delete("/delete_data/:id", (req, res) => {
    let id = req.params.id;
    mysql_connection.query('DELETE FROM image_table WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            console.log(rows);
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/sign_up', (req, res) => {
    const data = req.body;
    let statement = `INSERT INTO sign_up(email,password,mobile_number)
            VALUES(?,?,?)`;
    let dataValues = [data.email,data.password,data.mobileNumber];
    mysql_connection.query(statement, dataValues, (err, rows, fields) => {
        if(!err){
            res.send(rows);
        } else {
            console.log(err);
        }
    });  
});

app.get('/signup_data', (req, res) => {
    mysql_connection.query('SELECT * FROM sign_up', (err, rows, fields) =>{
        if(!err){
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});