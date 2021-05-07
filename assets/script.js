const searchModal = document.querySelector("#searchModal");
const searchFormat = document.querySelector("#format");
const searchQuery = document.querySelector("#searchQuery");
const artistPin = document.querySelector("#pins-insert");
const tvshowPin = document.querySelector("#pins-insert-tv");
const moviePin = document.querySelector("#pins-insert-mov");

searchModal.addEventListener("submit", function (event) {
  event.preventDefault();
  let format = searchFormat.value;
  let query = searchQuery.value;

  location.assign(`./searchresult.html?q=${query}&format=${format}`);
});

// need to render filteredPins to populate on HTML

const renderPins = () => {
  //get the pins
  const pins = JSON.parse(localStorage.getItem("pins")) || [];

  // add specicic ids for movies/tv to pin seperately in selected IDs

  pins.forEach((pin) => {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
    <h5 class = "card-title">${pin.name}</h5>
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
  document.querySelector("#pins-insert").innerHTML = template;
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
