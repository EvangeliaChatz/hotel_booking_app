import pg from "pg";
import bcrypt from "bcrypt";

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

//ChekEmail for Sign up (email)
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

async function addUser(full_name, email, password, phone_number, callback) {
  const sql = `INSERT INTO "CLIENT" ("full_name", "email", "password", "phone_number") VALUES ($1, $2, $3, $4) RETURNING "client_id","full_name"`;
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

// TEST---------------------------------
//TESTFORM
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

//TESTFORM
//USER ID "MANUAL-INCREMENT"-AUKSANEI KATA 1 TO ID KATHE FORA POU KANEI POST
async function getUserId(callback) {
  const sql = `Select Max("user_id") from "testform"`;
  const client = await connect();
  const res = await client.query(sql);
  callback(null, res.rows[0].max);
}
// TEST---------------------------------

// SELECT * from "Room" where "adults">='<adults variable>' and "<arrivedate variable >", "<departdate variable>" not in (select "arrivedate","departdate" from includes where "Includes"."room_id"='<id from roomtype>' )
//επιστρέφει όλα τα δωμάτια από n adults κι πάνω και χ ημερομηνίες που έβαλε ο χρήστης

// and not exists (select "arrival_date","dep_date" from includes where "includes"."room_id"="roomTypep"."room_id")
// async function getRoomGuestDate(GuestNumberControl, callback) {
//   const sql = `Select * from "roomTypep"  WHERE "quests_amount" >= $1 `;
//   // const sql = `Select * from "roomTypep"  WHERE "quests_amount" >= $1 and "room_id" not in (select "room_id" from includes where "arrival_date" between $2 and $3 and "dep_date" between $2 and $3)`;

//   try {
//     const client = await connect();
//     const res = await client.query(sql, [GuestNumberControl]);
//     await client.release();
//     callback(null, res.rows); // επιστρέφει array
//     // console.log(res.rows);
//   } catch (err) {
//     callback(err, null);
//   }
// }

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
    // console.log(res.rows);
  } catch (err) {
    callback(err, null);
  }
}

//επιστρέφει τα επεξεργάσιμα στοιχεία ενός χρήστη με cleint_id για να τα επεξεργαστεί στο editProfile
async function getReservations(client_id, callback) {
  const sql = `Select * from "booking" inner join "includes" on "booking"."booking_id"="includes"."booking_id" where "client_id" = $1`;
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
  const sql = `select "room_type_name","total_price","room_type_photo","breakfast","fastwifi","arrival_date","dep_date" from public."roomTypep" join public."includes"
  on public."includes"."room_id"=public."roomTypep"."room_id"
  join public."booking" on public."booking"."booking_id"=public."includes"."booking_id" where "client_id" = $1 ORDER BY public."booking"."booking_id" DESC `;
  //ORDER εμφανίζει το τελευταίο booking πρώτο
  try {
    const client = await connect();
    const res = await client.query(sql, [client_id]);
    await client.release();
    callback(null, res.rows); // επιστρέφει array
    console.log("rows", res.rows);
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

//INSERT BOOKING FORM DATA (BOOKING ID, PRICE, DATE, EXTRA_ID)
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
  } catch (err) {
    callback("booking error " + err);
  }
}

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

//INSERT EXTRAS (BREAKFAST & FASTWIFI)
async function insertExtras(
  extraType,
  extraPrice,
  bookingId,
  extraId,
  callback
) {
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
  checkUser,
  addUser,
  checkEmail,
  insertBooking,
  getBookingId,
  insertExtras,
  getRoomGuestDate,
  getReservations,
  insertIncludes,
  getProfileBookings,
};
