const searchModal = document.querySelector("#searchModal");
const searchFormat = document.querySelector("#format");
const searchQuery = document.querySelector("#searchQuery");

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
  let template = "";

  // for each pin, create a template of the name chosen to be saved.
  pins.forEach((pin) => {
    template += `
      <h6>${pin}</h6>
    `;
  });
  // pins-insert is the id of container that will hold template and display on html
  document.querySelector("#pins-insert").innerHTML = template;
  // add specicic ids for movies/tv to pin seperately in selected IDs
};

renderPins();
