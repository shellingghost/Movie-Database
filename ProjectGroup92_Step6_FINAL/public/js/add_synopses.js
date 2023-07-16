/*
    Citation for the following function:
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addSynopsisForm = document.getElementById('add-synopsis-form-ajax');

// Modify the objects we need
addSynopsisForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMovieId = document.getElementById("input-movie-id-ajax");
    let inputSynopsis = document.getElementById("input-synopsis");

    // Get the values from the form fields
    let movieIdValue = inputMovieId.value;
    let synopsisValue = inputSynopsis.value;

    // Put our data we want to send in a javascript object
    let data = {
        movie_id: movieIdValue,
        synopsis: synopsisValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-synopses-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMovieId.value = '';
            inputSynopsis.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// Synopses and adds it to the table.
addRowToTable = (data) => {

    // Get a reference to the current table on the page.
    let currentTable = document.getElementById("Synopses-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData;

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let movie_idCell = document.createElement("TD");
    let synopsisCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.synopsis_id;
    movie_idCell.innerText = newRow.movie_title;
    synopsisCell.innerText = newRow.synopsis;
    
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(movie_idCell);
    row.appendChild(synopsisCell);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (movie title, movie_id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update-synopsis-id");
    let option = document.createElement("option");
    option.text = newRow.movie_title;
    option.value = newRow.synopsis_id;
    selectMenu.add(option);
}


