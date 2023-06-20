//PHOTO CAROUSEL
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

// EXCHANGE FORMS SIGN IN-SIGN UP
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

// TABS PROFILE PAGE & EDIT PROFILE PAGE
var triggerTabList = [].slice.call(document.querySelectorAll("#myTab a"));
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", function (event) {
    event.preventDefault();
    tabTrigger.show();
  });
});

// Προσθήκη προεπιλογής ημερμηνιών
const today = new Date();
const twoDaysLater = new Date(today);
twoDaysLater.setDate(today.getDate() + 2);

//Μορφοποίηση
const options = {
  month: "long",
  day: "numeric",
};
let formattedDate = today.toISOString().substr(0, 10);
let formattedDate2 = twoDaysLater.toISOString().substr(0, 10);

//'Ελεγχος ημερομηνιών , να μην είναι μικρότερη η δεύτερη από την πρώτη
let currentDay = document.getElementById("current-date-input");
let laterDay = document.getElementById("twodays-date-input");

currentDay.addEventListener("input", () => {
  const selectedDate = new Date(currentDay.value);
  const minDate = selectedDate.toISOString().substr(0, 10);

  laterDay.setAttribute("min", minDate);
});

if (!currentDay.value) {
  currentDay.setAttribute("min", formattedDate);
  currentDay.value = formattedDate;
}

if (!laterDay.value) {
  laterDay.setAttribute("min", formattedDate);
  laterDay.value = formattedDate2;
}
