/////YPOLOGISMOS TOTAL PRICE KAI STO PRODUCCT DESCRIPTION OPWS STH BOOKING LIST

//BOOKING FORM AUTOMATIC FILL AT ROOM DESCRIPTION
let CheckavailButtonGeneral = document.getElementById("CheckavailButt");

// ελεγχος αμα υπαρχει το κουμπι για να μην βγαζει error στο console
// επειδη το αρχειο hotel.js καλειται σε ολες σχεδον τις σελιδες
if (CheckavailButtonGeneral) {
  const PopUpPrice2 = document.getElementById("total-price");

  const totalPrice = PopUpPrice2.textContent;
  // event listener καθε φορα που πατιεται το κουμπι
  CheckavailButtonGeneral.addEventListener("click", () => {
    //Dates POP UP BOOKING
    const PopUpDateDisp = document.getElementById("popUpDatesDis");

    //CHECK IN -CHECK OUT INPUTS
    //παίρνει τις ημερομηνίες από το input του χρήστη και όχι από το url όπως το booking list
    const PopUpCheckin = document.getElementById("current-date-input").value;
    const PopUpCheckout = document.getElementById("twodays-date-input").value;

    //DISPLAY THE TOTAL PRICE IN BOOKING LIST BOOKING POP UP-εμφανίζει την συνολική τιμή για τις μέρες που έχει επιλέξει ο χρήστης (αν είναι 2 ημέρες διπλή τιμή κτλπ)
    const NumberOfDays = getDaysBetweenDates(PopUpCheckin, PopUpCheckout);

    // textContent γιατι θελουμε το κειμενο μεσα απο ενα html element

    PopUpPrice2.textContent = `${NumberOfDays * parseInt(totalPrice)} €`;

    //εμφανίζει ημερομηνιών στο pop up
    PopUpDateDisp.textContent = `${PopUpCheckin} - ${PopUpCheckout}`;
  });
}

//TOTAL PRICE CALCULATION-EXTRA CHECKBOXES
let counter = document.getElementById("total-price");
let bookFormPrice = document.getElementById("priceEx");
let ChechBreakf = document.getElementById("breakf-ex");

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
  let parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

// hidden input για το booking form, ωστε να παιρνει ολες τις σημαντικες πληροφοριες στο post
let hiddenArrivalDate = document.getElementById("checkIn-ex");
let hiddenDepDate = document.getElementById("checkOut-ex");
let hiddenRoomId = document.getElementById("roomId-ex");

//BOOKING FORM AUTOMATIC FILL ---LOAD BOOK ROOM POP AT BOOKING LIST
// κανοουμε loop για ολα τα κουμπια book room που υπαρχουν στην σελιδα
for (
  let i = 0;
  i < document.getElementsByClassName("card-prod-content").length;
  i++
) {
  let CheckavailButt = document.getElementById(`CheckavailButt-${i}`);

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

      // πληροφοριες για το post request
      let roomId = document.getElementById(`list-results-room-type-id-${i}`);
      if (roomId) {
        hiddenRoomId.value = roomId.value;
      }
      // update τις πληροφοριες του booking form
      hiddenArrivalDate.value = PopUpCheckin;
      hiddenDepDate.value = PopUpCheckout;
    });
  }
}
