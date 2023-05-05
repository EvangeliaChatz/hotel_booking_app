



// FOR DROPDOWN MENU (BOOTSTRAPT)
// $('.dropdown-toggle').dropdown()

// function myFunction() {
//   alert("Hello! I am an alert box!");
// }
// const x = myFunction();





// CURRENT DATE AT INPUT SEARCH
  // Get the current date
  const today = new Date();


  // Add two days to the current date
  const twoDaysLater = new Date(today);
  twoDaysLater.setDate(today.getDate() + 2);

  // Format the date as YYYY-MM-DD for use in the date inputs
  const options = { 
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = today.toISOString().substr(0, 10);
  const formattedDate2 = twoDaysLater.toISOString().substr(0, 10);

  console.log(formattedDate);
  console.log(formattedDate2);

  // Set the value of the inputs to two days from the current date
  document.getElementById("current-date-input").value = formattedDate;
  document.getElementById("twodays-date-input").value = formattedDate2;




// EXCHANGE FORMS
const textSignUp = document.querySelector('#SignUp');
const textSignIn = document.querySelector('#SignIn');

const signUpForm = document.querySelector('#Sign-up-form');
const signInForm = document.querySelector('#Sign-in-form');

textSignUp.addEventListener('click', () => {
  signUpForm.style.display = 'block';
  signInForm.style.display = 'none';

});

textSignIn.addEventListener('click', () => {
  signUpForm.style.display = 'none';
  signInForm.style.display = 'block';
});




///SUMBIT FORM--CONFIRMATION MESSAGE

function validateForm() {
// submit form

// Get the form and the confirmation message elements
const form = document.querySelector('#booking-form');
const confirmationMsg = document.querySelector('#confirmation-message');

// Add an event listener to the form submit button
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission behavior
  
  // Remove the d-none class from the confirmation message
  confirmationMsg.classList.remove('d-none');
  
  // Add the d-none class to the booking form
  form.classList.add('d-none');
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
var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})



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
$('.carousel .carousel-item').each(function () {
  var minPerSlide = 4;
  var next = $(this).next();
  if (!next.length) {
  next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  for (var i = 0; i < minPerSlide; i++) { next=next.next(); if (!next.length) { next=$(this).siblings(':first'); } next.children(':first-child').clone().appendTo($(this)); } });