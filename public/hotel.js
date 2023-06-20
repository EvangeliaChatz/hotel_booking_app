///YPOLOGISMOS TOTAL PRICE KAI STO PRODUCCT DESCRIPTION OPWS STH BOOKING LIST

//BOOKING FORM POP UP AUTOMATIC FILL AT ROOM DESCRIPTION
let CheckavailButt = document.getElementById("CheckavailButt");

if (CheckavailButt) {
  CheckavailButt.addEventListener("click", () => {
    //Ημερομηνίες pop up
    const PopUpDateDisp = document.getElementById("popUpDatesDis");

    //CHECK IN -CHECK OUT INPUTS
    //παίρνει τις ημερομηνίες από το input του χρήστη και όχι από το url όπως το booking list
    const PopUpCheckin = document.getElementById("current-date-input").value;
    const PopUpCheckout = document.getElementById("twodays-date-input").value;
    const PopUpPrice2 = document.getElementById("total-price");

    //DISPLAY THE TOTAL PRICE IN BOOKING LIST BOOKING POP UP-εμφανίζει την συνολική τιμή για τις μέρες που έχει επιλέξει ο χρήστης (αν είναι 2 ημέρες διπλή τιμή κτλπ)
    const NumberOfDays = getDaysBetweenDates(PopUpCheckin, PopUpCheckout);
    console.log(NumberOfDays);
    PopUpPrice2.textContent = `${
      NumberOfDays * parseInt(PopUpPrice2.textContent)
    } €`;

    // BookingForm.classList.remove("d-none");
    PopConfimation.classList.add("d-none");

    //εμφανίζει ημερομηνιών στο pop up
    PopUpDateDisp.textContent = `${PopUpCheckin} - ${PopUpCheckout}`;
    console.log("PopUpDateDispl");
  });
}

//TOTAL PRICE CALCULATION-EXTRA CHECKBOXES
let counter = document.getElementById("total-price");
let bookFormPrice = document.getElementById("priceEx");
let ChechBreakf = document.getElementById("breakf-ex");

let checkbox1 = document.getElementById("flexSwitchCheckDefault");
if (checkbox1) {
  checkbox1.addEventListener("change", function () {
    if (checkbox1.checked) {
      // Increment the counter by 5
      counter.textContent = parseInt(counter.textContent) + 5 + "€";
      if (ChechBreakf) {
        ChechBreakf.value = true;
      }
    } else {
      // Decrement the counter by 5
      counter.textContent = parseInt(counter.textContent) - 5 + "€";
      if (ChechBreakf) {
        ChechBreakf.value = false;
      }
    }
    bookFormPrice.value = counter.textContent.trim("€");

    console.log(ChechBreakf);
  });
}

let checkbox2 = document.getElementById("flexSwitchCheckDefault2");
let FastWifi = document.getElementById("fastwifi-ex");
if (checkbox2) {
  checkbox2.addEventListener("change", function () {
    if (checkbox2.checked) {
      // Increment the counter by 8
      counter.textContent = parseInt(counter.textContent) + 8 + "€";
      if (FastWifi) {
        FastWifi.value = true;
      }
    } else {
      // Decrement the counter by 8
      counter.textContent = parseInt(counter.textContent) - 8 + "€";
      if (FastWifi) {
        FastWifi.value = false;
      }
    }
    console.log(FastWifi);
    // bookFormPrice.value=counter.textContent;
    bookFormPrice.value = counter.textContent.trim("€");
  });
}

//YPOLOGISMOS IMERVN ANALOGA ME TO INPUT TOU XRHSTH(CHECK IN-CHECK OUT)
function getDaysBetweenDates(date1, date2) {
  // Calculate the time difference in milliseconds
  date1 = string2Date(date1);
  date2 = string2Date(date2);

  let timeDiff = Math.abs(date2.getTime() - date1.getTime());

  // Convert the time difference to days
  let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return days;
}

//  parse a date in yyyy-mm-dd format
function string2Date(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

let hiddenArrivalDate = document.getElementById("checkIn-ex");
let hiddenDepDate = document.getElementById("checkOut-ex");
let hiddenRoomId = document.getElementById("roomId-ex");

//BOOKING FORM AUTOMATIC FILL ---LOAD BOOK ROOM POP AT BOOKING LIST
for (
  let i = 0;
  i < document.getElementsByClassName("card-prod-content").length;
  i++
) {
  let CheckavailButt = document.getElementById(`CheckavailButt-${i}`);
  // console.log(i);
  if (CheckavailButt) {
    CheckavailButt.addEventListener("click", () => {
      //Photo Display
      let resultImage = document.getElementById(`list-results-img-${i}`);
      let PopUpImageSrc = document.getElementById("PopUpRoomPhoto");
      PopUpImageSrc.src = resultImage.src;

      //Guests display
      let PopUpGuestDispl = document.getElementById(`list-results-adl-${i}`);
      let PopUpGuest = document.getElementById("popUpGuestDis");
      PopUpGuest.textContent = PopUpGuestDispl.textContent;

      // pipupPriceDispl θα παιρνει την τιμη απο το total-price x τις μερες που θα μενει ο χρηστης
      const PopUpPriceDispl = document.getElementById(
        `list-results-price-${i}`
      );
      const PopUpPrice = document.getElementById("total-price");
      PopUpPrice.textContent = PopUpPriceDispl.textContent;

      //Dates POP UP BOOKING
      const PopUpDateDispl = document.getElementById("popUpDatesDis");

      //CHECK IN -CHECK OUT INPUTS-παίρνει τις τιμές απο τα input του booking form και τις εμφανίζει στο διάστημα των ημερομηνιών του pop up booking
      const PopUpCheckin = document.getElementById("current-date-input").value;
      const PopUpCheckout = document.getElementById("twodays-date-input").value;

      PopUpDateDispl.textContent = `${PopUpCheckin} - ${PopUpCheckout}`;

      //DISPLAY THE TOTAL PRICE IN BOOKING LIST BOOKING POP UP-εμφανίζει την συνολική τιμή για τις μέρες που έχει επιλέξει ο χρήστης (αν είναι 2 ημέρες διπλή τιμή κτλπ)
      const NumberOfDays = getDaysBetweenDates(PopUpCheckin, PopUpCheckout);
      //  console.log(NumberOfDays);
      PopUpPrice.textContent = `${
        NumberOfDays * parseInt(PopUpPriceDispl.textContent)
      } €`;

      //Στο τέλος αποεπιλέγει τα checkbox για να μην εμφανίζονται επιλεγμένα στο επόμενο pop up
      document.getElementById("flexSwitchCheckDefault").checked = false;
      document.getElementById("flexSwitchCheckDefault2").checked = false;
      bookFormPrice.value = counter.textContent.trim("€");

      console.log("PopUpDateDispl");

      let roomId = document.getElementById(`list-results-room-type-id-${i}`);
      if (roomId) {
        hiddenRoomId.value = roomId.value;
        console.log(hiddenRoomId.value);
      }
      hiddenArrivalDate.value = PopUpCheckin;
      hiddenDepDate.value = PopUpCheckout;
      console.log(hiddenArrivalDate.value);
      console.log(hiddenDepDate.value);
      console.log(PopUpCheckin, PopUpCheckout);
    });
  }
}

// ///SUMBIT FORM--CONFIRMATION MESSAGE
// function validateForm() {
//   // submit form

//   // Get the form and the confirmation message elements
//   const form = document.querySelector("#booking-form");
//   const confirmationMsg = document.querySelector("#confirmation-message");

//   // Add an event listener to the form submit button
//   form.addEventListener("submit", () => {
//     // event.preventDefault(); // prevent the default form submission behavior
//     confirmationMsg.classList.remove("d-none");
//     form.classList.add("d-none");
//   });
// }

//Confirmation message display
const PopConfimation = document.getElementById("confirmation-message");
const BookingForm = document.getElementById("booking-form");
const BookingSubmit = document.getElementById("sumbit-booking");
if (BookingSubmit && BookingForm && PopConfimation) {
  BookingSubmit.addEventListener("click", () => {
    // Hide the booking form and display the confirmation message
    BookingForm.classList.add("d-none");
    PopConfimation.classList.remove("d-none");
  });
}
