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
    });
}

// add on click event for pin button that will save info to front page save area
// multiple columns for movies and artists

function displayBand(data) {
  let band = data.artists[0];
  let temp = `
      <div class="card mb-3">
        <img class="card-img-top" src="${band.strArtistLogo}" alt="Band Logo" />
        <button type="button" id="pinSrh">Pin💕</button>
        <div class="card-body">
          <h5 class="card-title">${band.strArtist}</h5>
          <p class="card-text">${band.strBiographyEN}</p>
          <h6 class="card-title">discography</h6>
          <div class="row" id="discography">
            
          </div>
        </div>
      </div>
  `;
  infoDisplay.innerHTML = temp;
  getDiscography(band.idArtist);
}

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
        newCard.setAttribute("style", "width: 18rem;");
        // set the inner html to show album info
        newCard.innerHTML = `
          <img class="card-img-top" src="${album.strAlbumThumb}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${album.strAlbum}</h5>
          <p class="card-text">${album.intYearReleased}</p>
          </div>
        `;
        // add as child
        albumDisplay.appendChild(newCard);
      });
    });
}

// function to save pins in local storage

document.querySelector("#pinSrh").addEventListener("click", function () {
  var search = JSON.parse(localStorage.getItem("#searchQuery"));

  var data = document.getElementById("#searchQuery");

  search.push(data);

  localStorage.setItem("searchQuery", JSON.stringify(data));
});
