$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search); //constructing URl with saved parameters from the window location href
  var longitude = urlParams.get("longitude"); // getting stateName from the URL
  console.log(longitude);
  var latitude = urlParams.get("latitude"); // getting the activities from the URL
  console.log(latitude);
  var parkCode = urlParams.get("parkCode"); // getting the activities from the URL
  console.log(parkCode);
  var cityName = urlParams.get("city");
  console.log(cityName);
  

  getMap(latitude, longitude);

  function getMap(lat, lon) {
    var mymap = L.map("mapid").setView([lat, lon], 13);
    var marker = new L.marker([lat, lon]);
    marker.addTo(mymap);

    // here we are creating a MapBox Streets tile layer. Involves
    // creating attribution text and max zoom level
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianl6cGtyMHJ2ejJzdGRkamk4amV1byJ9.dvCAei1CaORvJiWXoaEn5g",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 10,
        id: "mapbox/streets-v11",
        //this is
        tileSize: 512,
        zoomOffset: -1,
        // attributionControl: false,
        accessToken:
          "pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianl6cGtyMHJ2ejJzdGRkamk4amV1byJ9.dvCAei1CaORvJiWXoaEn5g",
      }
    ).addTo(mymap);
  }

  var queryURL = "";
  var resultsClass = $(".results");

  var detailSidebar = $("#detailSidebar");
  var detailMain = $("#detailMain");
  var detailImageArea = $("#detailImages");

  //variables used for loops --- i, j, k, l, m

  //CONFIRMS THAT detailMain is accessible inside a function
  //var testingButton = $("<button>").text("Testing").appendTo(detailMain);
  //testingButton.click(function () {

  displayDetails();

  function displayDetails() {
    detailMain.empty();
    detailSidebar.empty();

    var apiKey = "9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd";

    /*  var queryURL =
      "https://developer.nps.gov/api/v1/parks?api_key=" +
      apiKey +
      "&stateCode=" +
      "NY";
  */
    var queryURLPark =
      "https://developer.nps.gov/api/v1/parks?api_key=" +
      apiKey +
      "&parkCode=" +
      parkCode;

    $.ajax({
      url: queryURLPark,
      method: "GET",
    }).then(function (data) {
      console.log(data);
      console.log(data.data[0].fullName);

      var park = data.data[0];

      var detailsParkName = $("<h2>")
        .text(park.fullName)
        .attr("id", "detailsParkName")
        .appendTo(detailMain);
      var detailsDescription = $("<h4>")
        .text(park.description)
        .appendTo(detailMain);

      var detailActivitiesArea = $("<div id='detailActivitiesArea'>").appendTo(
        detailMain
      );
      var detailsActivitiesSubheading = $("<h4 class='detailCardSubheading'>")
        .text("Activities")
        .appendTo(detailActivitiesArea);

      var divOfActivityPtags = $("<div>").addClass("detailsP");
      for (var j = 0; j < park.activities.length; j++) {
        var detailsActivitiesParagraph = $("<p>")
          .text(park.activities[j].name)
          .appendTo(divOfActivityPtags);
      }
      divOfActivityPtags.appendTo(detailActivitiesArea);

      var detailTopicsArea = $("<div id='detailTopicsArea'>").appendTo(
        detailMain
      );
      var detailsTopicsSubheading = $("<h4 class='detailCardSubheading'>")
        .text("Topics")
        .appendTo(detailTopicsArea);

      var divOfThemePtags = $("<div>").addClass("detailsP");
      for (var k = 0; k < park.topics.length; k++) {
        var detailsTopicsParagraph = $("<p>")
          .text(park.topics[k].name)
          .appendTo(divOfThemePtags);
      }
      divOfThemePtags.appendTo(detailTopicsArea);

      var detailsAddressSubheading = $("<h4>")
        .text("Address")
        .appendTo(detailSidebar);
      var detailsAddress1 = $("<p>")
        .text(park.addresses[0].line2)
        .appendTo(detailSidebar);
      var detailsAddress2 = $("<p>")
        .text(park.addresses[0].line3)
        .appendTo(detailSidebar);
      var detailsCityStateZip = $("<p>")
        .appendTo(detailSidebar)

        .text(
          park.addresses[0].city +
            ", " +
            park.addresses[0].stateCode +
            park.addresses[0].postalCode
        );
      var detailsDirectionsText = $(
        "<a href='data.data[0].directionsUrl'>"
      ).text(park.directionsUrl);
      var lineBreak = $("<br>").appendTo(detailSidebar);

      var detailsContactsSubheading = $("<h4>")
        .text("Contacts")
        .appendTo(detailSidebar);
      var detailsPhone = $("<p>")
        .text(
          "Phone: " +
            park.contacts.phoneNumbers[0].phoneNumber[0] +
            park.contacts.phoneNumbers[0].phoneNumber[1] +
            park.contacts.phoneNumbers[0].phoneNumber[2] +
            " " +
            park.contacts.phoneNumbers[0].phoneNumber[3] +
            park.contacts.phoneNumbers[0].phoneNumber[4] +
            park.contacts.phoneNumbers[0].phoneNumber[5] +
            "-" +
            park.contacts.phoneNumbers[0].phoneNumber[6] +
            park.contacts.phoneNumbers[0].phoneNumber[7] +
            park.contacts.phoneNumbers[0].phoneNumber[8] +
            park.contacts.phoneNumbers[0].phoneNumber[9]
        )
        .appendTo(detailSidebar);
      var detailsEmail = $(
        "<a href='data.data[0].contacts.emailAddresses[0].emailAddress'>"
      )
        .text("Email: " + park.contacts.emailAddresses[0].emailAddress)
        .appendTo(detailSidebar);
      var lineBreak2 = $("<br>").appendTo(detailSidebar);

      var detailsWebsite = $("<a href='data.data[0].url)'>")
        .text("Website: " + data.data[0].url)
        .appendTo(detailSidebar);
      var lineBreak3 = $("<br>").appendTo(detailSidebar);

      var detailsFee = $("<p>").text(
        "Entrance Fee: " + park.operatingHours[0].standardHours
      );

      var detailsHours = $("<h4>")
        .text("Operating Hours")
        .appendTo(detailSidebar);
      var detailsSunday = $("<p>")
        .text("Sunday: " + park.operatingHours[0].standardHours.sunday)
        .appendTo(detailSidebar);
      var detailsMonday = $("<p>")
        .text("Monday: " + park.operatingHours[0].standardHours.monday)
        .appendTo(detailSidebar);
      var detailsTuesday = $("<p>")
        .text("Tuesday: " + park.operatingHours[0].standardHours.tuesday)
        .appendTo(detailSidebar);
      var detailsWednesday = $("<p>")
        .text("Wednesday: " + park.operatingHours[0].standardHours.wednesday)
        .appendTo(detailSidebar);
      var detailsThursday = $("<p>")
        .text("Thursday: " + park.operatingHours[0].standardHours.thursday)
        .appendTo(detailSidebar);
      var detailsFriday = $("<p>")
        .text("Friday: " + park.operatingHours[0].standardHours.friday)
        .appendTo(detailSidebar);

      var detailsSaturday = $("<p>")
        .text("Saturday: " + park.operatingHours[0].standardHours.saturday)
        .appendTo(detailSidebar);

      for (var m = 1; m < park.images.length; m++) {
        var detailImages = $("<img class='detailImageItem'>")
          .attr("src", park.images[m].url)
          .attr("alt", park.images[m].altText)
          .appendTo(detailImageArea);
      }
    });

    // Get API key.
    var weatherURL =
    //get weather by latitude and longitude
    "https://api.openweathermap.org/data/2.5/weather?appid=571d9f58c398657c20313ac4142d50fd&us&mode&units=imperial&lat=" + latitude + "&lon=" + longitude;

    $.ajax({
      url: weatherURL,
      method: "GET",
    }).then(function (data) {
      console.log(data);
      var bootstrapCardEl = $(
        '<div class="card bg-info" style="width: 16rem;"></div>'
      );
      var cardImgEl = $(
        '<img src="http://openweathermap.org/img/wn/' +
        data.weather[0].icon +
          '@2x.png" class="card-img-top" alt="..."></img>'
      );
      var cardBodyEl = $(
        '<div class="card-body">' +
          "<h5>" +
          data.name +
          " , " +
          data.sys.country +
          "</h5>" +
          "</div>"
      );
      var h5El = $(
        '<h5 class="card-title">' +
          data.weather[0].main +
          " -- " +
          data.weather[0].description +
          "</h5>"
      );
      var bodytemp = $(
        '<p class="card-text">' +
          "Temp: " +
          data.main.temp +
          "º" +
          "<br>" +
          "Feels Like: " +
          data.main.feels_like +
          "º" +
          "<br>" +
          "Min. " +
          data.main.temp_min +
          "º" +
          " | Max. " +
          data.main.temp_max +
          "º" +
          "<br>" +
          "Humidity: " +
          data.main.humidity +
          "%" +
          "<br>" +
          "Wind Speed: " +
          data.wind.speed +
          " mph" +
          "</p>"
      );
      cardBodyEl.append(h5El).append(bodytemp);
      bootstrapCardEl.append(cardImgEl).append(cardBodyEl);
      $("#weatherDashboard").append(bootstrapCardEl);
    });
    //  });       //THE ENDING PARANTHESIS RELATED TO TESTING BUTTON
  }
});
