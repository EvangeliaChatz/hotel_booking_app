// CURRENT DATE AT INPUT SEARCH
// Get the current date
const today = new Date();

// Add two days to the current date
const twoDaysLater = new Date(today);
twoDaysLater.setDate(today.getDate() + 2);

// Format the date as YYYY-MM-DD for use in the date inputs
const options = {
  month: "long",
  day: "numeric",
};
let formattedDate = today.toISOString().substr(0, 10);
let formattedDate2 = twoDaysLater.toISOString().substr(0, 10);

console.log(formattedDate);
console.log(formattedDate2);

// Set the value of the inputs to two days from the current date

//PROSPATHEIA GIA OTAN BAZEI PRWTA TO CHECKOUT
// let currentDay = document.getElementById("current-date-input");
// let laterDay = document.getElementById("twodays-date-input");

// currentDay.addEventListener("input", () => {
//   const selectedDate = new Date(currentDay.value);
//   const minDate = selectedDate.toISOString().substr(0, 10);

//   laterDay.setAttribute("min", minDate);
// });

// laterDay.addEventListener("input", () => {
//   const selectedDate = new Date(laterDay.value);
//   const maxDate = selectedDate.toISOString().substr(0, 10);

//   currentDay.setAttribute("max", maxDate);
// });

// currentDay.setAttribute("min", formattedDate);
// currentDay.value = formattedDate;
// laterDay.setAttribute("min", formattedDate);
// laterDay.value = formattedDate2;




let currentDay = document.getElementById("current-date-input");
let laterDay = document.getElementById("twodays-date-input");

currentDay.addEventListener("input", () => {
  const selectedDate = new Date(currentDay.value);
  const minDate = selectedDate.toISOString().substr(0, 10);

  laterDay.setAttribute("min", minDate);
});

if  (!currentDay.value){
currentDay.setAttribute("min", formattedDate);
currentDay.value = formattedDate;
}

if  (!laterDay.value){
laterDay.setAttribute("min", formattedDate);
laterDay.value = formattedDate2;
}






//BOOKING FORM AUTOMATIC FILL
let CheckavailButt = document.getElementById("CheckavailButt");

if (CheckavailButt) {
  CheckavailButt.addEventListener("click", () => {
    //Dates POP UP BOOKING
    const PopUpDateDispl = document.getElementById("popUpDatesDis");
    // const PopUpGuestDispl = document.getElementById("popUpGuestDis");

    //CHECK IN -CHECK OUT INPUTS
    // const PopUpGuestsInp = document.getElementById("popUpGuests").value;
    const PopUpCheckin = document.getElementById("current-date-input").value;
    const PopUpCheckout = document.getElementById("twodays-date-input").value;

   
    // BookingForm.classList.remove("d-none");
    PopConfimation.classList.add("d-none");


    //ELEGXOS AN TO CHECK IN MIKROTERH HMEROMHNIA APO TO CHECK OUT
    if (PopUpCheckin >= PopUpCheckout) {
      // Display an error message or take any other appropriate action
      alert("Check-out date must be greater than the check-in date.");
      return;
    }
    //

    PopUpDateDispl.textContent = `${PopUpCheckin} - ${PopUpCheckout}`;
    console.log("PopUpDateDispl");
    // PopUpGuestDispl.textContent = `${PopUpGuestsInp} adults`;
  });
}

//TOTAL PRICE CALCULATION-EXTRA CHECKBOXES
let counter = document.getElementById("total-price");
// let bookFormPrice =document.getElementById("priceEx");
let ChechBreakf =document.getElementById("breakf-ex");
// bookFormPrice.value=counter.textContent;


let checkbox1 = document.getElementById("flexSwitchCheckDefault");
if (checkbox1) {
  checkbox1.addEventListener("change", function () {
    if (checkbox1.checked) {
      // Increment the counter by 5
      counter.textContent = parseInt(counter.textContent) + 5 + "€";
      ChechBreakf.value = true;
    } else {
      // Decrement the counter by 5
      counter.textContent = parseInt(counter.textContent) - 5 + "€";
      ChechBreakf = false;
    }
    console.log(ChechBreakf);
    // bookFormPrice.value=counter.textContent;
  });
}


let checkbox2 = document.getElementById("flexSwitchCheckDefault2");
let FastWifi = document.getElementById("fastwifi-ex");
if (checkbox2) {
  checkbox2.addEventListener("change", function () {
    if (checkbox2.checked) {
      // Increment the counter by 8
      counter.textContent = parseInt(counter.textContent) + 8 + "€";
      FastWifi.value = true;
    } else {
      // Decrement the counter by 8
      counter.textContent = parseInt(counter.textContent) - 8 + "€";
      FastWifi.value = false;
    }
    console.log(FastWifi);
    // bookFormPrice.value=counter.textContent;
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
  };
  

//  parse a date in yyyy-mm-dd format
function string2Date(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }


  ///YPOLOGISMOS TOTAL PRICE KAI STO PRODUCCT DESCRIPTION OPWS STH BOOKING LIST
  // TypeRoomPrice RIMH POY YPARXEI
///////////////////////
  



//BOOKING FORM AUTOMATIC FILL ---LOAD BOOK ROOM POP IPFOR BOOKING LIST FOR EACH ROOM
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

      //Adults display
      let PopUpGuestDispl = document.getElementById(`list-results-adl-${i}`);
      let PopUpGuest = document.getElementById("popUpGuestDis");
      PopUpGuest.textContent = PopUpGuestDispl.textContent;

      //Price Display

      // PopUpPrice.textContent= ((PopUpCheckout- PopUpCheckin)*PopUpPriceDispl).value

      // pipupPriceDispl θα παιρνει την τιμη απο το total-price x τις μερες που θα μενει ο χρηστης 
      let PopUpPriceDispl = document.getElementById(`list-results-price-${i}`);
      // 
      let PopUpPrice = document.getElementById("total-price");
      PopUpPrice.textContent = PopUpPriceDispl.textContent;

      

      //Dates POP UP BOOKING
      const PopUpDateDispl = document.getElementById("popUpDatesDis");

      //CHECK IN -CHECK OUT INPUTS
      // const PopUpGuestsInp = document.getElementById("popUpGuests").value;
      const PopUpCheckin = document.getElementById("current-date-input").value;
      const PopUpCheckout = document.getElementById("twodays-date-input").value;

      PopUpDateDispl.textContent = `${PopUpCheckin} - ${PopUpCheckout}`;
      console.log("PopUpDateDispl");

      //Display the prices for the days that the user will stay
     const NumberOfDays= getDaysBetweenDates( PopUpCheckin, PopUpCheckout);
    //  console.log(NumberOfDays);
     PopUpPrice.textContent= `${NumberOfDays*parseInt(PopUpPriceDispl.textContent)} €`;


      document.getElementById("flexSwitchCheckDefault").checked = false;
      document.getElementById("flexSwitchCheckDefault2").checked = false;
    });
  }
}

// EXCHANGE FORMS
const textSignUp = document.querySelector("#SignUp");
const textSignIn = document.querySelector("#SignIn");

const signUpForm = document.querySelector("#Sign-up-form");
const signInForm = document.querySelector("#Sign-in-form");

textSignUp.addEventListener("click", () => {
  console.log("click");
  signUpForm.style.display = "block";
  signInForm.style.display = "none";
});

textSignIn.addEventListener("click", () => {
  signUpForm.style.display = "none";
  signInForm.style.display = "block";
});

//PROIGOUMENH LYSH GIA TA REVIEW
// //ReviewSubmit  writeReview
// const ReviewSubmit  = document.querySelector("#ReviewSubmit");
// const writeReview = document.querySelector("#writeReview");
// const ReviewForm = document.querySelector("#ReviewForm");
// const CancelReview = document.querySelector("#CancelReview");

// if (writeReview && ReviewForm && CancelReview && ReviewSubmit) {
// writeReview.addEventListener("click", () => {
//   ReviewForm.style.display = "block";
//   writeReview.style.display = "none";
// });

// CancelReview.addEventListener("click", () => {
//   ReviewForm.style.display = "none";
//   writeReview.style.display = "flex";
// });
// }





///SUMBIT FORM--CONFIRMATION MESSAGE

function validateForm() {
  // submit form

  // Get the form and the confirmation message elements
  const form = document.querySelector("#booking-form");
  const confirmationMsg = document.querySelector("#confirmation-message");

  // Add an event listener to the form submit button
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // Remove the d-none class from the confirmation message
    confirmationMsg.classList.remove("d-none");

    // Add the d-none class to the booking form
    form.classList.add("d-none");
  });
}

// const myBookingForm = document.getElementById("form-booking");
// const submitBtn = document.getElementById('sumbit-booking');

// myBookingForm.addEventListener("submit", function(event) {
//   // Prevent form submission if any validation fails
//   if (!validateName() || !validatePass() ) {
//     event.preventDefault();
// } else {

// const confirmationMessage = document.getElementById('confirmation-message');
// const bookingForm = document.getElementById('booking-form');
//   bookingForm.classList.add('d-none');
//   confirmationMessage.classList.remove('d-none');
// }

// });

// // form validation
// //validate name
// function validateName() {
//   const nameInput = document.getElementById("floatingInput_name");
//   const nameError = document.getElementById("name-error");

//   nameError.style.color = "red";
//   const namePattern = /^[a-zA-Z]+$/;

//   if (!nameInput.value.match(namePattern)) {
//     nameError.innerHTML = "**Only characters are allowed";
//     nameInput.value='';
//     return false;
//   } else {
//     nameError.innerHTML = "";
//     return true;
//   }
// }

// //validate pass
// function validatePass() {
//   const Pass = document.getElementById("floatingInput_pass")
//   const PassError = document.getElementById("pass-error");

//   const PassPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?!.*\s).{8,10}$/

//   PassError.style.color = "red";

//   if (!Pass.value.match(PassPattern)) {
//     PassError.innerHTML = "**The password must have 8-10 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character";
//     PassError.value='';
//     return false;
//   } else {
//     PassError.innerHTML = "";
//     return true;
//   }
//   }

// MODAL--POP UP MESSAGE
var triggerTabList = [].slice.call(document.querySelectorAll("#myTab a"));
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});

// CAROUSEL CHANGING
// const carouselScript = document.querySelector('.carousel');
// console.log(carouselScript);

// const dragging = (e) => {
//     carouselScript.scrollLeft = e.pageX;
// }

// carouselScript.addEventListener("mousemove", dragging);

// FORM VALIDATION BOOTSTRAP

// CAROUSEL
// $(document).ready(function() {
//   $('#carousel0').bxSlider({
//       easing: 'ease-in-out',
//       pager: false,
//       slideWidth: 1200,
//       slideMargin: 10,
//       minSlides: 3,
//       maxSlides: 3,
//       moveSlides: 1,
//       nextSelector: $('#bx-controls-direction2'),
//     prevSelector: $('#bx-controls-direction2'),
//       nextText: '' +
//               '<span class="fa-stack fa-lg">' +
//                   '<i class="fa fa-chevron-right fa-stack-1x">' +
//               '</span>',
//       prevText: '' +
//               '<span class="fa-stack fa-lg">' +
//                   '<i class="fa fa-chevron-left fa-stack-1x">' +
//               '</span>'
//   });
// });

// });

//PHOTO CAROUSEL BOOTSTRAP
if (document.getElementsByClassName("carousel").length > 0) {
  $(".carousel .carousel-item").each(function () {
    var minPerSlide = 4;
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }
    next.children(":first-child").clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
      next = next.next();
      if (!next.length) {
        next = $(this).siblings(":first");
      }
      next.children(":first-child").clone().appendTo($(this));
    }
  });
}


//Confirmation message display
const PopConfimation = document.getElementById("confirmation-message");
const BookingForm = document.getElementById("booking-form");
const BookingSubmit = document.getElementById("sumbit-booking");
if (BookingSubmit && BookingForm && PopConfimation){
BookingSubmit.addEventListener("click", () => {
  // Hide the booking form and display the confirmation message
  BookingForm.classList.add("d-none");
  PopConfimation.classList.remove("d-none");
});

};


//LOADER LG OUT EFFECT SCRIPT
function startLoading(event) {
  event.preventDefault(); // Prevent the default behavior of the link

  var loaderContainer = document.getElementById("loaderContainer");
  loaderContainer.style.display = "block"; // Show the loader container

  // Simulate a delay before stopping the loading feature
  setTimeout(stopLoading, 2000);
}


function stopLoading() {
  var loaderContainer = document.getElementById("loaderContainer");
  loaderContainer.style.display = "none"; // Hide the loader container

  // Redirect to the /deleteBooking page
  window.location.href = "/logOut";
}


//CURSOR EFFECT
document.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(event) {
  const wavyEffect = document.createElement('div');
  wavyEffect.classList.add('wavy-effect');
  document.body.appendChild(wavyEffect);

  wavyEffect.style.top = event.clientY + 'px';
  wavyEffect.style.left = event.clientX + 'px';

  setTimeout(() => {
    wavyEffect.remove();
  }, 1000);
}



