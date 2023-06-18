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

import getDateFormatted from "./controllers/helpers.mjs";


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
        }
  }
});

// app.engine("hbs", engine({ extname: "hbs"}));
app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");

//Δηλώνουμε πως ο φάκελος public θα περιέχει τα στατικά αρχεία
//το αρχείο /public/style.css
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// app.use('/controllers', express.static(`${__dirname}/controllers/`));

// εισάγουμε τη βάση δεδομένων
import * as model from "./model/model_pg.mjs";

//AUTOINCREMENTS IDSS
// SYNARTISI AUTOMATISMOU BOOKING ID

// const autoBookId = function (req, res, next) {
//   model.getBookingId((err, result) => {
//     console.log(`${result} is the last booking id found`);
//     if (result === null || result === undefined || !result) {
//       result = 0;
//     }

//     res.locals.booking_id = result + 1;
//     console.log(`booking id is ${res.locals.booking_id}`);
//     next();
//   });
// };



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

//SIGN IN-SIGN UP-LOG OUT
app.get("/signIn", (req, res) => {
  res.redirect(req.get("referer"));
});

// app.post("/signIn", autoId, SignIn);
app.post("/signIn",SignIn);
import SignIn from "./controllers/SignIn.mjs";

app.get("/logOut", logOut);
import logOut from "./controllers/logOut.mjs";

app.post("/signUp",  SignUp);
import SignUp from "./controllers/SignUp.mjs";

//IMPORTS
import localing from "./controllers/localing.mjs";

import homepage from "./controllers/home.mjs";
import getRoomDes from "./controllers/getRoomDes.mjs";
import getAvailableRooms from "./controllers/getAvailableRooms.mjs";
import profilePage from "./controllers/profilePage.mjs";
import editBooking from "./controllers/editBooking.mjs";
import deleteBooking from "./controllers/deleteBooking.mjs";
import writeReview from "./controllers/writeReview.mjs";
import  getTodaysDateFormatted  from "./controllers/formattedTodaysDate.mjs";
import insertingBooking from "./controllers/saveBooking.mjs";
import insertingIncludes from "./controllers/saveIncludes.mjs";
import checkSignedIn  from "./controllers/checkAuth.mjs";

app.use(localing);

//Routing
//Homepage
app.get("/", homepage);

//όταν πατάει ένα δωμάτιο από την αρχική σελίδα
app.get("/getRoomDesc", getRoomDes);

//Booking List
app.get("/bookingList", getAvailableRooms);

//Profile Page
app.get("/profilePage",checkSignedIn, profilePage);

//Edit Booking
app.get("/editBooking",checkSignedIn, editBooking);

//Delete Booking
app.get("/deleteBooking",checkSignedIn, deleteBooking);

//Reviews
app.get("/WriteComment",checkSignedIn, writeReview);


// middleware
// app.method( path, middleware1, middleware2, middleware3, ..., callback)
// middleware θεωρουνται τα (req, res, next) => { ... } functions

//NA TA ALLAKSW--theloume na enhmerwnetai to client id & OTAN FTIAKSW TA SESSIONS
app.post(
  "/bookingForm",

  insertingBooking,insertingIncludes,

  (req, res) => {
    res.redirect(req.get("referer"));
  }
);

//Server
app.listen(8000, () => console.log("Server is starting at port", 8000));
