const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/users');
const plugin = require('./routes/plugin');
const wishlist = require('./routes/wishlist');
const order = require('./routes/order');
const review = require('./routes/review');

const PORT = process.env.PORT || 5000;

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use('/files', express.static('files'));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", users);
app.use("/", plugin);
app.use("/", wishlist);
app.use("/", order);
app.use("/", review);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));