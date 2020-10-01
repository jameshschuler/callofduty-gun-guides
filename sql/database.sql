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

CREATE TABLE perk (
	perk_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	unlock_level INTEGER,
	tier INTEGER NOT NULL,
	game_id INTEGER NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (game_id) REFERENCES game (game_id) ON DELETE CASCADE
);

CREATE TABLE attachment (
	attachment_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	is_optic BOOLEAN NOT NULL DEFAULT FALSE,
	game_id INTEGER NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (game_id) REFERENCES game (game_id) ON DELETE CASCADE
);

CREATE TABLE weapon_attachment (
	weapon_id INT NOT NULL,
	attachment_id INT NOT NULL,
	PRIMARY KEY(weapon_id, attachment_id),
	unlock_level INTEGER,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (weapon_id) REFERENCES weapon (weapon_id) ON DELETE CASCADE,
	FOREIGN KEY (attachment_id) REFERENCES attachment (attachment_id) ON DELETE CASCADE
);

CREATE TABLE wildcard (
	wildcard_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	unlock_level INTEGER,
	game_id INTEGER NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (game_id) REFERENCES game (game_id) ON DELETE CASCADE
);

CREATE TABLE gear (
	gear_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	unlock_level INTEGER,
	game_id INTEGER NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (game_id) REFERENCES game (game_id) ON DELETE CASCADE
);

CREATE TABLE equipment_type (
	equipment_type_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP
);

CREATE TABLE equipment (
	equipment_id serial PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	unlock_level INTEGER,
	equipment_type_id INTEGER NOT NULL,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (equipment_type_id) REFERENCES equipment_type (equipment_type_id) ON DELETE CASCADE
);

CREATE TABLE guide (
	guide_id serial PRIMARY KEY,
	game_id INTEGER NOT NULL,
	name VARCHAR ( 200 ) NULL,
	video_url VARCHAR(200),
	source_url VARCHAR(200),
	primary_weapon_id INTEGER,
	secondary_weapon_id INTEGER,
	gear_id INTEGER NOT NULL,
	equipment_id INTEGER NOT NULL,
	primary_optic_attachment_id INTEGER,
	secondary_optic_attachment_id INTEGER,
	created_by VARCHAR(100),
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (game_id) REFERENCES game (game_id) ON DELETE CASCADE,
	FOREIGN KEY (primary_weapon_id) REFERENCES weapon (weapon_id) ON DELETE CASCADE,
	FOREIGN KEY (secondary_weapon_id) REFERENCES weapon (weapon_id) ON DELETE CASCADE,
	FOREIGN KEY (gear_id) REFERENCES gear (gear_id) ON DELETE CASCADE,
	FOREIGN KEY (equipment_id) REFERENCES equipment (equipment_id) ON DELETE CASCADE,
	FOREIGN KEY (primary_optic_attachment_id) REFERENCES attachment (attachment_id) ON DELETE CASCADE,
	FOREIGN KEY (secondary_optic_attachment_id) REFERENCES attachment (attachment_id) ON DELETE CASCADE
);

CREATE TABLE guide_perk (
	guide_id INT NOT NULL,
	perk_id INT NOT NULL,
	PRIMARY KEY(guide_id, perk_id),
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (guide_id) REFERENCES guide (guide_id) ON DELETE CASCADE,
	FOREIGN KEY (perk_id) REFERENCES perk (perk_id) ON DELETE CASCADE
);

CREATE TABLE guide_wildcard (
	guide_id INT NOT NULL,
	wildcard_id INT NOT NULL,
	PRIMARY KEY(guide_id, wildcard_id),
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (guide_id) REFERENCES guide (guide_id) ON DELETE CASCADE,
	FOREIGN KEY (wildcard_id) REFERENCES wildcard (wildcard_id) ON DELETE CASCADE
);

CREATE TABLE guide_primary_weapon_attachment (
	guide_id INT NOT NULL,
	attachment_id INT NOT NULL,
	PRIMARY KEY(guide_id, attachment_id),
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (guide_id) REFERENCES guide (guide_id) ON DELETE CASCADE,
	FOREIGN KEY (attachment_id) REFERENCES attachment (attachment_id) ON DELETE CASCADE
);

CREATE TABLE guide_secondary_weapon_attachment (
	guide_id INT NOT NULL,
	attachment_id INT NOT NULL,
	PRIMARY KEY(guide_id, attachment_id),
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP,
	FOREIGN KEY (guide_id) REFERENCES guide (guide_id) ON DELETE CASCADE,
	FOREIGN KEY (attachment_id) REFERENCES attachment (attachment_id) ON DELETE CASCADE
);

CREATE TABLE api_key (
	api_key_id serial PRIMARY KEY,
	api_key VARCHAR NOT NULL,
	username VARCHAR(100) NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT false,
	expiration_date TIMESTAMP,
	created_on TIMESTAMP NOT NULL default current_timestamp,
    updated_on TIMESTAMP
);