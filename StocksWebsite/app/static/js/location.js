function get_location() {
  navigator.geolocation.getCurrentPosition(function(position) {
    positionString = position.coords.latitude + ',' + position.coords.longitude;
    document.getElementById("location").textContent = "Location: " + positionString;
  });
}

// Wait until the HTML is fully loaded, then run the function
document.addEventListener("DOMContentLoaded", get_location);