var baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
var heartContainer = document.querySelector("#hearcontianer");
var publicApi = "5676e7d9c3a3777b9fb6a77f56ea448c";
var searchword = "Iron man";

//var submitButton = document.querySelector("#submit-button");
//var heroInput = document.querySelector("#hero-input");

function searchHero(searchword) {
    if (searchword) {
        console.log(searchword);
        baseUrl = "https://gateway.marvel.com:443/v1/public/characters?name=" + searchword + "&apikey=5676e7d9c3a3777b9fb6a77f56ea448c";
    }console.log(baseUrl);
    fetch(baseUrl)
    .then(function(response){
        if (!response.ok) {
            throw response.json();
            }
            return response.json();
            })
    .then(function(data){
        // showing data
        console.log(data);
        console.log(data.data.results);
        console.log(data.data.results[0].id);
        console.log(data.data.results[0].name);
        console.log(data.data.results[0].description);
        //console.log(data.data.results[0].thumbnail.path);
        //console.log(data.data.results[0].thumbnail.extension);

        var heroid = data.data.results[0].id;
        var heroname = data.data.results[0].name;
        var heroDescription = data.data.results[0].description;
        var heroThumbnail = data.data.results[0].thumbnail.path + data.data.results[0].thumbnail.extension;
        
});}

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "id"
      ],
      "channelId": "UCvC4D8onUfXzvjTOM-dBfEA",
      "maxResults": 5,
      "type": [
        "video"
      ],
      "videoEmbeddable": "true"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });



//searchHero(searchword);
$("#submit-button").on("click", function (event) {
    event.preventDefault();

    var searchword = $("#hero-input").val().trim();

    searchHero(searchword);
})



function addToHeartedList(){
    var heartedHero = document.createElement('<a>');

    heartedHero.classList.add("button expanded", "btn");

    heartedHero.setAttribute("data-hero", searchword);
    heartedHero.textContent = searchword;
    heartContainer.appendChild(searchword)

}