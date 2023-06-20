import express from "express";
// import { engine } from "express-handlebars";
import exphbs from "express-handlebars";

// require('dotenv').config();
// import dotenv from "dotenv";

import session from "express-session";
import SQLiteStore from "connect-sqlite3";

const SQLiteStoreSession = SQLiteStore(session);

const app = express();
// const router = express.Router();

const hbs = exphbs.create({
  // Specify the path to your handlebars template files
  // For example, if your template file is in the "views" directory:
  // partialsDir: 'views/partials',
  extname: ".hbs",
  // Register custom helpers
  helpers: {
    getDateFormatted: function (date) {
      date = new Date(date);
      const bookingDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return bookingDate;
    },
    and: function () {
      var args = Array.prototype.slice.call(arguments);
      var options = args.pop();

      for (var i = 0; i < args.length; i++) {
        if (!args[i]) {
          return false;
        }
      }
      return true;
      // return options.fn(this);
    },
    date2string: function (date) {
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    },
  },
});

// app.engine("hbs", engine({ extname: "hbs"}));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

//Δηλώνουμε πως ο φάκελος public θα περιέχει τα στατικά αρχεία
//το αρχείο /public/style.css
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//Sessions
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    maxAge: new Date(Date.now() + 3600000),
    expires: new Date(Date.now() + 3600000),
    cookie: { maxAge: 1000 * 60 * 60 * 2, sameSite: true },
    store: new SQLiteStoreSession({ db: "sessions.sqlite", dir: "./model/" }),
  })
);

//MAIN IMPORTS
import localing from "./controllers/localing.mjs";
import referer from "./controllers/referer.mjs";
//SIGN IN-SIGN UP-LOG OUT
import SignIn from "./controllers/SignIn.mjs";
import SignUp from "./controllers/SignUp.mjs";
import logOut from "./controllers/logOut.mjs";
//PAGES
import homepage from "./controllers/home.mjs";
import getRoomDes from "./controllers/getRoomDes.mjs";
import getAvailableRooms from "./controllers/getAvailableRooms.mjs";
import profilePage from "./controllers/profilePage.mjs";
import editBooking from "./controllers/editBooking.mjs";
import deleteBooking from "./controllers/deleteBooking.mjs";
import writeReview from "./controllers/writeReview.mjs";
import saveBooking from "./controllers/saveBooking.mjs";
import insertingIncludes from "./controllers/saveIncludes.mjs";
import checkSignedIn from "./controllers/checkAuth.mjs";

//Routing
app.use(localing);

//SIGN IN-SIGN UP-LOG OUT
app.get("/signIn", referer);
app.post("/signIn", SignIn);

app.post("/signUp", SignUp);
app.get("/logOut", logOut);

//Homepage
app.get("/", homepage);

//Room Description
app.get("/getRoomDesc", getRoomDes);

//Booking List
app.get("/bookingList", getAvailableRooms);

//Profile Page
app.get("/profilePage", checkSignedIn, profilePage);

//Edit Booking
app.get("/editBooking", checkSignedIn, editBooking);

//Delete Booking
app.get("/deleteBooking", checkSignedIn, deleteBooking);

//Reviews
app.get("/WriteComment", checkSignedIn, writeReview);

//Booking Form
app.post("/bookingForm", saveBooking, insertingIncludes, referer);

//Server
app.listen(8000, () => console.log("Server is starting at port", 8000));
