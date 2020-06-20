$(document).ready(function() {
    
    var apiKey = "9bu5bi3vaKYgYQt7Cj4pxdYFN8pkwsL9zSIiRFEd";

    var queryURL = "";
    var selectedActivity = "";


    var stateButton = $("#stateButton");
    var resultsClass = $(".results");
    var detailsParkName = $("#detailsParkName");

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




});