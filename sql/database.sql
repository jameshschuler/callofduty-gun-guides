CREATE TABLE game (
	game_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	release_year INTEGER NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP 
);

CREATE TABLE weapon_category (
	weapon_category_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP 
);

CREATE TABLE game_weapon_category (
	game_id INT NOT NULL,
	weapon_category_id INT NOT NULL,
	PRIMARY KEY(game_id, weapon_category_id),
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (game_id) REFERENCES game (game_id) ON DELETE CASCADE,
	FOREIGN KEY (weapon_category_id) REFERENCES weapon_category (weapon_category_id) ON DELETE CASCADE
);

CREATE TABLE weapon (
	weapon_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	unlock_level INTEGER,
	game_id INTEGER NOT NULL,
	weapon_category_id INTEGER NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (game_id) REFERENCES game (game_id) ON DELETE CASCADE,
	FOREIGN KEY (weapon_category_id) REFERENCES weapon_category (weapon_category_id) ON DELETE CASCADE
);