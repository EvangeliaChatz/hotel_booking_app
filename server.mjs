
// TEST COMMIT

import express from "express";
import { engine } from "express-handlebars";
// require('dotenv').config();
// import dotenv from "dotenv";

import session from "express-session";

const app = express();
const router = express.Router();

app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");

//Δηλώνουμε πως ο φάκελος public θα περιέχει τα στατικά αρχεία
//το αρχείο /public/style.css
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// εισάγουμε τη βάση δεδομένων
import * as model from "./model/model_pg.mjs";

// DROMOLOGISI EFARMOGHS ME ROUTING
app.use("/", router);

//  TESTTTT
console.log("Server is running on port 3000");

// EXAMPLES-TESTS---------------------------------------------------------------------------------------
//Routing exammple
// SYNARTISI--- PARADEIGMA GET FORMAS--STOIXEIA PINAKA testform
let GetExample = function (req, res) {
  model.loadTest((err, result) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("test-view");
    // console.log(res.rows);
  });
};

let localing = function (req, res, next) {
  // it is a middleware that gets called before every route
  // it is used to pass global variables to the views
  if (req.session.signedIn) {
    // res.locals.variable, is like parsing a variable in render for handlebars to use
    res.locals.full_name = req.session.full_name;
    res.locals.signedIn = req.session.signedIn;
    // sto handlebars {{#if signedIn}} {{full_name}} {{/if}}
  } else {
    res.locals.signedIn = false;
  }
  next();
};

//ROUTING --PARADEIGMA GET FORMAS--STOIXEIA PINAKA testform
router.route("/test").get(GetExample);
// router.route('/test').post(PostExample);

// // req.body  APOTELESMATA APO TO INPUT
// console.log(req.body.fname);
// console.log(req.body);




// SYNARTISI AUTOMATISMOU BOOKING ID
const autoBookId = function (req, res, next) {
  model.getBookingId((err, result) => {
    console.log(`${result} is the last booking id found`);
    res.locals.booking_id = result + 1;
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




//PARADEIGMA POST FORMAS--PROSTHETEI STOIXEIA STON PINAKA testform
app.post(
  "/test",
  autoId,

  (req, res) => {
    // console.log(res.locals.clientId);
    model.insertUser(
      req.body.fname,
      req.body.lname,
      res.locals.user_id,
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        res.render("test-view");
      }
    );
  }
);
// EXAMPLES-TESTS---------------------------------------------------------------------------------------

//GET REQUESTS---------------------------------------------------------------------------------------

//Sessions
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    maxAge: new Date(Date.now() + 3600000),
    expires: new Date(Date.now() + 3600000),
    cookie: { maxAge: 1000 * 60 * 60 * 2, sameSite: true },
  })
);

app.get("/signiIn", (req, res) => {
  res.redirect(req.get("referer"));
});

app.post("/signIn", autoId, (req, res) => {
  const email_req = req.body.email;
  const password_req = req.body.password;
  model.checkUser(email_req, password_req, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect(req.get("referer"));
    } else {
      if (!result) {
        res.redirect("/");
      } else {
        // global variables of session
        req.session.signedIn = true;
        req.session.full_name = result.full_name;
        res.redirect(req.get("referer"));
      }
    }
  });
});

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

//Routing

//Homepage
app.get("/", localing, (req, res) => {
  // φορτώνω τον πίνακα roomΤypep-για να εμφανιστούν τα δωμάτια στην αρχική σελίδα
  let RoomTypeLoad;
  model.getRoomDesc((err, roomtyperows) => {
    if (err) {
      return console.error(err.message);
    }
    RoomTypeLoad = roomtyperows;
    // console.log(RoomTypeLoad[0]);
    res.render("home", { RoomTypePostg: RoomTypeLoad }); //τις τιμές που παίρνω από τη βάση τις περνάω στο home.hbs για να τραξβήξω από τη βάση τα δεδομένα με το object RoomTypeLoad
  });
});

//όταν πατάει ένα δωμάτιο από την αρχική σελίδα
app.get("/getRoomDesc", localing, (req, res) => {
  let RoomTypeLoadDes;
  let id = req.query.roomTypeId;
  // let id = req.query['roomTypeId'];
  // console.log(id);
  model.getRooms(id, (err, roomtyperows) => {
    // φορτώνω τον πίνακα roomΤypep

    if (err) {
      return console.error(err.message);
    }
    RoomTypeLoadDes = roomtyperows;
    res.render("productDescription", {
      RoomTypePostgDes: RoomTypeLoadDes[0],
      GuestNumber: roomtyperows[0].quests_amount,
      TypeRoomPrice: roomtyperows[0].room_type_price,
      PhotoRoomType: roomtyperows[0].room_type_photo,
      RoomTypeName: roomtyperows[0].room_type_name,
    }); //τις τιμές που παίρνω από τη βάση τις περνάω στο home.hbs για να τραξβήξω από τη βάση τα δεδομένα με το object RoomTypeLoadDes
    // console.log(RoomTypeLoadDes[0]);
  });
});

//Booking List
app.get("/bookingList", localing, (req, res) => {
  res.locals.checkInDate = req.query.checkInDate;
  res.locals.checkOutDate = req.query.checkOutDate;
  res.locals.GuestNumber = req.query.GuestNumber;

  // console.log(res.locals.checkInDate);
  let RoomTypeLoadBookList;
  model.getRoomDesc((err, roomtyperows) => {
    // φορτώνω τον πίνακα roomΤypep
    if (err) {
      return console.error(err.message);
    }
    RoomTypeLoadBookList = roomtyperows;

    res.render("bookingList", {
      RoomTypePostgBookList: RoomTypeLoadBookList,
      GuestNumber: roomtyperows[0].quests_amount,
      TypeRoomPrice: roomtyperows[0].room_type_price,
      PhotoRoomType: roomtyperows[0].room_type_photo,
      RoomTypeName: roomtyperows[0].room_type_name,
    });
  });
});

//Profile Page
app.get("/profilePage", localing, (req, res) => {
  res.render("profilePage");
});



//Format date to insert in postgres database
function getFormattedDate() {
  let today = new Date();
  const bookingDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
return bookingDate;
}



//NA TA ALLAKSW--theloume na enhmerwnetai to client id & OTAN FTIAKSW TA SESSIONS
app.post("/bookingForm", autoBookId, (req, res, next) => {
  // res.locals ειναι μεταβλητες που μπορει να αξιοποιησει το response 
  // αντι να κανεις render('something', {variable: value}) μπορεις να κανεις res.locals.variable = value
  // σε οποιοδηποτε middle του ιδιου  route 
  // οποτε στο handlebars μπορεις να χρησιμοποιησεις κατευθειαν {{variable}}
  
  let bookingId= res.locals.booking_id;
  let bookingDate = getFormattedDate();
  //RREPEI NA ALLAKSEI TO EXTRAID=1
  // let extraId = req.body.hiddenbreakfast;
  let extraId = 1;
  let totalPrice = req.body.hiddenPrice;

  console.log(`1.BOOKING ID IS ${bookingId}`);
  console.log(`1.BOOKING DATE IS ${bookingDate}`);
  console.log(`1.EXTRA ID IS ${extraId}`);
  console.log(`1.TOTAL PRICE IS ${totalPrice}`);
  


  model.insertBooking(bookingId, totalPrice, bookingDate, extraId, (err) => {
    if (err) {
      return console.error(err.message);
    }
  next();
  });




  // 2 MIDDLWARE VARIABLES
  //extra id breakfast
//   let extraType2;
// function getextraType() {
//   if  (req.body.hiddenbreakfast == 0) {
//     extraType2 = '';
//   } else {
//     extraType2 = 'breakfast';
//   }
//   return extraType2;
//  }
//  let extraType= getextraType();
// const extraPrice = req.body.hiddenPrice; //epistrefei tin timi tou dwmatiou


// // 2 MIDDLWARE
const extraType = 7;
const extraPrice = req.body.hiddenPrice; //epistrefei tin timi tou dwmatiou

  model.insertExtras(extraType, extraPrice, bookingId, extraId,(err) => {
    console.log(`2.EXTRA TYPE IS ${extraType}`);
    console.log(`2.EXTRA PRICE IS ${extraPrice}`);
    console.log(`2.BOOKING ID IS ${bookingId}`);
    console.log(`2.EXTRA ID IS ${extraId}`);
    if (err) {
      return console.error(err.message);
    }
  next();

  });


  // 3MIDDLWARE
//na kanei insert sti bash 1.checkin 2.checkout 3.room type name where booking is=TADE 4.total price
//5.

});



app.listen(8000, () => console.log("Server is starting at port", 8000));