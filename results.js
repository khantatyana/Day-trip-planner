$(document).ready(function() {

    var urlParams = new URLSearchParams(window.location.search);     //constructing URl with saved parameters from the window location href
    var stateName = urlParams.get("stateName");                     // getting stateName from the URL 
    console.log(stateName);
    var stateActivities = urlParams.get("activity");              // getting the activities from the URL
    console.log(stateActivities);
    var stateTheme = urlParams.get("theme");              // getting the activities from the URL
    console.log(stateTheme);                               // getting theme from the URL
    // var stateAmenities = urlParams.get("amenity");              // getting the activities from the URL
    // console.log(stateAmenities); 

    var stateArray = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
        "Dist. of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
        "Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
        "New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
        "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Virgin Islands","Washington",
        "West Virginia","Wisconsin","Wyoming"];

    var stateAbbreviations = ["AL","AK","AS","AZ","AR","CA","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA",
        "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PA","PR","RI","SC","SD","TN",
        "TX","UT","VT","VA","VI","WA","WV","WI","WY"];

    // object of states
    var statesObject = {};
    stateArray.forEach((state, stateAbb) => statesObject[state] = stateAbbreviations[stateAbb]);
    console.log(statesObject);

    // submitButton on click function to call AJAX
    console.log(stateName);
    // var stateCode = "NY";
    var stateCode = statesObject[stateName];
    console.log(stateCode);

    function ajaxStatesCall(userInput) {                                            // if user picks only state option it'll be running only this AJAX api
        
        $.ajax({
            
            url: "https://developer.nps.gov/api/v1/parks?stateCode="+ userInput +"&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
            method: "GET"
        }).then(function(data) {
            console.log(data);
            console.log(data.data.length);
            for (var i = 0; i < data.data.length; i++) {

                var parkName = data.data[i].fullName;

                ///////////////////////////////// save the lat and lon
                var resultsDiv = $("<div>").addClass("pure-u-3-5 results").appendTo("#parentResultsDiv").attr({"data-lat": data.data[i].latitude, "data-lon": data.data[i].longitude });
                $("<h4>").text(parkName).appendTo(resultsDiv);
                var activitiesObj = data.data[i].activities;
                
                for (var j = 0; j < activitiesObj.length; j ++) {
                    $("<p>").text(activitiesObj[j].name).appendTo(resultsDiv);
                }
                
                var entranceFee = $("<p>");
                entranceFee.text(data.data[i].entranceFees[0].title + ": $" + parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)).appendTo(resultsDiv);

                resultsDiv.getAttr()

                fetchObjectsToDetail()
 
            }
        })

    }
    function ajaxStateActivityCall(userInputState, userInputActivities) {          // if user picks state and activity, it'll be filtering in the given state by matching activity
        $.ajax({
            
            url: "https://developer.nps.gov/api/v1/parks?stateCode="+ userInputState +"&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
            method: "GET"
        }).then(function(data) {
            console.log(data);
            for (var i = 0; i < data.data.length; i++) {
                var activitiesObj = data.data[i].activities;
                for (var j = 0; j < activitiesObj.length; j ++) {
                    if (activitiesObj[j].name == userInputActivities) {
                        var parkName = data.data[i].fullName;
                        var resultsDiv = $("<div>").addClass("pure-u-3-5 results").appendTo("#parentResultsDiv");
                        $("<h4>").text(parkName).appendTo(resultsDiv);
                        for (var j = 0; j < activitiesObj.length; j ++) {
                            $("<p>").text(activitiesObj[j].name).appendTo(resultsDiv);
                        }
                        var entranceFee = $("<p>");
                        entranceFee.text(data.data[i].entranceFees[0].title + ": $" + parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)).appendTo(resultsDiv);
                    }
                }
                
            }
        })
    }  
    function ajaxStateThemesCall(userInputState, userInputTheme) {                  // if user picks state and theme, it'' be filtering in the given state by matching theme
        $.ajax({
            
            url: "https://developer.nps.gov/api/v1/parks?stateCode="+ userInputState +"&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
            method: "GET"
        }).then(function(data) {
            console.log(data);
            for (var i = 0; i < data.data.length; i++) {
                var topicsObj = data.data[i].topics;
                for (var j = 0; j < topicsObj.length; j ++) {
                    if (topicsObj[j].name == userInputTheme) {
                        var parkName = data.data[i].fullName;
                        var resultsDiv = $("<div>").addClass("pure-u-3-5 results").appendTo("#parentResultsDiv");
                        $("<h4>").text(parkName).appendTo(resultsDiv);
                        for (var j = 0; j < topicsObj.length; j ++) {
                            $("<p>").text(topicsObj[j].name).appendTo(resultsDiv);
                        }
                        var entranceFee = $("<p>");
                        entranceFee.text(data.data[i].entranceFees[0].title + ": $" + parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)).appendTo(resultsDiv);
                    }
                }
                
            }
        })
    }
    // function allParksInState () {

    //     for (var i = 0; i < data.data.length; i++) {

    //         var parkName = data.data[i].fullName;
    //         var resultsDiv = $("<div>").addClass("pure-u-3-5 results").appendTo("#parentResultsDiv");
    //         $("<h4>").text(parkName).appendTo(resultsDiv);
    //         var activitiesObj = data.data[i].activities;
            
    //         for (var j = 0; j < activitiesObj.length; j ++) {
    //             $("<p>").text(activitiesObj[j].name).appendTo(resultsDiv);
    //         }
            
    //         var entranceFee = $("<p>");
    //         entranceFee.text(data.data[i].entranceFees[0].title + ": $" + parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)).appendTo(resultsDiv);

    //     }
  
    // }
    function ajaxStateActivityThemeCall(userInputState, userInputActivities, userInputTheme) {  // if user picks only state option it'll be running only this AJAX api
        $.ajax({
                
            url: "https://developer.nps.gov/api/v1/parks?stateCode="+ userInputState +"&api_key=9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd",
            method: "GET"
        }).then(function(data) {
            console.log(data);
            for (var i = 0; i < data.data.length; i++) {
                var topicsObj = data.data[i].topics;
                for (var j = 0; j < topicsObj.length; j ++) {
                    if (topicsObj[j].name == userInputTheme) {
                        var activitiesObj = data.data[i].activities;
                        if (activitiesObj[j].name == userInputActivities) {
                            var parkName = data.data[i].fullName;
                            var resultsDiv = $("<div>").addClass("pure-u-3-5 results").appendTo("#parentResultsDiv");
                            $("<h4>").text(parkName).appendTo(resultsDiv);
                            for (var j = 0; j < activitiesObj.length; j ++) {
                                $("<p>").text(activitiesObj[j].name).appendTo(resultsDiv);
                            }
                            var entranceFee = $("<p>");
                            entranceFee.text(data.data[i].entranceFees[0].title + ": $" + parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)).appendTo(resultsDiv);
                        } else {
                            
                            // var parkName = data.data[i].fullName;
                            var resultsDiv = $("<div>").addClass("pure-u-3-5 results").appendTo("#parentResultsDiv");
                            $("<h1>").text("Your searching criteria doesn't match. Try again or choose any park below in " + userInputState + " State").appendTo(resultsDiv);
                            allParksInState();
                            // $("<h4>").text(parkName).appendTo(resultsDiv);
                            // for (var j = 0; j < topicsObj.length; j ++) {

                            //     $("<p>").text(topicsObj[j].name).appendTo(resultsDiv);
                            // }
                            // var entranceFee = $("<p>");
                            // entranceFee.text(data.data[i].entranceFees[0].title + ": $" + parseFloat(data.data[i].entranceFees[0].cost).toFixed(2)).appendTo(resultsDiv);
    
                        }
                    }
                }
                
            }
        })

    }


    if (stateCode !== null) {
        if ((stateActivities == "null" && stateTheme == "null") ) {
            console.log(stateCode + " was selected");
            ajaxStatesCall(stateCode);
        }        
        if ((stateActivities != "null") && (stateTheme == "null")) {
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

})