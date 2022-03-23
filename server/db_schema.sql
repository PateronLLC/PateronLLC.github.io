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

CREATE TABLE games (
  _id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  tournament_id int,
  solution varchar NOT NULL,
  created_at timestamp DEFAULT Now()
);

CREATE TABLE users_games (
  user_id int REFERENCES users (_id) ON UPDATE CASCADE ON DELETE CASCADE,
  game_id int REFERENCES games (_id) ON UPDATE CASCADE,
  guesses_to_win int DEFAULT 0,
  status status DEFAULT 'incomplete',
  CONSTRAINT users_games_pkey PRIMARY KEY (user_id, game_id)
);

CREATE TABLE tournaments (
  _id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  group_id int NOT NULL,
  tournament_name varchar NOT NULL,
  "status" status DEFAULT 'incomplete',
  created_at timestamp DEFAULT Now()
);



-- ALTER TABLE "users" ADD FOREIGN KEY ("_id") REFERENCES users_groups("user_id");
-- ALTER TABLE users ADD CONSTRAINT fk_groups FOREIGN KEY (groups_id) REFERENCES users_groups("user_id");

-- ALTER TABLE "groups" ADD FOREIGN KEY ("_id") REFERENCES "users_groups" ("group_id");

-- ALTER TABLE "users" ADD FOREIGN KEY ("_id") REFERENCES "users_games" ("user_id");

-- ALTER TABLE "games" ADD FOREIGN KEY ("_id") REFERENCES "users_games" ("game_id");

ALTER TABLE "tournaments" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("_id");

ALTER TABLE "games" ADD FOREIGN KEY ("tournament_id") REFERENCES "tournaments" ("_id");

INSERT INTO users(username, password) VALUES ('bitch', 'homefry');
INSERT INTO users(username, password) VALUES ('plappy', 'pw');
INSERT INTO users(username, password) VALUES ('hole', 'sunnyday');
INSERT INTO users(username, password) VALUES ('anika', 'brownsewer');
INSERT INTO users(username, password) VALUES ('ALEX', 'JAMITCRAMIT');

INSERT INTO users(group_name) VALUES ('the honeypots');
INSERT INTO users(group_name) VALUES ('dinobites');
INSERT INTO users(group_name) VALUES ('hello kittys');

INSERT INTO tournaments(group_id, tournament_name) VALUES (1,'jungle juice');
INSERT INTO tournaments(group_id, tournament_name) VALUES (1,'Silly Goose Sullys');
INSERT INTO tournaments(group_id, tournament_name) VALUES (2,'big peepers');
INSERT INTO tournaments(group_id, tournament_name) VALUES (3,'eggplants');

INSERT INTO users_groups(user_id, group_id) VALUES (1, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (1, 2);
INSERT INTO users_groups(user_id, group_id) VALUES (2, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (2, 3);
INSERT INTO users_groups(user_id, group_id) VALUES (4, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (5, 1);
INSERT INTO users_groups(user_id, group_id) VALUES (5, 3);
INSERT INTO users_groups(user_id, group_id) VALUES (6, 1);

INSERT INTO games(tournament_id, solution) VALUES (1,'purple');
INSERT INTO games(tournament_id, solution) VALUES (1,'penile');
INSERT INTO games(tournament_id, solution) VALUES (2,'eaters');
INSERT INTO games(tournament_id, solution) VALUES (3,'magics');
INSERT INTO games(tournament_id, solution) VALUES (4,'sexist');
INSERT INTO games(tournament_id, solution) VALUES (4,'undies');

INSERT INTO users_games(user_id, game_id) VALUES (1, 3);
INSERT INTO users_games(user_id, game_id) VALUES (1, 2);
INSERT INTO users_games(user_id, game_id) VALUES (1, 1);
INSERT INTO users_games(user_id, game_id) VALUES (1, 4);
INSERT INTO users_games(user_id, game_id) VALUES (2, 3);
INSERT INTO users_games(user_id, game_id) VALUES (2, 2);
INSERT INTO users_games(user_id, game_id) VALUES (2, 1);
INSERT INTO users_games(user_id, game_id) VALUES (2, 6);
INSERT INTO users_games(user_id, game_id) VALUES (2, 5);
INSERT INTO users_games(user_id, game_id) VALUES (4, 3);
INSERT INTO users_games(user_id, game_id) VALUES (4, 2);
INSERT INTO users_games(user_id, game_id) VALUES (4, 1);
INSERT INTO users_games(user_id, game_id) VALUES (5, 3);
INSERT INTO users_games(user_id, game_id) VALUES (5, 2);
INSERT INTO users_games(user_id, game_id) VALUES (5, 1);
INSERT INTO users_games(user_id, game_id) VALUES (5, 6);
INSERT INTO users_games(user_id, game_id) VALUES (5, 5);
INSERT INTO users_games(user_id, game_id) VALUES (6, 3);
INSERT INTO users_games(user_id, game_id) VALUES (6, 2);
INSERT INTO users_games(user_id, game_id) VALUES (6, 1);

_________________________
select users.username, games._id from users join users_groups on users._id=users_groups.user_id join groups on groups._id=users_groups.group_id join tournaments on groups._id=tournaments.group_id join games on tournaments._id=games.tournament_id;

select games.solution, users_games.status from users join users_games on users._id=users_games.user_id join games on users_games.game_id=games._id where users.username='plappy';

-- shows username, tournaments, and games
select users.username, tournaments.tournament_name, games.solution from users join users_groups on users._id=users_groups.user_id join groups on groups._id=users_groups.group_id join tournaments on groups._id=tournaments.group_id join games on tournaments._id=games.tournament_id;

-- shows the solutions for games in a tournament
select tournaments.tournament_name, games.solution from tournaments join games on tournaments._id=games.tournament_id;

-- find winner of tournament, guesses to win for each player for each game in a given tournament 
select users.username, tournaments.tournament_name, users_games.guesses_to_win from tournaments join games on tournaments._id=games.tournament_id join users_games on games._id=users_games.game_id join users on users._id=users_games.user_id where tournaments.tournament_name='jungle juice';