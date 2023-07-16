/*
    02-28-2023
    Adapted from
    https://github.com/shellingghost/movieDatabase
*/

// Get the movie select dropdown and form fields we need to update
const movieSelect = document.querySelector('#update-movie-id');
const titleInput = document.querySelector('#update-title');
const releasedYearInput = document.querySelector('#update-released_year');
const languageInput = document.querySelector('#update-language');
const durationInput = document.querySelector('#update-duration');
const ratingInput = document.querySelector('#update-rating');
const revenueInput = document.querySelector('#update-revenue');

// Function to populate form fields
function populateFormFields(movieId) {
    // Make an AJAX request to the server to get the movie information
    fetch(`/get-movie-by-id/${movieId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Populate form fields with movie data
        titleInput.value = data.title;
        releasedYearInput.value = data.released_year;
        languageInput.value = data.language;
        durationInput.value = data.duration;
        ratingInput.value = data.rating;
        revenueInput.value = data.revenue;
      })
      .catch(error => console.error(error));
  }
  

// Call the function to prepopulate the form fields on page load
populateFormFields(movieSelect.value);

// Listen for changes in the movie select dropdown
movieSelect.addEventListener('change', (event) => {
  const movieId = event.target.value;
  populateFormFields(movieId);
});

// Get the objects we need to modify
let updateMovieForm = document.getElementById('update-movie-form-ajax');

// Modify the objects we need
updateMovieForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMoive_ID = document.getElementById("update-movie-id");
    let inputTitle = document.getElementById("update-title");
    let inputReleased_year = document.getElementById("update-released_year");
    let inputLanguage = document.getElementById("update-language");
    let inputDuration = document.getElementById("update-duration");
    let inputRating = document.getElementById("update-rating");
    let inputRevenue = document.getElementById("update-revenue");

    // Get the values from the form fields
    let movie_idValue = inputMoive_ID.value;
    let titleValue = inputTitle.value;
    let released_yearValue = inputReleased_year.value;
    let languageValue = inputLanguage.value;
    let durationValue = inputDuration.value;
    let ratingValue = inputRating.value;
    let revenueValue = inputRevenue.value;
    
    if (titleValue.trim() === "") 
    {
        return;
    }
    if (isNaN(parseInt(released_yearValue))) 
    {
        return;
    }
    if (languageValue.trim() === "") 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        movie_id: movie_idValue,
        title: titleValue,
        released_year: released_yearValue,
        language: languageValue,
        duration: durationValue,
        rating: ratingValue,
        revenue: revenueValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-movie-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, movie_idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, movieID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("Movies-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == movieID) {

            // Get the location of the row where we found the matching Movie ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of movie attributes
            let titleTd = updateRowIndex.getElementsByTagName("td")[1];
            let released_yearTd = updateRowIndex.getElementsByTagName("td")[2];
            let languageTd = updateRowIndex.getElementsByTagName("td")[3];
            let durationTd = updateRowIndex.getElementsByTagName("td")[4];
            let ratingTd = updateRowIndex.getElementsByTagName("td")[5];
            let revenueTd = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign movie attributes to our values we updated to
            titleTd.innerHTML = parsedData[0].title; 
            released_yearTd.innerHTML = parsedData[0].released_year; 
            languageTd.innerHTML = parsedData[0].language; 
            durationTd.innerHTML = parsedData[0].duration; 
            ratingTd.innerHTML = parsedData[0].rating; 
            revenueTd.innerHTML = parsedData[0].revenue; 
       }
    }
}

