/*
    CS340 Movie Databse
    Group 92
    Dae Hun Park, Troy Shibukawa
    Project Title: CinemaNow Movie Database
*/

--READ
--Selecting movies and its related intersection tables to show movie info
SELECT Movies.title, Movies.released_year,
       GROUP_CONCAT(DISTINCT Genres.genre_name SEPARATOR ', ') AS genres,
       GROUP_CONCAT(DISTINCT CONCAT(Directors.first_name, ' ', Directors.last_name) SEPARATOR ', ') AS director_name,
       GROUP_CONCAT(DISTINCT CONCAT(Actors.first_name, ' ', Actors.last_name) SEPARATOR ', ') AS actors,
       Movies.rating, Movies.language
FROM Movies
LEFT JOIN Movie_Directors ON Movies.movie_id = Movie_Directors.movie_id
LEFT JOIN Directors ON Movie_Directors.director_id = Directors.director_id
LEFT JOIN Movie_Cast ON Movies.movie_id = Movie_Cast.movie_id
LEFT JOIN Actors ON Movie_Cast.actor_id = Actors.actor_id
LEFT JOIN Movie_Genres ON Movies.movie_id = Movie_Genres.movie_id
LEFT JOIN Genres ON Movie_Genres.genre_id = Genres.genre_id
GROUP BY Movies.title, Movies.released_year, Movies.rating, Movies.language,
         Movie_Directors.movie_id, Movie_Cast.movie_id, Movie_Genres.movie_id;

--READ
--Displaying movie data
SELECT * FROM Movies;

--READ
--Displaying director data
SELECT * FROM Directors;

--READ
--Displaying Moive_Directors data 
--Displaying by name instead of _id
SELECT DISTINCT
    Movie_Directors.movie_directors_id, 
    Movies.title, 
    CONCAT(Directors.first_name, ' ', Directors.last_name) AS full_name
  FROM 
    Movie_Directors 
    JOIN Movies ON Movies.movie_id = Movie_Directors.movie_id 
    JOIN Directors ON Directors.director_id = Movie_Directors.director_id;

--READ
--Displaying actor data
SELECT * FROM Actors;

--READ
--Displaying Movie_Cast data
--Displaying by name instead of _id
SELECT Movie_Cast.cast_id, Movies.title, CONCAT(Actors.first_name, ' ', Actors.last_name) AS full_name, Movie_Cast.character_name 
    FROM Movie_Cast 
    JOIN Movies ON Movies.movie_id = Movie_Cast.movie_id 
    JOIN Actors ON Actors.actor_id = Movie_Cast.actor_id;

--READ
--Displaying Genre data
SELECT * FROM Genres;

--READ
--Displaying Moive_Genre data
--Displaying by name instead of _id
SELECT Movie_Genres.movie_genres_id, Movies.title, Genres.genre_name 
    FROM Movie_Genres 
    JOIN Movies ON Movies.movie_id = Movie_Genres.movie_id 
    JOIN Genres ON Genres.genre_id = Movie_Genres.genre_id;

--READ
--Displaying Synopsis data
--Selecting synopsis_id, movie_title(by movie_id or NULL), and synopsis.
SELECT s.synopsis_id, COALESCE(m.title, NULL) as movie_title, s.synopsis
    FROM Synopses s
    JOIN Movies m ON s.movie_id = m.movie_id
    UNION
    SELECT s.synopsis_id, NULL as movie_title, s.synopsis
    FROM Synopses s
    WHERE s.movie_id IS NULL;

--READ
--Used for dropdown select by in user unput form.
--Selecting distinct movie_id from synopses table.
SELECT DISTINCT m.movie_id, m.title as movie_title
    FROM Movies m
    LEFT JOIN Synopses s ON s.movie_id = m.movie_id;

--CREATE
--Adding data to Movies
INSERT INTO Movies (title, released_year, language, duration, rating, revenue) VALUES ('${data.title}', '${data.released_year}', '${data.language}', '${data.duration}', ${rating}, ${revenue});

--CREATE
--Adding data to Directors
INSERT INTO Directors (first_name, last_name, gender, birthdate, nationality, biography) VALUES ('${data.first_name}', '${data.last_name}', '${data.gender}', '${data.birthdate}', '${data.nationality}', '${data.biography}');

--CREATE
--Adding data to Movie_Directors
INSERT INTO Movie_Directors (movie_id, director_id) VALUES ('${data.movie_id}', '${data.director_id}');

--CREATE
--Adding data to Actors
INSERT INTO Actors (first_name, last_name, gender, birthdate, nationality, biography) VALUES ('${data.first_name}', '${data.last_name}', '${data.gender}', '${data.birthdate}', '${data.nationality}', '${data.biography}');

--CREATE
--Adding data to Moive_Cast
INSERT INTO Movie_Cast (movie_id, actor_id, character_name) VALUES ( ${data.movie_id}, ${data.actor_id}, '${data.character_name}');

--READ (used to add new row on exsiting table)
--After adding the data into Movie_Cast, select cast_id, movie_title(by movie_id) and
--actor's first_name + last_name(by actor_id). 
SELECT Movie_Cast.cast_id, Movies.title, CONCAT(Actors.first_name, ' ', Actors.last_name) AS full_name, Movie_Cast.character_name
            FROM Movie_Cast
            JOIN Movies ON Movie_Cast.movie_id = Movies.movie_id
            JOIN Actors ON Movie_Cast.actor_id = Actors.actor_id;

--CREATE
--Adding data to Genre
INSERT INTO Genres (genre_name) VALUES ('${data.genre_name}');

--CREATE
--Adding data to Movie_Genre
INSERT INTO Movie_Genres (movie_id, genre_id) VALUES ( ${data.movie_id}, ${data.genre_id} );

--CREATE
--Adding data to Synopses
INSERT INTO Synopses (movie_id, synopsis) VALUES (${data.movie_id ? data.movie_id : 'NULL'}, '${data.synopsis}');

--READ (used to add new row on exsiting table)
--Select synopsis_id and movie_title(by movie_id, if it's null, display it empty)
--and the description of synopsis.
SELECT s.synopsis_id, IFNULL(m.title, '') as movie_title, s.synopsis
            FROM  Synopses s
            LEFT JOIN Movies m ON s.movie_id = m.movie_id;

--UPDATE
--Updating data in Movies
UPDATE Movies SET 
    title = ?, released_year = ?, language = ?, duration = ?, rating = ?, revenue = ? 
    WHERE movie_id = ?;

--UPDATE
--Updating data in Synopses
UPDATE Synopses SET 
        synopsis = ?, movie_id = ?
        WHERE synopsis_id = ?;

--DELETE
--Delteting data in Movies and its corresponding data in other tables
DELETE FROM Movie_Directors WHERE movie_id = ?;
DELETE FROM Movie_Cast WHERE movie_id = ?;
DELETE FROM Movie_Genres WHERE movie_id = ?;
DELETE FROM Synopses WHERE movie_id = ?;
DELETE FROM Movies WHERE movie_id = ?;
