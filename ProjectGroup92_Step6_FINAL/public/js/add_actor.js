/*
    Citation for the following function:
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let addActorsForm = document.getElementById('add-actor-form-ajax');

// Modify the objects we need
addActorsForm.addEventListener("submit", function (e) {

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
    xhttp.open("POST", "/add-actor-ajax", true);
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


// Creates a single row from an Object representing a single record from Actors
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("Actors-table");

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
    idCell.innerText = newRow.actor_id;
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

// Intersection table Movie_Cast
// Get the objects we need to modify
let addMovieCastForm = document.getElementById('add-movie_cast-form-ajax');

// Modify the objects we need
addMovieCastForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMovieID = document.getElementById("add-movie-id");
    let inputActorId = document.getElementById("add-actor-id");
    let inputCharacterName = document.getElementById("add-character-name");

    // Get the values from the form fields
    let movieIdValue = inputMovieID.value;
    let actorIdValue = inputActorId.value;
    let characterNameValue = inputCharacterName.value;

    // Put our data we want to send in a javascript object
    let data = {
        movie_id: movieIdValue,
        actor_id: actorIdValue,
        character_name: characterNameValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-movie-cast-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMovieID.value = '';
            inputActorId.value = '';
            inputCharacterName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from Movie_Cast
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("Movie_Cast-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let movieTitleCell = document.createElement("TD")
    let actorNameCell = document.createElement("TD");
    let characterNameCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.cast_id;
    movieTitleCell.innerText = newRow.title;
    actorNameCell.innerText = newRow.full_name;
    characterNameCell.innerText = newRow.character_name;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(movieTitleCell)
    row.appendChild(actorNameCell);
    row.appendChild(characterNameCell);

    // Add the row to the table
    currentTable.appendChild(row);
}