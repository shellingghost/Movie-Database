/*
    Citation for the following function:
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addMovieForm = document.getElementById('add-movie-form-ajax');

// Modify the objects we need
addMovieForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputReleased_year = document.getElementById("input-released_year");
    let inputLanguage = document.getElementById("input-language");
    let inputDuration = document.getElementById("input-duration");
    let inputRating = document.getElementById("input-rating");
    let inputRevenue = document.getElementById("input-revenue");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let released_YearValue = inputReleased_year.value;
    let languageValue = inputLanguage.value;
    let durationValue = inputDuration.value;
    let ratingValue = inputRating.value;
    let revenueValue = inputRevenue.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        released_year: released_YearValue,
        language: languageValue,
        duration: durationValue,
        rating: ratingValue,
        revenue: revenueValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputReleased_year.value = '';
            inputLanguage.value = '';
            inputDuration.value = '';
            inputRating.value = '';
            inputRevenue.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// Movies
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("Movies-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let released_yearCell = document.createElement("TD");
    let languageCell = document.createElement("TD");
    let durationCell = document.createElement("TD");
    let ratingCell = document.createElement("TD");
    let revenueCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.movie_id;
    titleCell.innerText = newRow.title;
    released_yearCell.innerText = newRow.released_year;
    languageCell.innerText = newRow.language;
    durationCell.innerText = newRow.duration;
    ratingCell.innerText = newRow.rating;
    revenueCell.innerText = newRow.revenue;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteMovie(newRow.movie_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(released_yearCell);
    row.appendChild(languageCell);
    row.appendChild(durationCell);
    row.appendChild(ratingCell);
    row.appendChild(revenueCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.movie_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (movie title, movie_id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update-movie-id");
    let option = document.createElement("option");
    option.text = newRow.title;
    option.value = newRow.movie_id;
    selectMenu.add(option);
}