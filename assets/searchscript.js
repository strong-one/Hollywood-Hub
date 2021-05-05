//----------------------
// variable declaration
//----------------------
const aduiodbKey = 1;
const ombdKey = "eefbdf3d";
//----------------
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
      newUrl = `theaudiodb.com/api/v1/json/${aduiodbKey}/search.php?s=${query}`;
      break;
    }
    case "movie": {
      newUrl = `http://www.omdbapi.com/?apikey=${ombdKey}}&type=${format}&t=${query}`;
      break;
    }
    case "series": {
      newUrl = `http://www.omdbapi.com/?apikey=${ombdKey}}&type=${format}&t=${query}`;
      break;
    }
  }
  console.log(newUrl);
  audiodbCall(newUrl);
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
      }
      return response.json();
    })
    .then(function (data) {});
}
