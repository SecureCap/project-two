const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');
const passport = require('./config/passport');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./models');
const path = require('path');
const PORT = process.env.PORT || 3000;


const app = express();

// Put on your helmet and buckle up bub.
app.use(helmet());

// Setup CORS
app.use(cors());

// Serve static content from the public directory
// app.use(express.static('/public'));
app.use(express.static(path.join(__dirname, '/public')));

// Setup body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Setup handlebars
app.engine('.hbs', exphbs({
    defaultLayout: '../../public/index',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Setup sessions
app.use(session({
    secret: "lolsecret",
    resave: true,
    saveUninitialized: true
}));

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use(apiRoutes);
app.use(htmlRoutes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
    force: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
});