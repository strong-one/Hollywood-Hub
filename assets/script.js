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

  //create template - empty string to be able to display multiple templets for each pin
  // let template = "";

  pins.forEach((pin) => {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.classList.add("col-3");
    newCard.innerHTML = `
    <h5 class = "card-title">${pin.name}</h5>
    <button class="btn btn-danger"> remove</button>
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
  document.querySelector("#pins-insert").innerHTML = template;
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
