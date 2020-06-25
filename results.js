$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search); //constructing URl with saved parameters from the window location href
  var stateName = urlParams.get("stateName"); // getting stateName from the URL
  console.log(stateName);
  var stateActivities = urlParams.get("activity"); // getting the activities from the URL
  console.log(stateActivities);
  var stateTheme = urlParams.get("theme"); // getting the activities from the URL
  console.log(stateTheme); // getting theme from the URL

  var stateArray = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Dist. of Columbia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Virgin Islands",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  var stateAbbreviations = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "VI",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  // object of states
  var statesObject = {};
  stateArray.forEach(
    (state, stateAbb) => (statesObject[state] = stateAbbreviations[stateAbb])
  );
  console.log(statesObject);

  // submitButton on click function to call AJAX
  console.log(stateName);
  // var stateCode = "NY";
  var stateCode = statesObject[stateName];
  console.log(stateCode);

  function ajaxStatesCall(userInput) {
    // if user picks only state option it'll be running only this AJAX api

    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        userInput +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
      method: "GET",
    }).then(function (data) {
      console.log(data);
      console.log(data.data.length);
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      for (var i = 0; i < data.data.length; i++) {
        var parkName = data.data[i].fullName;
        var resultsDiv = $("<div>")
          .addClass("results")
          .appendTo("#parentResultsDiv")
          .attr({
            "data-lon": data.data[i].longitude,
            "data-lat": data.data[i].latitude,
            "data-park": data.data[i].parkCode,
          });
        $("<h4>").text(parkName).appendTo(resultsDiv);
        var activitiesObj = data.data[i].activities;
        var divOfPtags = $("<div>").addClass("container");

        for (var j = 0; j < activitiesObj.length; j++) {
          $("<p>").text(activitiesObj[j].name).appendTo(divOfPtags);
        }
        divOfPtags.appendTo(resultsDiv);

        var entranceFee = $("<p>");
        if (data.data[i].entranceFees[0]) {
          entranceFee
            .text(
              data.data[i].entranceFees[0].title +
                ": $" +
                parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)
            )
            .appendTo(resultsDiv);
        }
      }
    });
  }
  function ajaxStateActivityCall(userInputState, userInputActivities) {
    // if user picks state and activity, it'll be filtering in the given state by matching activity
    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        userInputState +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
      method: "GET",
    }).then(function (data) {
      console.log(data);
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      $("<h3>")
        .text(
          "You picked " +
            userInputActivities +
            ". Try another activity to explore more."
        )
        .prependTo($("#resultsResume"));
      for (var i = 0; i < data.data.length; i++) {
        var activitiesObj = data.data[i].activities;
        for (var j = 0; j < activitiesObj.length; j++) {
          if (activitiesObj[j].name == userInputActivities) {
            var parkName = data.data[i].fullName;
            var resultsDiv = $("<div>")
              .addClass("results")
              .appendTo("#parentResultsDiv")
              .attr({
                "data-lon": data.data[i].longitude,
                "data-lat": data.data[i].latitude,
                "data-park": data.data[i].parkCode,
              });
            $("<h4>").text(parkName).appendTo(resultsDiv);
            var divOfPtags = $("<div>").addClass("container");

            for (var j = 0; j < activitiesObj.length; j++) {
              $("<p>").text(activitiesObj[j].name).appendTo(divOfPtags);
            }
            divOfPtags.appendTo(resultsDiv);
            var entranceFee = $("<p>");
            if (data.data[i].entranceFees[0]) {
              entranceFee
                .text(
                  data.data[i].entranceFees[0].title +
                    ": $" +
                    parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)
                )
                .appendTo(resultsDiv);
            }
          }
        }
      }
    });
  }
  function ajaxStateThemesCall(userInputState, userInputTheme) {
    // if user picks state and theme, it'' be filtering in the given state by matching theme
    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        userInputState +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
      method: "GET",
    }).then(function (data) {
      console.log(data);
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      $("<h3>")
        .text(
          "You picked " +
            userInputTheme +
            ". Try another theme to explore more."
        )
        .prependTo($("#resultsResume"));
      for (var i = 0; i < data.data.length; i++) {
        var topicsObj = data.data[i].topics;
        for (var j = 0; j < topicsObj.length; j++) {
          if (topicsObj[j].name == userInputTheme) {
            var parkName = data.data[i].fullName;
            var resultsDiv = $("<div>")
              .addClass("results")
              .appendTo("#parentResultsDiv")
              .attr({
                "data-lon": data.data[i].longitude,
                "data-lat": data.data[i].latitude,
                "data-park": data.data[i].parkCode,
              });
            $("<h4>").text(parkName).appendTo(resultsDiv);
            var divOfPtags = $("<div>").addClass("container");

            for (var j = 0; j < topicsObj.length; j++) {
              $("<p>").text(topicsObj[j].name).appendTo(divOfPtags);
            }
            divOfPtags.appendTo(resultsDiv);
            var entranceFee = $("<p>");
            if (data.data[i].entranceFees[0]) {
              entranceFee
                .text(
                  data.data[i].entranceFees[0].title +
                    ": $" +
                    parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)
                )
                .appendTo(resultsDiv);
            }
          }
        }
      }
    });
  }
  function ajaxStateActivityThemeCall(
    userInputState,
    userInputActivities,
    userInputTheme
  ) {
    // if user picks only state option it'll be running only this AJAX api
    $.ajax({
      url:
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
        userInputState +
        "&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
      method: "GET",
    }).then(function (data) {
      console.log(data);
      var totalParks = $("<h3>").prependTo("#resultsIntro");
      totalParks
        .text(
          "We found " + data.data.length + " National Parks in " + stateName
        )
        .appendTo(totalParks);
      $("<h3>")
        .text(
          "You picked " +
            userInputActivities +
            " and " +
            userInputTheme +
            ". Try another activity or theme to explore more."
        )
        .prependTo($("#resultsResume"));

      var activitiesObj = data.data.map(
        (arrActivities) => arrActivities.activities
      );
      console.log(activitiesObj);
      var topicsObj = data.data.map((arrTopics) => arrTopics.topics);
      console.log(topicsObj);
      var parkByActivities = [];
      var parkByTheme = [];

      var filteringActivities = false;
      var filteringTheme = false;
      for (var x of activitiesObj) {
        for (var y of x) {
          if (y.name == userInputActivities) {
            filteringActivities = true;
            parkByActivities.push(data.data[activitiesObj.indexOf(x)]);
          }
        }
      }
      console.log(filteringActivities);
      console.log(parkByActivities);
      for (var x of topicsObj) {
        for (var y of x) {
          if (y.name == userInputTheme) {
            filteringTheme = true;
            parkByTheme.push(data.data[topicsObj.indexOf(x)]);
          }
        }
      }
      console.log(filteringTheme);
      console.log(parkByTheme);

      for (var x of parkByActivities) {
        var parkName = x.fullName;

        if (parkByTheme.includes(x)) {
          console.log("yes");

          var resultsDiv = $("<div>")
            .addClass("results")
            .appendTo("#parentResultsDiv")
            .attr({
              "data-lon": x.longitude,
              "data-lat": x.latitude,
              "data-park": x.parkCode,
            });
          $("<h4>").text(parkName).appendTo(resultsDiv);
          var divOfPtags = $("<div>").addClass("container");

          for (var j = 0; j < x.activities.length; j++) {
            $("<p>").text(x.activities[j].name).appendTo(divOfPtags);
          }
          divOfPtags.appendTo(resultsDiv);

          var entranceFee = $("<p>");
          if (x.entranceFees[0].title) {
            entranceFee
              .text(
                x.entranceFees[0].title +
                  ": $" +
                  parseFloat(x.entranceFees[0].cost).toFixed(2)
              )
              .appendTo(resultsDiv);
          }
        }
        // else {
        //     $("<div>").text("Your search criteria did not match any Park in " + userInputState).appendTo("#parentResultsDiv");
        // }
      }
      if (filteringActivities == false && filteringTheme == false) {
        $("<h1>")
          .text(
            "Your search criteria did not match any Park in " + userInputState
          )
          .appendTo("#parentResultsDiv");
      }
    });
  }

  if (stateCode !== null) {
    if (stateActivities == "null" && stateTheme == "null") {
      console.log(stateCode + " was selected");
      ajaxStatesCall(stateCode);
    }
    if (stateActivities != "null" && stateTheme == "null") {
      console.log("state " + stateCode + " activity " + stateActivities);
      ajaxStateActivityCall(stateCode, stateActivities);
    }
    if (stateActivities != "null" && stateTheme != "null") {
      console.log("all things were selected");
      ajaxStateActivityThemeCall(stateCode, stateActivities, stateTheme);
    }
    if (stateActivities == "null" && stateTheme != "null") {
      console.log("state " + stateCode + " and theme " + stateTheme);
      ajaxStateThemesCall(stateCode, stateTheme);
    }
  }

  $("#parentResultsDiv").click(function (event) {
    if (parkCode == null && event.target.parentNode != null) {
      var longitude = event.target.parentNode.getAttribute("data-lon");
      var latitude = event.target.parentNode.getAttribute("data-lat");
      var parkCode = event.target.parentNode.getAttribute("data-park");
    }

    if (parkCode != null) {
      window.location.href =
        "./details.html" + // saving object into the window location href with parameters of user's choices
        "?longitude=" +
        longitude + // saving object into the window location href of user's stateName choice
        "&latitude=" +
        latitude + // saving object into the window location href of user's activity choice
        "&parkCode=" +
        parkCode; // saving object into the window location href of user's theme choice
      console.log(window.location);
    }
  });
});
