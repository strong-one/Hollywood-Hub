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
  // target only the buttons in the cards
  if (event.target.getAttribute("type") === "button") {
    event.preventDefault();
    console.log(event.target.getAttribute("pinName"));
    // send the name of the pin to the modal remove button
    confrimRemovePinBtn.setAttribute(
      "pinName",
      event.target.getAttribute("pinName")
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
    newCard.classList.add("card");
    newCard.classList.add("col-3");
    newCard.classList.add("m-1");
    newCard.innerHTML = `
    <div class="card-body">
      <h5 class = "card-title">${pin.name}</h5>
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

  // for each pin, create a template of the name chosen to be saved.
  // pins.forEach((pin) => {
  //   template += `
  //     <h6>${pin}</h6>
  //   `;
  // });
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
