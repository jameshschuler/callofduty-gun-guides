-- Games
insert into game(name, release_year) values ('Call of Duty: Black Ops 4', 2018);

-- Weapon Categories
insert into weapon_category (name) values ('Assault Rifles');
insert into weapon_category (name) values ('Submachine Guns');
insert into weapon_category (name) values ('Tactical Rifles');
insert into weapon_category (name) values ('Light Machine Guns');
insert into weapon_category (name) values ('Sniper Rifles');
insert into weapon_category (name) values ('Pistols');
insert into weapon_category (name) values ('Shotguns');
insert into weapon_category (name) values ('Launchers');
insert into weapon_category (name) values ('Melee');

-- Weapons (Blackops 4)
insert into weapon(name, unlock_level, game_id, weapon_category_id) values ('ICR-7', 0, 1, 1);
insert into weapon(name, unlock_level, game_id, weapon_category_id) values ('Rampart 17', 10, 1, 1);

insert into game_weapon_category(game_id, weapon_category_id) values (1, 1);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 2);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 3);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 4);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 5);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 6);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 7);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 8);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 9);