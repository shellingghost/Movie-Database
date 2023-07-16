/*
    Citation for the following function:
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addGenresForm = document.getElementById('add-genre-form-ajax');

// Modify the objects we need
addGenresForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGenreName = document.getElementById("input-genre_name");

    // Get the values from the form fields
    let genreNameValue = inputGenreName.value;


    // Put our data we want to send in a javascript object
    let data = {
        genre_name: genreNameValue,

    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGenreName.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// Actor
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("Genres-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 2 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let genreNameCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    genreNameCell.innerText = newRow.genre_name;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(genreNameCell);

    // Add the row to the table
    currentTable.appendChild(row);
}

// Intersection table Movie_Genres
// Get the objects we need to modify
let addMovieGenresForm = document.getElementById('add-movie_genres-form-ajax');

// Modify the objects we need
addMovieGenresForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMovieID = document.getElementById("add-movie-id");
    let inputGenreId = document.getElementById("add-genre-id");

    // Get the values from the form fields
    let movieIdValue = inputMovieID.value;
    let genreIdValue = inputGenreId.value;

    // Put our data we want to send in a javascript object
    let data = {
        movie_id: movieIdValue,
        genre_id: genreIdValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMovieID.value = '';
            inputGenreId.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Actor
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("Movie_Genres-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let movieTitleCell = document.createElement("TD")
    let genreNameCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.genre_id;
    movieTitleCell.innerText = 'RefreshPage'
    genreNameCell.innerText = newRow.movie_id;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(movieTitleCell)
    row.appendChild(genreNameCell);

    // Add the row to the table
    currentTable.appendChild(row);
    window.location.reload();
}

