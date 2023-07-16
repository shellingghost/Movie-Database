/*
    CS340 Movie Databse
    Group 92
    Dae Hun Park, Troy Shibukawa
    Project Title: CinemaNow Movie Database
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Movies table
CREATE OR REPLACE TABLE Movies (
  movie_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(145) NOT NULL,
  released_year YEAR NOT NULL,
  language VARCHAR(145) NOT NULL,
  duration VARCHAR(145),
  rating DECIMAL(3,1),
  revenue BIGINT
);

-- Create Synopses table
CREATE OR REPLACE TABLE Synopses (
  synopsis_id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  synopsis TEXT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES Movies (movie_id)
);

-- Create Actors table
CREATE OR REPLACE TABLE Actors (
  actor_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(145) NOT NULL,
  last_name VARCHAR(145) NOT NULL,
  gender VARCHAR(145) NOT NULL,
  birthdate VARCHAR(10),
  nationality VARCHAR(145),
  biography TEXT
);

-- Create Movie_Cast table (intersection table between Movies and Actors)
CREATE OR REPLACE TABLE Movie_Cast (
  cast_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  movie_id INT NOT NULL,
  actor_id INT NOT NULL,
  character_name VARCHAR(145),
  FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE,
  FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE
);

-- Create Directors table
CREATE OR REPLACE TABLE Directors (
  director_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(145) NOT NULL,
  last_name VARCHAR(145) NOT NULL,
  gender VARCHAR(145) NOT NULL,
  birthdate VARCHAR(10),
  nationality VARCHAR(145),
  biography TEXT
);

-- Create Movie_Directors table (intersection table between Movies and Directors)
CREATE OR REPLACE TABLE Movie_Directors (
  movie_directors_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  movie_id INT NOT NULL,
  director_id INT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE,
  FOREIGN KEY (director_id) REFERENCES Directors(director_id) ON DELETE CASCADE
);

-- Create Genres table
CREATE OR REPLACE TABLE Genres (
  genre_id INT AUTO_INCREMENT PRIMARY KEY,
  genre_name VARCHAR(145) UNIQUE NOT NULL
);

-- Create Moive_Genres table (intersection table between Movies and Genres)
CREATE OR REPLACE TABLE Movie_Genres (
  movie_genres_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  movie_id INT NOT NULL,
  genre_id INT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES Genres(genre_id) ON DELETE CASCADE
);

--Insert Genre Sample
INSERT INTO Genres (genre_name)
VALUES 
('Action'), 
('Adventure'),
('Comedy'),
('Crime'),
('Drama'),
('Horror'),
('Mystery'),
('Romance'),
('Sci-Fi'),
('Thriller');

/*
    1-20-2023
    Movie sample data was obtained from IMDB (https://www.imdb.com/)
*/

-- Insert movies (https://www.imdb.com/)
INSERT INTO Movies (title, released_year, language, duration, rating, revenue)
VALUES
('No Country for Old Men', '2007', 'English, Spanish', '02:02:00', 8.2, NULL),
('Parasite', '2019', 'Korean', '02:12:00', 8.5, NULL),
('The Shawshank Redemption', '1994', 'English', '02:22:00', 9.3, 7300000),
("Harry Potter and the Sorcerer's Stone", '2001', 'English', '02:32:00', 7.6, Null),
('The Dark Knight', '2008', 'English', '02:32:00', 9.0, 533000000);

-- Insert Synopses (https://www.imdb.com/)
INSERT INTO Synopses (movie_id, synopsis)
VALUES
(1, 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande'),
(2, 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'),
(3, 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.'),
(NULL, 'No movie yet.'),
(5, 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham,......................');

-- Insert Actors (https://www.imdb.com/)
INSERT INTO Actors (first_name, last_name, gender, birthdate, nationality, biography)
VALUES
('Javier', 'Bardem', 'Male', '1969-3-1', 'Spain', NULL),
('Kang-ho', 'Song', 'Male', '1967-1-17', 'Korea', NULL),
('Tim', 'Robbins', 'Male', '1958-10-16', 'United States', NULL),
('Daniel', 'Radcliffe', 'Male', '1989-7-23', 'UK', NULL),
('Christian', 'Bale', 'Male', '1974-1-30', 'UK', NULL),
('Heath', 'Ledger', 'Male', '1979-4-4', 'Australia', NULL);

-- Insert Movie_Cast (https://www.imdb.com/)
INSERT INTO Movie_Cast (movie_id, actor_id, character_name)
VALUES
(1, 1, 'Anton Chigurh'),
(2, 2, 'Ki-Taek Kim'),
(3, 3, 'Andy Dufresne'),
(4, 4, 'Harry Potter'),
(5, 5, 'Bruce Wayne'),
(5, 6, 'Joker');

-- Insert Directors (https://www.imdb.com/)
INSERT INTO Directors (first_name, last_name, gender, birthdate, nationality, biography)
VALUES
('Ethan', 'Coen', 'Male', '1957-09-21', 'United States', NULL),
('Joel', 'Coen', 'Male', '1954-11-29', 'United States', NULL),
('Joon-Ho', 'Bong', 'Male', '1969-09-14', 'Korea', NULL),
('Frank', 'Darabont', 'Male', '1959-01-29', 'France', NULL),
('Chris', 'Columbus', 'Male', '1958-9-10', 'United States', NULL),
('Christopher', 'Nolan', 'Male', '1970-7-30', 'England', NULL);

-- Insert Moive_Directors (Intersection table between Movies and Directors)
INSERT INTO Movie_Directors (movie_id, director_id)
VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(5, 6);

-- Insert Movie_Genres (Intersection table between movies and Directors)
INSERT INTO Movie_Genres (movie_id, genre_id)
VALUES
(1, 1),
(1, 4),
(1, 10),
(2, 5),
(2, 10),
(3, 4),
(3, 5),
(4, 2),
(5, 4);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;