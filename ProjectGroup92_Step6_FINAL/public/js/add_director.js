/*
    Citation for the following function:
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addDirectorsForm = document.getElementById('add-director-form-ajax');

// Modify the objects we need
addDirectorsForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-first_name");
    let inputLastName = document.getElementById("input-last_name");
    let inputGender = document.getElementById("input-gender");
    let inputBirthDate = document.getElementById("input-birthdate");
    let inputNationality = document.getElementById("input-nationality");
    let inputBiography = document.getElementById("input-biography");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let genderValue = inputGender.value;
    let birthDateValue = inputBirthDate.value;
    let nationalityValue = inputNationality.value;
    let biographyValue = inputBiography.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        gender: genderValue,
        birthdate: birthDateValue,
        nationality: nationalityValue,
        biography: biographyValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-director-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputGender.value = '';
            inputBirthDate.value = '';
            inputNationality.value = '';
            inputBiography.value = '';
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
    let currentTable = document.getElementById("Directors-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let genderCell = document.createElement("TD");
    let birthdateCell = document.createElement("TD");
    let nationalityCell = document.createElement("TD");
    let biographyCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.director_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    genderCell.innerText = newRow.gender;
    birthdateCell.innerText = newRow.birthdate;
    nationalityCell.innerText = newRow.nationality;
    biographyCell.innerText = newRow.biography;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(genderCell);
    row.appendChild(birthdateCell);
    row.appendChild(nationalityCell);
    row.appendChild(biographyCell);

    // Add the row to the table
    currentTable.appendChild(row);
}

// Get the objects we need to modify
let addMovieDirectorsForm = document.getElementById('add-movie_directors-form-ajax');

// Modify the objects we need
addMovieDirectorsForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMovieId = document.getElementById("add-movie-id");
    let inputDirectorId = document.getElementById("add-director-id");

    // Get the values from the form fields
    let movieIdValue = inputMovieId.value;
    let directorIdValue = inputDirectorId.value;

    // Put our data we want to send in a javascript object
    let data = {
        movie_id: movieIdValue,
        director_id: directorIdValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie-director-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMovieId.value = '';
            inputDirectorId.value = '';
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
    let currentTable = document.getElementById("Movie_Directors-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let directorCell = document.createElement("TD");

    // Fill the cells with correct data
    console.log(newRow)
    console.log(newRow.movie_directors_id)
    console.log(newRow.movie_id)
    console.log(newRow.director_id)
    idCell.innerText = newRow.movie_directors_id;
    titleCell.innerText = newRow.movie_id;
    directorCell.innerText = newRow.director_id;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(directorCell);

    // Add the row to the table
    currentTable.appendChild(row);
    window.location.reload();
}