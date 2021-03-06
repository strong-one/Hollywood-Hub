const searchModal = document.querySelector("#searchModal");
const searchFormat = document.querySelector("#format");
const searchQuery = document.querySelector("#searchQuery");
const artistPin = document.querySelector("#pins-insert");
const tvshowPin = document.querySelector("#pins-insert-tv");
const moviePin = document.querySelector("#pins-insert-mov");
const pinDisplay = document.querySelector("#pinDisplay");
const confrimRemovePinBtn = document.querySelector("#confirmRemoveBtn");
// ----------------
// event listeners
// ----------------

searchModal.addEventListener("submit", function (event) {
  event.preventDefault();
  let format = searchFormat.value;
  let query = searchQuery.value;

  location.assign(`./searchresult.html?q=${query}&format=${format}`);
});
// pin level remove pin button click event
pinDisplay.addEventListener("click", (event) => {
  console.log(event.target);
  // target only the buttons in the cards

  if (event.target.getAttribute("id") === "openConfirmModalBtn") {
    event.preventDefault();
    event.stopPropagation();
    console.log("pressed the remove key btn");
    console.log(event.target.getAttribute("pinName"));
    // send the name of the pin to the modal remove button
    confrimRemovePinBtn.setAttribute(
      "pinName",
      event.target.getAttribute("pinName")
    );
  } else if (event.target.getAttribute("id") === "pinContent") {
    console.log("search for " + event.target.getAttribute("pinName"));
    location.assign(
      `./searchresult.html?q=${event.target.getAttribute(
        "pinName"
      )}&format=${event.target.getAttribute("pinFormat")}`
    );
  }
});
// confirm remove pin modal button
confrimRemovePinBtn.addEventListener("click", (event) => {
  // remove the pin from the local storage array
  removePin(confrimRemovePinBtn.getAttribute("pinName"));
  // display updated list of pins
  renderPins();
});

// -----------
//  Functions
// -----------

// need to render filteredPins to populate on HTML

const renderPins = () => {
  //get the pins
  const pins = JSON.parse(localStorage.getItem("pins")) || [];

  // clear out the pin areas;
  artistPin.innerHTML = "";
  tvshowPin.innerHTML = "";
  moviePin.innerHTML = "";
  // generate the new content form the array of pins
  pins.forEach((pin) => {
    let newCard = document.createElement("div");

    newCard.classList.add("col-3");
    newCard.classList.add("m-1");
    newCard.innerHTML = `
    
    <div class = "card" >
      <button 
        class = "btn"
        type="button" 
        id="pinContent" 
        pinName = "${pin.name}" 
        pinFormat = "${pin.format}">
        ${pin.name}
      <img 
        class= "img-thumbnail bg-dark" 
        src="${pin.img}" 
        alt="pin Image"
        id="pinContent" 
        pinName = "${pin.name}" 
        pinFormat = "${pin.format}">
        
      </button>
      <button
          type = "button" 
          class="btn btn-danger btn-sm" 
          data-bs-toggle="modal"
          data-bs-target="#openConfirmRemoveModal"
          pinName = "${pin.name}"
          id="openConfirmModalBtn"
        >
          Remove pin
      </button>
    </div>
    `;
    switch (pin.format) {
      case "artist": {
        artistPin.appendChild(newCard);
        break;
      }
      case "series": {
        tvshowPin.appendChild(newCard);
        break;
      }
      case "movie": {
        moviePin.appendChild(newCard);
        break;
      }
    }
  });

  // pins-insert is the id of container that will hold template and display on html
  //document.querySelector("#pins-insert").innerHTML = template;
  // add specicic ids for movies/tv to pin seperately in selected IDs
};

renderPins();

function removePin(name) {
  let pins = JSON.parse(localStorage.getItem("pins")) || [];
  let index = -1;
  for (i = 0; i < pins.length; i++) {
    if (pins[i].name === name) {
      index = i;
      break;
    }
  }
  pins.splice(index, 1);
  localStorage.setItem("pins", JSON.stringify(pins));
}
