import bcrypt from "bcrypt";

import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: false,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connect() {
  try {
    const client = await pool.connect();
    return client;
  } catch (e) {
    console.error(`Failed to connect ${e}`);
  }
}

//CheckUser για Sign in (email, password)
async function checkUser(email_req, password_req, callback) {
  let user, error_message;
  // console.log(email_req, password_req);
  try {
    const sql = `Select * from "CLIENT" where "email" = $1`;
    const client = await connect();
    const res = await client.query(sql, [email_req]);
    await client.release();
    if (res.length != 0) {
      // const match = bcrypt.compareSync(password, user.password);
      // const match = password_req == res.rows[0].password;
      const match = bcrypt.compareSync(password_req, res.rows[0].password);
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

//ChekEmail για να κάνει Sign up βάσει του (email)
async function checkEmail(email_req, callback) {
  let user, error_message;
  try {
    const sql = `Select * from "CLIENT" where "email" = '${email_req}'`;
    const client = await connect();
    const res = await client.query(sql);
    await client.release();
    if (res.rows[0]) {
      console.log(res.rows[0]);
      callback(null, true);
    } else {
      callback(null, false);
    }
  } catch (err) {
    callback(err, null);
  }
}

//Προσθήκη νέου χρήστη στο πίνακα "CLIENT" της βάσης
async function addUser(full_name, email, password, phone_number, callback) {
  const sql = `INSERT INTO "CLIENT" ("full_name", "email", "password", "phone_number") VALUES ($1, $2, $3, $4) RETURNING "client_id","full_name","email","phone_number"`;
  try {
    const client = await connect();
    const res = await client.query(sql, [
      full_name,
      email,
      bcrypt.hashSync(password, 10),
      phone_number,
    ]);
    await client.release();
    callback(null, res.rows[0]);
  } catch (err) {
    callback(err, null);
  }
}

//USER ID "MANUAL-INCREMENT"-AUKSANEI KATA 1 TO ID KATHE FORA POU KANEI POST
async function getUserId(callback) {
  const sql = `Select Max("user_id") from "testform"`;
  const client = await connect();
  const res = await client.query(sql);
  callback(null, res.rows[0].max);
}

//επιστρέφει τα διαθέσιμα δωμάτια με βάση τον αριθμό των επισκεπτών και τις ημερομηνίες που επιλέγει ο χρήστης ( Ελεγχος διαθεσιμότητας ζητούμενου δωματίου στην αρχική)
async function getRoomGuestDate(
  GuestNumberControl,
  arrivedate,
  departdate,
  callback
) {
  const sql = `Select * from "roomTypep"  WHERE "quests_amount" >= $1 and "room_id" not in (select "room_id" from includes where "arrival_date" between $2 and $3 and "dep_date" between $2 and $3)`;

  try {
    const client = await connect();
    const res = await client.query(sql, [
      GuestNumberControl,
      arrivedate,
      departdate,
    ]);
    await client.release();
    callback(null, res.rows); // επιστρέφει array
    console.log(res.rows);
  } catch (err) {
    callback(err, null);
  }
}

//επιστρέφει τα επεξεργάσιμα στοιχεία ενός χρήστη με cleint_id για να τα επεξεργαστεί στο editProfile
async function getReservations(client_id, callback) {
  const sql = `Select * from "booking" inner join "includes" on "booking"."booking_id"="includes"."booking_id" where "client_id" = $1 ORDER BY "booking"."booking_id" DESC`;
  try {
    const client = await connect();
    const res = await client.query(sql, [client_id]);
    await client.release();
    callback(null, res.rows); // επιστρέφει array
    // console.log("rows", res.rows);
  } catch (err) {
    callback(err, null);
  }
}

//επιστρέφει τις κρατήσεις ενός χρήστη με cleint_id για να τις δει στο profilePage
async function getProfileBookings(client_id, callback) {
  const sql = `select "room_type_name","total_price","room_type_photo","breakfast","fastwifi","arrival_date","dep_date" from "roomTypep" join "includes"
  on "includes"."room_id"="roomTypep"."room_id"
  join "booking" on "booking"."booking_id"="includes"."booking_id" where "client_id" = $1 ORDER BY "booking"."booking_id" DESC `;
  //ORDER εμφανίζει το τελευταίο booking πρώτο
  try {
    const client = await connect();
    const res = await client.query(sql, [client_id]);
    await client.release();
    callback(null, res.rows); // επιστρέφει array
    // console.log("rows", res.rows);
  } catch (err) {
    callback(err, null);
  }
}

//επιστρέφει όλα τα δωμάτια στην αρχική σελίδα
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

//επιστρέφει ένα δωμάτιο στην περιγραφή του δωματίου
async function getRoom(id, callback) {
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

//Προσθέτει ένα booking στο πίνακα της βάσης (BOOKING ID, PRICE, DATE, EXTRA_ID)
async function insertBooking(
  totalPrice,
  bookingDate,
  client_id,
  breakfast,
  fastwifi,
  callback
) {
  const sql = `INSERT INTO "booking" ( "total_price", "booking_date","client_id","breakfast","fastwifi") VALUES ($1, $2, $3, $4,$5) RETURNING booking_id`;
  try {
    const client = await connect();
    const res = await client.query(sql, [
      totalPrice,
      bookingDate,
      client_id,
      breakfast,
      fastwifi,
    ]);
    await client.release();
    callback(null, res.rows[0].booking_id);
    // console.log("booking id", res.rows[0].booking_id);
  } catch (err) {
    callback("booking error " + err);
  }
}

//Προσθέτει τα includes του στο πίνακα της βάσης (ARRIVAL DATE, DEPARTURE DATE, BOOKING ID, ROOM ID)
async function insertIncludes(
  arrival_date,
  dep_date,
  booking_id,
  room_id,
  callback
) {
  const sql = `INSERT INTO "includes" ( "arrival_date","dep_date","booking_id","room_id") VALUES ($1, $2, $3, $4 )`;
  try {
    const client = await connect();
    await client.query(sql, [arrival_date, dep_date, booking_id, room_id]);
    await client.release();
    callback(null);
  } catch (err) {
    callback("includes error " + err);
  }
}

//Να κάνει update τα toggle που άλλαξε ο χρήστης
async function updateExtras(breakfast, fastwifi, booking_id, callback) {
  const sql = `UPDATE booking SET "breakfast"=$1, "fastwifi"=$2 WHERE "booking_id"=$3`;
  try {
    const client = await connect();
    await client.query(sql, [breakfast, fastwifi, booking_id]);
    await client.release();
    callback(null);
    // console.log("booking id", res.rows[0].booking_id);
  } catch (err) {
    callback("includes error " + err);
  }
}

//Κάνει update τα reviews που βάζει ο χρήστης στη σελίδα του χρήστη
async function updateExtras2(reviews, booking_id, callback) {
  const sql = `UPDATE includes SET "reviews"=$1 WHERE "booking_id"=$2`;
  try {
    const client = await connect();
    await client.query(sql, [reviews, booking_id]);
    await client.release();
    callback(null);
    console.log("booking id", res.rows[0].booking_id);
  } catch (err) {
    callback("includes error " + err);
  }
}

export {
  connect,
  getUserId,
  getRoom,
  getRoomDesc,
  checkUser,
  addUser,
  checkEmail,
  insertBooking,
  getRoomGuestDate,
  getReservations,
  insertIncludes,
  getProfileBookings,
  updateExtras,
  updateExtras2,
};
