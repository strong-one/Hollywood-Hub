//----------------------
// variable declaration
//----------------------
const aduiodbKey = 1;
const ombdKey = "eefbdf3d";

const searchModal = document.querySelector("#searchModal");
const searchFormat = document.querySelector("#format");
const searchQuery = document.querySelector("#searchQuery");
//----------------
// call functions
//----------------

parseLocation();

//-----------------
// event listeners
//-----------------
searchModal.addEventListener("submit", function (event) {
  event.preventDefault();
  let format = searchFormat.value;
  let query = searchQuery.value;

  location.assign(`./searchresult.html?q=${query}&format=${format}`);
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
      // do things to get info to page
    });
}
// add on click event for pin button that will save info to front page save area
// multiple columns for movies and artists
