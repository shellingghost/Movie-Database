/*
    Citation for the following codes
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

/*
    Set Up
*/

// Express
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
PORT = 31500;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Format Date MMDDYYYY
const Handlebars = require('handlebars');
const { duration } = require('moment/moment');
Handlebars.registerHelper('formatDate', function (date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
});

/*
    ROUTES

    Citation for the following codes
    Date: 02-19-2023
    Adpated from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Home route
app.get('/', function (req, res) {
    
    // Display basic movie information
    let query1 = "SELECT Movies.title, Movies.released_year, " +
        "GROUP_CONCAT(DISTINCT Genres.genre_name SEPARATOR ', ') AS genres, " +
        "GROUP_CONCAT(DISTINCT CONCAT(Directors.first_name, ' ', Directors.last_name) SEPARATOR ', ') AS director_name, " +
        "GROUP_CONCAT(DISTINCT CONCAT(Actors.first_name, ' ', Actors.last_name) SEPARATOR ', ') AS actors, " +
        "Movies.rating, Movies.language " +
        "FROM Movies " +
        "LEFT JOIN Movie_Directors ON Movies.movie_id = Movie_Directors.movie_id " +
        "LEFT JOIN Directors ON Movie_Directors.director_id = Directors.director_id " +
        "LEFT JOIN Movie_Cast ON Movies.movie_id = Movie_Cast.movie_id " +
        "LEFT JOIN Actors ON Movie_Cast.actor_id = Actors.actor_id " +
        "LEFT JOIN Movie_Genres ON Movies.movie_id = Movie_Genres.movie_id " +
        "LEFT JOIN Genres ON Movie_Genres.genre_id = Genres.genre_id " +
        "GROUP BY Movies.title, Movies.released_year, Movies.rating, Movies.language;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('home', { moviesData: rows });
        }
    });
});

// Movies route
app.get('/movies', function (req, res) {

    let query1 = "SELECT * FROM Movies;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('movies', { data: rows });
        }
    });
});

// Directors and Movie_Directors route
app.get('/directors', function (req, res) {
    let directorsQuery = "SELECT * FROM Directors;";
    let movie_directorsQuery = `
  SELECT DISTINCT
    Movie_Directors.movie_directors_id, 
    Movies.title, 
    CONCAT(Directors.first_name, ' ', Directors.last_name) AS full_name
  FROM 
    Movie_Directors 
    JOIN Movies ON Movies.movie_id = Movie_Directors.movie_id 
    JOIN Directors ON Directors.director_id = Movie_Directors.director_id;
`;
    let moviesQuery = "SELECT * FROM Movies;";

    db.pool.query(directorsQuery, function (error, directorsRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(movie_directorsQuery, function (error, movie_directorsRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(moviesQuery, function (error, moviesRows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.render('directors', { directorsData: directorsRows, movie_directorsData: movie_directorsRows, moviesData: moviesRows });
                        }
                    });
                }
            });
        }
    });
});


// Actors and Movie_Cast route
app.get('/actors', function (req, res) {

    let actorsQuery = "SELECT * FROM Actors;";
    let castQuery = `
    SELECT Movie_Cast.cast_id, Movies.title, CONCAT(Actors.first_name, ' ', Actors.last_name) AS full_name, Movie_Cast.character_name 
    FROM Movie_Cast 
    JOIN Movies ON Movies.movie_id = Movie_Cast.movie_id 
    JOIN Actors ON Actors.actor_id = Movie_Cast.actor_id;`;

    let moviesQuery = "SELECT * FROM Movies;";

    db.pool.query(actorsQuery, function (error, actorsRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(castQuery, function (error, castRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(moviesQuery, function (error, moviesRows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.render('actors', { actorsData: actorsRows, castData: castRows, moviesData: moviesRows });
                        }
                    });
                }
            });
        }
    });
});

// Genres and Movie_Genres Route
app.get('/genres', function (req, res) {
    let genreQuery = "SELECT * FROM Genres;";
    let movie_genresQuery = `
    SELECT Movie_Genres.movie_genres_id, Movies.title, Genres.genre_name 
    FROM Movie_Genres 
    JOIN Movies ON Movies.movie_id = Movie_Genres.movie_id 
    JOIN Genres ON Genres.genre_id = Movie_Genres.genre_id;`;

    let moviesQuery = "SELECT * FROM Movies;";

    db.pool.query(genreQuery, function (error, genresRows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(movie_genresQuery, function (error, movie_genresRows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(moviesQuery, function (error, moviesRows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.render('genres', { genresData: genresRows, movie_genresData: movie_genresRows, moviesData: moviesRows });
                        }
                    });
                }
            });
        }
    });
});

// Synopses route
app.get('/synopses', function (req, res) {
    let query1 = `SELECT s.synopsis_id, COALESCE(m.title, NULL) as movie_title, s.synopsis
    FROM Synopses s
    JOIN Movies m ON s.movie_id = m.movie_id
    UNION
    SELECT s.synopsis_id, NULL as movie_title, s.synopsis
    FROM Synopses s
    WHERE s.movie_id IS NULL;`;

    let query2 = `SELECT DISTINCT m.movie_id, m.title as movie_title
    FROM Movies m
    LEFT JOIN Synopses s ON s.movie_id = m.movie_id;`;

    db.pool.query(query1, function (error1, rows1, fields1) {
        db.pool.query(query2, function (error2, rows2, fields2) {
            if (error1 || error2) {
                console.log(error1);
                console.log(error2);
                res.sendStatus(400);
            } else {
                res.render('synopses', { data1: rows1, data2: rows2 });
            }
        });
    });
});

/*
    Inserting data

    Citation for the following codes
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Add movie
app.post('/add-movie-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let rating = parseInt(data.rating);
    if (isNaN(rating)) {
        rating = 'NULL'
    }

    let revenue = parseInt(data.revenue);
    if (isNaN(revenue)) {
        revenue = 'NULL'
    }

    // Create the query and run it on the database
    let query1 = `INSERT INTO Movies (title, released_year, language, duration, rating, revenue) VALUES ('${data.title}', '${data.released_year}', '${data.language}', '${data.duration}', ${rating}, ${revenue})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Movies
            let query2 = `SELECT * FROM Movies;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add director
app.post('/add-director-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Directors (first_name, last_name, gender, birthdate, nationality, biography) VALUES ('${data.first_name}', '${data.last_name}', '${data.gender}', '${data.birthdate}', '${data.nationality}', '${data.biography}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Directors
            let query2 = `SELECT * FROM Directors;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add movie director
app.post('/add-movie-director-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Movie_Directors (movie_id, director_id) VALUES ('${data.movie_id}', '${data.director_id}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Movie_Director
            query2 = `SELECT * FROM Movie_Directors;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add actor
app.post('/add-actor-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Actors (first_name, last_name, gender, birthdate, nationality, biography) VALUES ('${data.first_name}', '${data.last_name}', '${data.gender}', '${data.birthdate}', '${data.nationality}', '${data.biography}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Actors
            let query2 = `SELECT * FROM Actors;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add Movie_Cast
app.post('/add-movie-cast-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Movie_Cast (movie_id, actor_id, character_name) VALUES ( ${data.movie_id}, ${data.actor_id}, '${data.character_name}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Movie_Cast
            let query2 = `SELECT Movie_Cast.cast_id, Movies.title, CONCAT(Actors.first_name, ' ', Actors.last_name) AS full_name, Movie_Cast.character_name
            FROM Movie_Cast
            JOIN Movies ON Movie_Cast.movie_id = Movies.movie_id
            JOIN Actors ON Movie_Cast.actor_id = Actors.actor_id`;

            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add genre
app.post('/add-genre-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Genres (genre_name) VALUES ('${data.genre_name}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Genres
            query2 = `SELECT * FROM Genres;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add Movie_genre
app.post('/add-movie-genre-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Movie_Genres (movie_id, genre_id) VALUES ( ${data.movie_id}, ${data.genre_id} )`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Movie_Genres
            let query2 = `SELECT * FROM Movie_Genres;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Add synopsis
app.post('/add-synopses-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Synopses (movie_id, synopsis) VALUES (${data.movie_id ? data.movie_id : 'NULL'}, '${data.synopsis}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT on Synopses table
            let query2 = `SELECT s.synopsis_id, IFNULL(m.title, '') as movie_title, s.synopsis
            FROM  Synopses s
            LEFT JOIN Movies m ON s.movie_id = m.movie_id;`;

            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows[rows.length - 1]);
                }
            })
        }
    })
});

/*
    Updating Movie
*/
app.put('/put-movie-ajax', function(req, res, next) {
    let data = req.body;
  
    console.log(data); // Check that the data was received correctly
    
    let title = data.title;
    let released_year = data.released_year;
    let language = data.language;
    let duration = data.duration;
    let rating = data.rating;
    let revenue = data.revenue;
    let movie = data.movie_id;

    let queryUpdateMovie = `UPDATE Movies SET 
    title = ?, released_year = ?, language = ?, duration = ?, rating = ?, revenue = ? 
    WHERE movie_id = ?`;
    
    let selectMovie = 'SELECT * FROM Movies WHERE movie_id = ?'
  
    // Run the query to update the movie
    db.pool.query(queryUpdateMovie,
        [
            title,
            released_year,
            language,
            duration,
            rating,
            revenue,
            movie
        ], 
        function (error, rows, fields) {
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                // Run the second query
                db.pool.query(selectMovie, [movie], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
        }
    );
});

// prepopulate existing value when updating the movie data
app.get('/get-movie-by-id/:movie_id', function (req, res) {
    const movieId = req.params.movie_id;
    const selectMovie = 'SELECT * FROM Movies WHERE movie_id = ?';

    db.pool.query(selectMovie, [movieId], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.send(rows[0]);
        }
    });
});

/*
    Updating Synopsis
*/
app.put('/put-synopsis-ajax', function(req, res, next) {
    let data = req.body;
  
    console.log(data); // Check that the data was received correctly
    
    let synopsis = data.synopsis;
    let movie_id = data.movie_id;
    let synopsis_id = data.synopsis_id;

    let queryUpdateSynopsis = `UPDATE Synopses SET 
        synopsis = ?, movie_id = ?
        WHERE synopsis_id = ?`;
    
    let selectSynopsis = 'SELECT * FROM Synopses WHERE synopsis_id = ?';

    // Run the query to update the movie
    db.pool.query(queryUpdateSynopsis,
        [
            synopsis,
            movie_id,
            synopsis_id
        ], 
        function (error, rows, fields) {
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                // Run the second query
                db.pool.query(selectSynopsis, [synopsis_id], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
        }
    );
});

/*
    Deleting Movie and corresponding data in intersection tables
*/
app.delete('/delete-movie-ajax/', function(req,res,next){
    let data = req.body;
    let movieID = parseInt(data.movie_id);

    let deleteMovie_director = `DELETE FROM Movie_Directors WHERE movie_id = ?`;
    let deleteCast = `DELETE FROM Movie_Cast WHERE movie_id = ?`;
    let deleteMovie_Genre = `DELETE FROM Movie_Genres WHERE movie_id = ?`;
    let deleteSynopsis = `DELETE FROM Synopses WHERE movie_id = ?`;
    let deleteMovie= `DELETE FROM Movies WHERE movie_id = ?`;
    
    // Run the 1st query to delete data from Movie_Directors table
    db.pool.query(deleteMovie_director, [movieID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            // Run the 2nd query to delete data from Movie_Cast table
            db.pool.query(deleteCast, [movieID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // Run the 3rd query to delete data from Movie_Genres table
                    db.pool.query(deleteMovie_Genre, [movieID], function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            // Run the 4th query to delete data from Synopses table
                            db.pool.query(deleteSynopsis, [movieID], function(error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                } else {
                                    // Run the 5th query to delete data from Movies table
                                    db.pool.query(deleteMovie, [movieID], function(error, rows, fields) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(400);
                                        } else {
                                            res.sendStatus(204);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});