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
document.addEventListener("mousedown", handleMouseDown);

function handleMouseDown(event) {
  const wavyEffect = document.createElement("div");
  wavyEffect.classList.add("wavy-effect");
  document.body.appendChild(wavyEffect);

  wavyEffect.style.top = event.clientY + "px";
  wavyEffect.style.left = event.clientX + "px";

  setTimeout(() => {
    wavyEffect.remove();
  }, 1000);
}
