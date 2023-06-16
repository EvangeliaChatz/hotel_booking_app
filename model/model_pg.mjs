//CheckUser for Sign in (email, password)
async function checkUser(email_req, password_req, callback) {
  let user, error_message;
  // console.log(email_req, password_req);

  try {
    const sql = `Select * from "CLIENT" where "email" = '${email_req}'`;
    const client = await connect();
    const res = await client.query(sql);
    await client.release();
    if (res) {
      // const match = bcrypt.compareSync(password, user.password);
      const match = password_req == res.rows[0].password;
      if (match) {
        callback(null, res.rows[0]);
      } else {
        callback("Wrong Password", null);
      }
    } else {
      callback("User not found", null);
    }
  } catch (err) {
    callback(err, null);
  }
}

//ChekEmail for Sign up (email)
async function checkEmail(email_req, callback) {
  let user, error_message;

  try {
    const sql = `Select * from "CLIENT" where "email" = '${email_req}'`;
    const client = await connect();
    const res = await client.query(sql);
    await client.release();
    if (res) {
      callback(null, true);
    } else {
      callback("User not found", null);
    }
  } catch (err) {
    callback(err, null);
  }
}

async function addUser(
  full_name,
  email,
  phone_number,
  password,
  client_id,
  callback
) {
  const sql = `INSERT INTO "CLIENT" ("full_name", "email", "password", "phone_number", "client_id") VALUES ($1, $2, $3, $4, $5)`;
  try {
    const client = await connect();
    const res = await client.query(sql, [
      full_name,
      email,
      password,
      phone_number,
      client_id,
    ]);
    await client.release();
    callback(null);
  } catch (err) {
    callback(err, null);
  }
}

// PARADEIGMA ME CLIENT POU DOULEEUI
// const { Client } = require ('pg')

// const client = new Client ({
// host: 'localhost',
// user: 'postgres',
// port: 5432,
// password: 'eva',
// database: 'hbooking',
// })

// client.connect()

import pg from "pg";

const pool = new pg.Pool({
  // τοπική σύνδεση
  user: "postgres", ///username
  host: "localhost",
  database: "hbooking",
  password: "eva", /// password
  port: 5432,
});

async function connect() {
  try {
    const client = await pool.connect();
    return client;
  } catch (e) {
    console.error(`Failed to connect ${e}`);
  }
}

// const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

// ZHTAME STOIXEIA APO THN BASI

// client.query (`Select * from "public.BOOKING"`,(err, res)=>{
// if(!err){
//     console.log(res.rows);
// } else {
// console.log(err.message);
// }
// })

// function loadTest(){
// pool.query (`Select * from "testform"`,(err, res)=>{
//     if(!err){
//         console.log(res.rows);
//     } else {
//     console.log(err.message);
//     }
//     })
// }

// EPISTREFEI TO PINAKA "tesform" THS BASIS---XWRIS CONSOLE LOG ROWS
// async function loadTest(callback) {
//     const sql = `Select * from "testform"`;
//     try {
//         const client = await connect();
//         const res = await client.query(sql);
//         await client.release();
//         callback(null, res.rows) // επιστρέφει array
//     }
//     catch (err) {
//         callback(err, null);
//     }
//   }

// ME CONSOLE LOG ROWS
async function loadTest(callback) {
  const sql = `Select * from "testform"`;
  try {
    const client = await connect();
    const res = await client.query(sql);
    await client.release();
    callback(null); // επιστρέφει array
    // callback(null, console.log(res.rows)); // επιστρέφει array
  } catch (err) {
    callback(err, null);
  }
}

//επιστρέφει όλα τα δωμάτια
async function getRoomDesc(callback) {
  const sql = `Select * from "roomTypep"`;
  try {
    const client = await connect();
    const res = await client.query(sql);
    await client.release();
    callback(null, res.rows); // επιστρέφει array
  } catch (err) {
    callback(err, null);
  }
}

// SELECT * from "Room" where "adults">='<adults variable>' and "<arrivedate variable >", "<departdate variable>" not in (select "arrivedate","departdate" from includes where "Includes"."room_id"='<id from roomtype>' )

//επιστρέφει όλα τα δωμάτια από n adults κι πάνω KAI ημερομηνίες
async function getBookingList(adultNumber, callback) {
  const sql = `Select * from "roomTypep" where "adults" >= ${adultNumber}`;
  try {
    const client = await connect();
    const res = await client.query(sql);
    await client.release();
    callback(null, res.rows); // επιστρέφει array
    // console.log(res.rows);
  } catch (err) {
    callback(err, null);
  }
}

//επιστρέφει ένα δωμάτιο
async function getRooms(id, callback) {
  const sql = `Select * from "roomTypep" where "room_type_id" = ${id}`;
  try {
    const client = await connect();
    const res = await client.query(sql);
    await client.release();
    callback(null, res.rows); // επιστρέφει array
    // console.log(res.rows);
  } catch (err) {
    callback(err, null);
  }
}

//BOOKING FORM
//USER ID "MANUAL-INCREMENT"-AUKSANEI KATA 1 TO ID KATHE FORA POU KANEI POST
async function getBookingId(callback) {
  const sql = `Select Max("booking_id") from "booking"`;
  const client = await connect();
  const res = await client.query(sql);
  callback(null, res.rows[0].max);
}

//TESTFORM
//USER ID "MANUAL-INCREMENT"-AUKSANEI KATA 1 TO ID KATHE FORA POU KANEI POST
async function getUserId(callback) {
  const sql = `Select Max("user_id") from "testform"`;
  const client = await connect();
  const res = await client.query(sql);
  callback(null, res.rows[0].max);
}

//OTAN KANEI SIGN IN PROSTHETOUME STI BASI MIA GRAMMI
async function insertUser(first_name, last_name, user_id, callback) {
  const sql = `INSERT INTO "testform" ("first_name", "last_name", "user_id") VALUES ($1, $2, $3)`;
  try {
    const client = await connect();
    const res = await client.query(sql, [first_name, last_name, user_id]);
    await client.release();
    callback(null);
  } catch (err) {
    callback(err);
  }
}

// // //booking form
// // async function BookingForm(callback) {
// //     const sql = `INSERT INTO "booking" ("full_name", "email", "phone", "pass") VALUES ($1, $2, $3, $4)`;
// //     try {
// //         const client = await connect();
// //         const res = await client.query(sql);
// //         await client.release();
// //         callback(null, res.rows) // επιστρέφει array
// //         // console.log(res.rows);
// //     }
// //     catch (err) {
// //         callback(err, null);
// //     }
// // }

// async function BookingForm(callback) {
//   // Insert the form data into the database
//   const sql = `INSERT INTO "booking" ("extra_id") VALUES ($1)`;
//   try {
//     const client = await connect();
//     const res = await client.query(sql, [extra_id]);
//     await client.release();
//     callback(null);
//   } catch (err) {
//     callback(err);
//   }
// }



//INSERT BOOKING FORM DATA (BOOKING ID, PRICE, DATE, EXTRA_ID)
async function insertBooking(bookingId, totalPrice, bookingDate, extraId, callback) {
  const sql = `INSERT INTO "booking" ("booking_id", "total_price", "booking_date", "extra_id") VALUES ($1, $2, $3, $4)`;
  try {
    const client = await connect();
    await client.query(sql, [bookingId, totalPrice, bookingDate, extraId]);
    await client.release();
    callback(null);
  } catch (err) {
    callback(err);
  }
}

//INSERT EXTRAS (BREAKFAST & FASTWIFI)
async function insertExtras(extraType, extraPrice, bookingId, extraId, callback) {
  const sql = `INSERT INTO "extras" ("extra_type", "extra_price", "booking_id", "extra_id") VALUES ($1, $2, $3, $4)`;
  try {
    const client = await connect();
    await client.query(sql, [extraType, extraPrice, bookingId, extraId]);
    await client.release();
    callback(null);
  } catch (err) {
    callback(err);
  }
}




export {
  connect,
  loadTest,
  insertUser,
  getUserId,
  getRooms,
  getRoomDesc,
  getBookingList,
  checkUser,
  addUser,
  checkEmail,
  insertBooking,
  getBookingId,
  insertExtras,
};