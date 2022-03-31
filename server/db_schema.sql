CREATE TYPE "status" AS ENUM (
  'incomplete',
  'complete'
);

CREATE TABLE users (
  _id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  username varchar UNIQUE NOT NULL,
  password varchar NOT NULL,
  created_at timestamp DEFAULT Now()
);

CREATE TABLE groups (
  _id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  group_name varchar NOT NULL
);

CREATE TABLE users_groups (
  user_id int REFERENCES users (_id) ON UPDATE CASCADE ON DELETE CASCADE,
  group_id int REFERENCES groups (_id) ON UPDATE CASCADE,
  CONSTRAINT users_groups_pkey PRIMARY KEY (user_id, group_id)
);

CREATE TABLE solutions (
  _id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  tournament_id int,
  solution varchar NOT NULL,
  created_at timestamp DEFAULT Now()
);

CREATE TABLE games (
  user_id int REFERENCES users (_id) ON UPDATE CASCADE ON DELETE CASCADE,
  solution_id int REFERENCES solutions (_id) ON UPDATE CASCADE,
  guesses_to_win int DEFAULT 0,
  status status DEFAULT 'incomplete',
  CONSTRAINT games_pkey PRIMARY KEY (user_id, solution_id)
);

CREATE TABLE tournaments (
  _id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  group_id int NOT NULL,
  tournament_name varchar NOT NULL,
  "status" status DEFAULT 'incomplete',
  created_at timestamp DEFAULT Now()
);

CREATE TABLE guesses (
  _id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  guess_row int NOT NULL,
  guess varchar NOT NULL,
  user_id int NOT NULL,
  solution_id int NOT NULL,
  constraint games_fkey FOREIGN KEY (user_id, solution_id) REFERENCES games (user_id, solution_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- CONSTRAINT PFK 
--         FOREIGN KEY (First_Name, Name, Address) 
--         REFERENCES Person (First_Name, Name, Address)

-- ALTER TABLE "users" ADD FOREIGN KEY ("_id") REFERENCES users_groups("user_id");
-- ALTER TABLE users ADD CONSTRAINT fk_groups FOREIGN KEY (groups_id) REFERENCES users_groups("user_id");

-- ALTER TABLE "groups" ADD FOREIGN KEY ("_id") REFERENCES "users_groups" ("group_id");

-- ALTER TABLE "users" ADD FOREIGN KEY ("_id") REFERENCES "games" ("user_id");

-- ALTER TABLE "solutions" ADD FOREIGN KEY ("_id") REFERENCES "games" ("solution_id");

ALTER TABLE "tournaments" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("_id");

ALTER TABLE "solutions" ADD FOREIGN KEY ("tournament_id") REFERENCES "tournaments" ("_id");

INSERT INTO users(_id, username, password) VALUES (1, 'bitch', 'homefry');
INSERT INTO users(_id, username, password) VALUES (2, 'plappy', 'pw');
INSERT INTO users(_id, username, password) VALUES (3, 'hole', 'sunnyday');
INSERT INTO users(_id, username, password) VALUES (4, 'anika', 'brownsewer');
INSERT INTO users(_id, username, password) VALUES (5, 'ALEX', 'JAMITCRAMIT');

INSERT INTO groups(_id, group_name) VALUES (1, 'the honeypots');
INSERT INTO groups(_id, group_name) VALUES (2, 'dinobites');
INSERT INTO groups(_id, group_name) VALUES (3, 'hello kitties');

INSERT INTO tournaments(_id, group_id, tournament_name) VALUES (1, 1,'jungle juice');
INSERT INTO tournaments(_id, group_id, tournament_name) VALUES (2, 1,'Silly Goose Sullys');
INSERT INTO tournaments(_id, group_id, tournament_name) VALUES (3, 2,'big peepers');
INSERT INTO tournaments(_id, group_id, tournament_name) VALUES (4, 3,'eggplants');

INSERT INTO users_groups(user_id, group_id) VALUES (1, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (1, 2);
INSERT INTO users_groups(user_id, group_id) VALUES (2, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (2, 3);
INSERT INTO users_groups(user_id, group_id) VALUES (4, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (5, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (5, 3);
INSERT INTO users_groups(user_id, group_id) VALUES (3, 1);

INSERT INTO solutions(_id, tournament_id, solution) VALUES (1, 1, 'purple');
INSERT INTO solutions(_id, tournament_id, solution) VALUES (2, 1, 'penile');
INSERT INTO solutions(_id, tournament_id, solution) VALUES (3, 2, 'eaters');
INSERT INTO solutions(_id, tournament_id, solution) VALUES (4, 3, 'magics');
INSERT INTO solutions(_id, tournament_id, solution) VALUES (5, 4, 'sexist');
INSERT INTO solutions(_id, tournament_id, solution) VALUES (6, 4, 'undies');
INSERT INTO solutions(_id, tournament_id, solution) VALUES (7, 3, 'buttox');

INSERT INTO games(user_id, solution_id) VALUES (1, 3);
INSERT INTO games(user_id, solution_id) VALUES (1, 2);
INSERT INTO games(user_id, solution_id) VALUES (1, 1);
INSERT INTO games(user_id, solution_id) VALUES (1, 4);
INSERT INTO games(user_id, solution_id) VALUES (2, 3);
INSERT INTO games(user_id, solution_id) VALUES (2, 2);
INSERT INTO games(user_id, solution_id) VALUES (2, 1);
INSERT INTO games(user_id, solution_id) VALUES (2, 6);
INSERT INTO games(user_id, solution_id) VALUES (2, 5);
INSERT INTO games(user_id, solution_id) VALUES (4, 3);
INSERT INTO games(user_id, solution_id) VALUES (4, 2);
INSERT INTO games(user_id, solution_id) VALUES (4, 1);
INSERT INTO games(user_id, solution_id) VALUES (5, 3);
INSERT INTO games(user_id, solution_id) VALUES (5, 2);
INSERT INTO games(user_id, solution_id) VALUES (5, 1);
INSERT INTO games(user_id, solution_id) VALUES (5, 6);
INSERT INTO games(user_id, solution_id) VALUES (5, 5);


INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (0, 'purple', 1, 3);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (1, 'people', 1, 3);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (2, 'eaters', 1, 3);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (0,'pliant', 1, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (1,'poople', 1, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (2,'haters', 1, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (3,'though', 1, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (4,'penile', 1, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (5,'chaser', 1, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (0,'learns', 1, 1);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (0, 'public', 2, 3);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (0, 'raunch', 5, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (1, 'goober', 5, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (2, 'status', 5, 2);
INSERT INTO guesses(guess_row, guess, user_id, solution_id) VALUES (3, 'stupid', 5, 2);

-- _________________________
-- EXAMPLE QUERIES
select users.username, solutions._id from users join users_groups on users._id=users_groups.user_id join groups on groups._id=users_groups.group_id join tournaments on groups._id=tournaments.group_id join solutions on tournaments._id=solutions.tournament_id;

-- Plappy's games and status
select solutions.solution, games.status from users join games on users._id=games.user_id join solutions on games.solution_id=solutions._id where users.username='plappy';

-- shows username, tournaments, and solutions
select users.username, tournaments.tournament_name, solutions.solution from users join users_groups on users._id=users_groups.user_id join groups on groups._id=users_groups.group_id join tournaments on groups._id=tournaments.group_id join solutions on tournaments._id=solutions.tournament_id;

-- shows the solutions for games in a tournament
select tournaments.tournament_name, solutions.solution from tournaments join solutions on tournaments._id=solutions.tournament_id;

-- find winner of given tournament ("jungle juice"), guesses to win for each player for each game in a given tournament 
select users.username, tournaments.tournament_name, games.guesses_to_win from tournaments join solutions on tournaments._id=solutions.tournament_id join games on solutions._id=games.solution_id join users on users._id=games.user_id where tournaments.tournament_name='jungle juice';

-- Find given users's guesses and solution for a specific game
select users.username, guesses.guess, guesses.guess_row, solutions.solution from users join games on users._id=games.user_id join guesses on games.user_id=guesses.user_id AND games.solution_id=guesses.solution_id join solutions on solutions._id=games.solution_id join tournaments on solutions.tournament_id=tournaments._id WHERE games.status='incomplete' AND tournaments._id=2 AND users.username='bitch';