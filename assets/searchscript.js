//----------------------
// variable declaration
//----------------------
const aduiodbKey = 1;
const ombdKey = "eefbdf3d";

const searchModal = document.querySelector("#searchModal");
const searchFormat = document.querySelector("#format");
const searchQuery = document.querySelector("#searchQuery");

const infoDisplay = document.querySelector("#display");

// call functions
//----------------

parseLocation();

//---------------
// eventListener
//---------------
searchModal.addEventListener("submit", function (event) {
  event.preventDefault();
  let format = searchFormat.value;
  let query = searchQuery.value;

  location.assign(`./searchresult.html?q=${query}&format=${format}`);
});

// add on click event for pin button that will save info to front page save area

document.querySelector("#display").addEventListener("click", function (event) {
  // looking for an id within the static element of html with index of pinSrh
  if (event.target.getAttribute("id").indexOf("pinSrh") > -1) {
    event.preventDefault();
    // get data of what I want populated
    var pinName = event.target.getAttribute("data");
    var pinType = event.target.getAttribute("format");
    var pinImg = event.target.getAttribute("img");
    // parsing pins and turning them into objects, if none, there will be an empty array
    var pins = JSON.parse(localStorage.getItem("pins")) || [];

    var filteredPins = pins.filter(function (pin) {
      // if pin is existing, do not add (false), else, add to array (true)
      if (pin.name === pinName) {
        return false;
      } else {
        return true;
      }
    });
    // artist name will be selected for pin on html
    filteredPins.push({ name: pinName, format: pinType, img: pinImg });
    // all filtered pins will be stored in Locally
    localStorage.setItem("pins", JSON.stringify(filteredPins));

    // need to render filteredPins to populate on HTML
  }
});
//-----------
// Functions
//-----------

// parse the url for the parameters
function parseLocation() {
  let parameters = [];
  // get the parameters form the url
  let split = location.href.split("?")[1];
  let params = split.split("&");

  for (i = 0; i < params.length; i++) {
    parameters.push(params[i].split("="));
  }
  let format = parameters[1][1];
  let query = parameters[0][1];
  console.log(format);
  console.log(query);
  createAPICallUrls(format, query);
}

// create the api calls urls
function createAPICallUrls(format, query) {
  newUrl = "";
  switch (format) {
    case "artist": {
      newUrl = `https://theaudiodb.com/api/v1/json/${aduiodbKey}/search.php?s=${query}`;
      audiodbCall(newUrl);
      break;
    }
    case "movie": {
      newUrl = `https://www.omdbapi.com/?type=${format}&t=${query}&apikey=${ombdKey}`;
      ombdCall(newUrl, format);
      break;
    }
    case "series": {
      newUrl = `https://www.omdbapi.com/?type=${format}&t=${query}&apikey=${ombdKey}`;
      ombdCall(newUrl, format);
      break;
    }
  }
}
// fetch the information
// make a fetch
// get the fetch return as a json file type
//
function audiodbCall(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      // do things to get info to page
      displayBand(data);
    });
}

function ombdCall(requestUrl, format) {
  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      if (data.Response === "True") {
        if (format === "series") {
          displayShow(data);
        } else if (format === "movie") {
          movieDisplay(data);
        }
      } else {
        displayNoResultsFound();
      }
    });
}

// display the band information

function displayBand(data) {
  if (data.artists !== null) {
    let band = data.artists[0];
    let temp = `
        <div class="card mb-3">
          <img class="card-img-top w-50 h-50 mx-auto m-3" src="${band.strArtistLogo}" alt="Band Logo" />
          <button type="button" id="pinSrh" class="w-25 m-auto btn btn-primary" data="${band.strArtist}"format = "artist" img="${band.strArtistLogo}">Pin????</button>
          <div class="card-body">
            <h5 class="card-title">${band.strArtist}</h5>
            <p class="card-text px-5">${band.strBiographyEN}</p>
            <h6 class="card-title">Discography</h6>
            <div class="row" id="discography">
              
            </div>
          </div>
        </div>
    `;
    infoDisplay.innerHTML = temp;
    getDiscography(band.idArtist);
  } else {
    displayNoResultsFound();
  }
}
// get and display the discography for the selected artist
function getDiscography(artistID) {
  let url = `https://theaudiodb.com/api/v1/json/${aduiodbKey}/album.php?i=${artistID}`;
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      let albums = data.album;
      let albumDisplay = document.querySelector("#discography");
      albums.forEach((album) => {
        // create new element
        let newCard = document.createElement("div");
        // add class and styling to the card
        newCard.classList.add("card");
        newCard.classList.add("m-2");
        newCard.setAttribute("style", "width: 18rem;");
        // set the inner html to show album info
        newCard.innerHTML = `
          <img class="card-img-top" src="${album.strAlbumThumb}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${album.strAlbum}</h5>
          <p class="card-text">${album.intYearReleased}</p>
          </div>
        `;
        // add as child to element
        albumDisplay.appendChild(newCard);
      });
    });
}

// display the tv show information
function displayShow(data) {
  var temporary = `<section class="tvShows">
  <div class="card mb-3 text-center">
  <img class="card-img-top w-25 h-25 mx-auto m-3" src="${data.Poster}" alt="Tv Posters" />
  <button type="button" id="pinSrh" class="w-25 m-auto btn btn-primary" data="${data.Title}" format = "series" img="${data.Poster}">Pin????</button>
  <h1> ${data.Title} </h1>
  <h2 class="actor">Actors :</h2>
  <p> ${data.Actors} </p>
  <h2 class="awards">Awards :</h2>
  <p> ${data.Awards}
  <h2 class="plot">Plot : </h2>
  <p> ${data.Plot} </p>
  <h2 class="rated">Tv Rating: </h2>
  <p> ${data.Rated} </p>
  <h3 class="released">Released Date:</h3>
  <p>${data.Released}</p>
  <h3 class="totalSeasons">Total Seasons:</h3>
  <p>${data.totalSeasons}</p>
  </div>

</section>`;
  infoDisplay.innerHTML = temporary;
}
// display the movie information
function movieDisplay(data) {
  var movies = `<section class="movieDisplay">
  <div class="card mb-3 text-center">
        <img class="card-img-top w-25 h-25 mx-auto m-3" src="${data.Poster}" alt="Movie Posters" />
  <button type="button" id="pinSrh" class="w-25 m-auto btn btn-primary" data="${data.Title}" format = "movie" img="${data.Poster}" >Pin????</button>
  <h1> ${data.Title} </h1>
  <h2 class="actor">Actors :</h2>
  <p> ${data.Actors} </p>
  <h2 class="awards">Awards :</h2>
  <p> ${data.Awards}</p>
  <h2 class="plot">Plot : </h2>
  <p> ${data.Plot} </p>
  <h3 class="rated">Rated: </h3>
  <p> ${data.Rated} </p>
</section>`;
  infoDisplay.innerHTML = movies;
}

function displayNoResultsFound() {
  let temp = `
  <h1>
    Sorry, No results found.
  </h1>
  <p>please check for spelling errors and punctuation</p>
  `;
  infoDisplay.innerHTML = temp;
}
