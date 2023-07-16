/*
    Citation for the following function:
    03-16-2023
    Adapted from
    https://github.com/shellingghost/movieDatabase
*/

// Get the objects we need to modify
let updateSynopsisForm = document.getElementById('update-synopsis-form-ajax');

// Modify the objects we need
updateSynopsisForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSynopsis_id = document.getElementById("update-synopsis-id");
    let inputSynopsis = document.getElementById("update-synopsis");
    let inputMovie_id = document.getElementById("update-movie-id");

    // Get the values from the form fields
    let synopsis_idValue = inputSynopsis_id.value;
    let synopsisValue = inputSynopsis.value;
    let movie_idValue = inputMovie_id.value;

    // return if user enter nothing in synopsis
    if (movie_idValue === "") {
        movie_idValue = null;
    }
    if (synopsisValue.trim() === "") 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        synopsis_id: synopsis_idValue,
        synopsis: synopsisValue,
        movie_id: movie_idValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-synopsis-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            // Add the new data to the table
            updateRow(xhttp.response, synopsis_idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, synopsisID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("Synopses-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == synopsisID) {

            // Get the location of the row where we found the matching Movie ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of movie attributes
            let movie_idTd = updateRowIndex.getElementsByTagName("td")[1];
            let synopsisTd = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign movie attributes to our values we updated to
            movie_idTd.innerHTML = (parsedData[0].movie_title === null || parsedData[0].movie_title === undefined) ? "" : parsedData[0].movie_title;
            synopsisTd.innerHTML = parsedData[0].synopsis;
       }
    }
}