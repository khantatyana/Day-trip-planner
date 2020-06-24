$(document).ready(function() {

    var stateArray = ["", "Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
        "Dist. of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
        "Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
        "New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
        "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Virgin Islands","Washington",
        "West Virginia","Wisconsin","Wyoming"];
    var stateAbbreviations = ["AL","AK","AS","AZ","AR","CA","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA",
        "ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","MP","OH","OK","OR","PA","PR","RI","SC","SD","TN",
        "TX","UT","VT","VA","VI","WA","WV","WI","WY"];

    var activities = [
        "",
        "Arts and Culture",
        "Astronomy",
        "Auto and ATV",
        "Biking",
        "Boating",
        "Camping",
        "Canyoneering",
        "Caving",
        "Climbing",
        "Compass and GPS",
        "Dog Sledding",
        "Fishing",
        "Flying",
        "Food",
        "Golfing",
        "Guided Tours",
        "Hands-On",
        "Hiking",
        "Horse Trekking",
        "Hunting and Gathering",
        "Ice Skating",
        "Junior Ranger Program",
        "Living History",
        "Museum Exhibits",
        "Paddling",
        "Park Film",
        "Playground",
        "SCUBA Diving",
        "Shopping",
        "Skiing",
        "Snorkeling",
        "Snow Play",
        "Snowmobiling",
        "Snowshoeing",
        "Surfing",
        "Swimming",
        "Team Sports",
        "Tubing",
        "Water Skiing",
        "Wildlife Watching"
    ]
    var themes = [
        "",
        "African American Heritage",
        "American Revolution",
        "Ancient Seas",
        "Animals",
        "Archeology",
        "Architecture and Building",
        "Arctic",
        "Artillery",
        "Arts",
        "Asian American Heritage",
        "Aviation",
        "Banking",
        "Birthplace",
        "Burial, Cemetery and Gravesite",
        "Canyons and Canyonlands",
        "Caves, Caverns and Karst",
        "Civil Rights",
        "Climate Change",
        "Coasts, Islands and Atolls",
        "Colonization and Settlement",
        "Commerce",
        "Dams",
        "Dunes",
        "Engineering",
        "Enslavement",
        "Estuaries and Mangroves",
        "Explorers and Expeditions",
        "Farming and  Agriculture",
        "Fire",
        "Foothills, Plains and Valleys",
        "Forests and Woodlands",
        "Forts",
        "Fossils and Paleontology",
        "Geology",
        "Geothermal",
        "Glaciers",
        "Grasslands",
        "Great Depression",
        "Groundwater",
        "Hispanic American Heritage",
        "Immigration",
        "Impact Craters",
        "Incarceration",
        "Industry",
        "Laborer and Worker",
        "Lakes",
        "Landscape Design",
        "Latino American Heritage",
        "LGBTQ American Heritage",
        "Maritime",
        "Medicine",
        "Migrations",
        "Military",
        "Monuments and Memorials",
        "Mountains",
        "Music",
        "Native American Heritage",
        "Natural Sounds",
        "Night Sky",
        "Oceans",
        "Pacific Islander Heritage",
        "Presidents",
        "Reconstruction",
        "Religion and Spirituality",
        "River and Riparian",
        "Rock Landscapes and Features",
        "Scenic Views",
        "Schools and Education",
        "Science, Technology and Innovation",
        "Social Movements",
        "The Tropics",
        "Thickets and Shrublands",
        "Tragic Events",
        "Trails",
        "Transportation",
        "Unique Species",
        "Urban America",
        "Volcanoes",
        "Wars and Conflicts",
        "Waterfalls",
        "Watersheds",
        "Westward Expansion",
        "Wetlands",
        "Wilderness",
        "Women's History"
    ]
    
    // object of states
    var statesObject = {};
    stateArray.forEach((state, stateAbb) => statesObject[state] = stateAbbreviations[stateAbb]);
    console.log(statesObject);

    // FOR STATE DROPDOWN LIST
    for (var i = 0; i < stateArray.length; i++) {
        var option = $("<option>").appendTo(stateList);
        var state = stateArray[i];
        var stateAbb = stateAbbreviations[i];
        option.attr("value", state);
        option.attr("id", stateAbb);
        option.text(state);
    } 
    console.log(activities.length);
    
    // FOR ACTIVITIES DROPDOWN LIST
    for (var i = 0; i < activities.length; i ++) {
        var option = $("<option>").appendTo($("#activitiesListBtn"));
        option.attr("value", activities[i]);
        // option.attr("id", activities.id);
        option.text(activities[i]);
    }
    console.log(themes.length);

    // FOR THEMES DROPDOWN LIST
    for (var i = 0; i < themes.length; i ++) {
        var option = $("<option>").appendTo($("#themeListBtn"));
        option.attr("value", themes[i]);
        // option.attr("id", themes.id);
        option.text(themes[i]);
    }

    // connect all input buttons together to the object
    var selectedOptions = {
        state: null,
        activity: null,
        theme: null,
    }

    $( "#stateList" ).change(function() {
        selectedOptions.state = $(this).val();
        console.log(selectedOptions);
    });
    $("#activitiesListBtn").change(function() {
        selectedOptions.activity = $(this).val();
        console.log(selectedOptions);
    })
    $("#themeListBtn").change(function() {
        selectedOptions.theme = $(this).val();
        console.log(selectedOptions);
    })

    const submitButton = $("#submitButton");
    submitButton.click( function (event) {
        event.preventDefault()
        
        window.location.href = "./results.html" +             // saving object into the window location href with parameters of user's choices
            "?stateName=" + selectedOptions.state +         // saving object into the window location href of user's stateName choice
            "&activity=" + selectedOptions.activity +       // saving object into the window location href of user's activity choice
            "&theme=" + selectedOptions.theme            // saving object into the window location href of user's theme choice
        console.log(window.location);
    });

})