$(document).ready(function() {
    
    var apiKey = "9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd";

    var queryURL = "";
    var selectedActivity = "";

    var stateButton = $("#stateButton");
    var stateList = $("#stateList");
    var resultsClass = $(".results");

    var detailSidebar = $("#detailSidebar");
    var detailMain = $("#detailMain");
    var detailImageArea = $("#detailImages");

    //variables used for loops --- i, j, k, l, m

    var stateArray = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    "Dist. of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
    "Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
    "New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Virgin Islands","Washington",
    "West Virginia","Wisconsin","Wyoming"];

    var stateAbbreviations = ["AL","AK","AS","AZ","AR","CA","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA",
    "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PA","PR","RI","SC","SD","TN",
    "TX","UT","VT","VA","VI","WA","WV","WI","WY"];

    var stateActivities = [
        
    ]

    var stateThemes = [

    ]

    var stateAmenities = [

    ]

    // object of states
    var statesObject = {};
    stateArray.forEach((state, stateAbb) => statesObject[state] = stateAbbreviations[stateAbb]);
    console.log(statesObject);
    
    //FOR STATE DROPDOWN LIST
    for (var i = 0; i < stateArray.length; i++) {
        var option = $("<option>").appendTo(stateList);
        var state = stateArray[i];
        var stateAbb = stateAbbreviations[i];
        option.attr("value", state);
        option.attr("id", stateAbb);
        option.text(state);
    } 

    // selected State will build new queryURL
    
    $( "#stateList" ).change(function() {
        var stateCode = $("#stateList").children("option:selected").val();
        alert( "Handler for .select() called." );
        queryURL = "https://developer.nps.gov/api/v1/parks?api_key=" + apiKey + "&stateCode=" + stateCode;
        console.log(stateCode);
        console.log(queryURL);
      });

        // submitButton on click function to call AJAX

        function ajaxCall() {
            // this query is for testing purposes only, the final queryURL is line #7
            
            // var queryURL = "https://developer.nps.gov/api/v1/parks?api_key="  + apiKey + "&stateCode=" + "NY";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(data) {
                console.log(data);
                
                //FOR DETAILS PAGE
                //Listen to clicks on 'results' page
                resultsClass.click(function () {
    //                var detailParkIndex = this(response.data.indexOf);        //WAITING FOR RESULTS PAGE TO BE READY
                    var detailParkIndex = 0;          //FOR TESTING
                    detailParkName = $("<h2>").text(response.data[detailParkIndex].fullName);
                });    
        
            })
        }
    
        const submitButton = $("#submitButton");
        submitButton.click( function () {
            
            // need to work dropdown state Button working before
    
            // stateCode = $("#stateList").val();
    
            ajaxCall();
            
        });
          

    //CONFIRMS THAT detailMain is accessible inside a function
    var testingButton = $("<button>").text("Testing").appendTo(detailMain);
    testingButton.click(function() {
        detailMain.empty();
        detailSidebar.empty();

        var apiKey = "9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd";

        var queryURL = "https://developer.nps.gov/api/v1/parks?api_key="  + apiKey + "&stateCode=" + "NY";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(data) {
            console.log(data);
            console.log(data.data[0].fullName);

            var detailsParkName = $("<h2>").text(data.data[0].fullName).attr("id","detailsParkName").appendTo(detailMain);
            var detailsDescription = $("<h4>").text(data.data[0].description).appendTo(detailMain);

            var detailActivitiesArea = $("<div class='pure-u-1 pure-u-sm-1-3' id='detailActivitiesArea'>").appendTo(detailMain); 
            var detailsActivitiesSubheading = $("<h4 class='detailCardSubheading'>").text("Activities").appendTo(detailActivitiesArea);
            for (var j = 0; j < (data.data[0].activities).length; j++) { 
                var detailsActivitiesParagraph = $("<p>").text(data.data[0].activities[j].name).appendTo(detailActivitiesArea);
            }

            var detailTopicsArea = $("<div class='pure-u-1 pure-u-sm-1-3' id='detailTopicsArea'>").appendTo(detailMain);  
            var detailsTopicsSubheading = $("<h4 class='detailCardSubheading'>").text("Topics").appendTo(detailTopicsArea);
            for (var k = 0; k < (data.data[0].topics).length; k++) { 
                var detailsTopicsParagraph = $("<p>").text(data.data[0].topics[k].name).appendTo(detailTopicsArea);
            }    

            var detailAmenitiesArea = $("<div class='pure-u-1 pure-u-sm-1-3' id='detailAmenitiesArea'>").appendTo(detailMain);
            var detailsAmenitiesSubheading = $("<h4 class='detailCardSubheading'>").text("Amenities").appendTo(detailAmenitiesArea);
        //    for (var l = 0; l < (data.data[0].topics).length; l++) { 
        //        detailsTopicsParagraph = $("<p>").text(data.data[0].topics[k].name).appendTo(detailTopicsArea);
        //    }   
            var detailsAmenitiesParagraph = $("<p>").text("Paragraph Three").appendTo(detailAmenitiesArea);
        
            var detailsAddressSubheading = $("<h4>").text("Address").appendTo(detailSidebar);
            var detailsAddress1 = $("<p>").text(data.data[0].addresses[0].line2).appendTo(detailSidebar);
            var detailsAddress2 = $("<p>").text(data.data[0].addresses[0].line3).appendTo(detailSidebar);
            var detailsCityStateZip = $("<p>").appendTo(detailSidebar)
                                .text(data.data[0].addresses[0].city + ", " + 
                                      data.data[0].addresses[0].stateCode + 
                                      data.data[0].addresses[0].postalCode);
            var detailsDirectionsText = $("<p>").text(data.data[0].directionsUrl).appendTo(detailSidebar);                          
            var detailsDirections = $("<a href='data.data[0].directionsUrl'>").appendTo(detailSidebar);
        
            var detailsContactsSubheading = $("<h4>").text("Contacts").appendTo(detailSidebar);
            var detailsPhone = $("<p>").text("Phone: " + data.data[0].contacts.phoneNumbers[0].phoneNumber[0] +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[1] +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[2] + " " +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[3] +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[4] +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[5] + "-" +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[6] +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[7] +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[8] +
                                                         data.data[0].contacts.phoneNumbers[0].phoneNumber[9]).appendTo(detailSidebar);
            var detailsEmail = $("<p>").text("Email: " + data.data[0].contacts.emailAddresses[0].emailAddress).appendTo(detailSidebar);
            var detailsWebsite = $("<a href='data.data[0].url'>").appendTo(detailSidebar);  
            
            for (var m = 1; m < (data.data[0].images).length; m++) { 
                var detailImages = $("<img>").attr("src",data.data[0].images[m].url)
                                             .attr("alt",data.data[0].images[m].altText).appendTo(detailImageArea);
            }   
        });    
    });

});