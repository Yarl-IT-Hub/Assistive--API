require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const multer = require("multer");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// LANDIGN PAGE
app.get('/',function(req,res) {
    res.sendFile(__dirname + '/views/index.html');
});

// API ROUTES FOR ADMIN URL
app.use('/admin', require('./Adminuser/adminusers.controller'));

require("./customer/customer.routes.js")(app);
require("./user/user.routes.js")(app);
require("./subject/subject.routes.js")(app);
require("./grade/grade.routes.js")(app);
require("./type/type.routes.js")(app);
require("./term/term.routes.js")(app);
require("./question/question.routes.js")(app);
require("./answer/answer.routes.js")(app);
require("./user_result/user_result.routes.js")(app);

// require("./sendmail.js");
app.use('/images', express.static('upload/images'));

// 404 PAGE - always should be last
app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/views/notfound.html');
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));