import express from "express";
import { engine } from "express-handlebars";
// require('dotenv').config();
// import dotenv from "dotenv";

import session from "express-session";
import SQLiteStore from "connect-sqlite3";

const SQLiteStoreSession = SQLiteStore(session);

const app = express();
// const router = express.Router();

app.engine("hbs", engine({ extname: "hbs" }));
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
const autoBookId = function (req, res, next) {
  model.getBookingId((err, result) => {
    console.log(`${result} is the last booking id found`);
    if (result === null || result === undefined || !result) {
      result = 0;
    }

    res.locals.booking_id = result + 1;
    console.log(`booking id is ${res.locals.booking_id}`);
    next();
  });
};

// SYNARTISI AUTOMATISMOU ID USER
const autoId = function (req, res, next) {
  model.getUserId((err, result) => {
    console.log(`${result} is the last user id found`);
    res.locals.user_id = result + 1;
    next();
  });
};




// EXAMPLES-TESTS---------------------------------------------------------------------------------------
//Routing exammple
import test from "./controllers/test.mjs";
import postTest from "./controllers/postTest.mjs";

//EXAMPLE GET FORMAS
app.get("/test", test);

//EXAMPLE POST FORMAS
app.post("/test",autoId, postTest);
// EXAMPLES-TESTS---------------------------------------------------------------------------------------


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

app.post("/signIn", autoId, SignIn);
import SignIn from "./controllers/SignIn.mjs";


app.get("/logOut", logOut);
import logOut from "./controllers/logOut.mjs";


app.post("/signUp", autoId, SignUp);
import SignUp from "./controllers/SignUp.mjs";

// router.post('/signUp', autoId,
// (req, res, next) => {
//     //res.locals.email_req for the next middleware
//         res.locals.email_req = req.body.email;

//         model.checkEmail(res.locals.email_req, (err, result) => {
//             if (result && !err) {
//                 // user already exists
//                 res.redirect(req.get('referer'));
//             }
//             else {
//                 // user does not exist
//                 next();
//             }

//             if (err && !result) {
//                 // when result is undefined, it means that the user does not exist
//                 console.log(err);
//                 res.redirect(req.get('referer'));
//             }
//             else {
//                 next();
//             }
//         });
//     },
//     (req, res) => {
//         const phone_number = req.body.phone_number;
//         const password = req.body.password;
//         const full_name = req.body.full_name;
//         model.addUser(full_name, res.locals.email_req,password, phone_number, res.locals.clienId, (err, resp) => {
//             if (err) {
//                 console.log(err);
//                 res.redirect(req.get('referer'));
//             }
//             else {
//                 req.session.signedIn = true;
//                 req.session.email = req.body.email;
//                 res.redirect(req.get('referer'));
//             }
//         });
//     }
// );

// router.get('/signOut', (req, res) => {
//     req.session.destroy((err) => {
//         console.log("session destroyed")
//     })
//     res.redirect('/')
// });

//IMPORTS
import localing from "./controllers/localing.mjs";

import homepage from "./controllers/home.mjs";
import getRoomDes from "./controllers/getRoomDes.mjs";
import getAvailableRooms from "./controllers/getAvailableRooms.mjs";
import profilePage from "./controllers/profilePage.mjs";
import editBooking from "./controllers/editBooking.mjs";
import deleteBooking from "./controllers/deleteBooking.mjs";
import writeReview from "./controllers/writeReview.mjs";


//Routing
//Homepage
app.get("/", localing, homepage);

//όταν πατάει ένα δωμάτιο από την αρχική σελίδα
app.get("/getRoomDesc", localing, getRoomDes);

//Booking List
app.get("/bookingList", localing, getAvailableRooms);

//Profile Page
app.get("/profilePage", localing, profilePage);

//Edit Booking
app.get("/editBooking", localing, editBooking);

//Delete Booking
app.get("/deleteBooking", localing, deleteBooking);

//Reviews
app.get("/WriteComment", localing, writeReview);




//Format date to insert in postgres database
function getFormattedDate() {
  let today = new Date();
  const bookingDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return bookingDate;
}


// middleware
// app.method( path, middleware1, middleware2, middleware3, ..., callback)
// middleware θεωρουνται τα (req, res, next) => { ... } functions

//NA TA ALLAKSW--theloume na enhmerwnetai to client id & OTAN FTIAKSW TA SESSIONS
app.post(
  "/bookingForm",
  autoBookId,

  //1o MIDDLEWARE
  (req, res, next) => {
    // res.locals ειναι μεταβλητες που μπορει να αξιοποιησει το response
    // αντι να κανεις render('something', {variable: value}) μπορεις να κανεις res.locals.variable = value
    // σε οποιοδηποτε middle του ιδιου  route
    // οποτε στο handlebars μπορεις να χρησιμοποιησεις κατευθειαν {{variable}}

    let bookingDate = getFormattedDate();
    //RREPEI NA ALLAKSEI TO EXTRAID=1
    // let extraId = req.body.hiddenbreakfast;
    let extraId = 1;
    let totalPrice = req.body.hiddenPrice;
    // εχουν σιγουρα μπει στο request ?
    let breakfast = req.body.hiddenBreakfast;
    let fastwifi = req.body.hiddenWifi;
    // console.log(`1.BOOKING ID IS ${res.locals.bookingId}`);
    // console.log(`1.BOOKING DATE IS ${bookingDate}`);
    // console.log(`1.EXTRA ID IS ${extraId}`);
    // console.log(`1.TOTAL PRICE IS ${totalPrice}`);

    model.insertBooking(
      res.locals.booking_id,
      totalPrice,
      bookingDate,
      extraId,
      req.session.client_id,
      breakfast,
      fastwifi,
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        next();
      }
    );
  },

  (req, res) => {
    res.redirect("/bookingList");
  }
);

//Server
app.listen(8000, () => console.log("Server is starting at port", 8000));
