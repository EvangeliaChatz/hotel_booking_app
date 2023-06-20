//Αναφέρεται στο pop up των σελιδών BookingList & RoomDescription
//και Υπολογίζει τις ημέρες ανάλογα με το input του χρήστη
function getDaysBetweenDates(date1, date2) {
  // Calculate the time difference in milliseconds
  date1 = string2Date(date1);
  date2 = string2Date(date2);

  let timeDiff = Math.abs(date2.getTime() - date1.getTime());

  //μετατρέπω σε μέρες
  let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return days;
}

// μετατρέπω τις ημερομηνίες σε μορφή
function string2Date(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

//Breakfast checkbox
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
//Fastwifi checkbox
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
