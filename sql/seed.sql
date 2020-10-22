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

-- Black Ops 4

-- Weapons
insert into weapon(name, unlock_level, game_id, weapon_category_id) values ('ICR-7', 0, 1, 1);
insert into weapon(name, unlock_level, game_id, weapon_category_id) values ('Rampart 17', 10, 1, 1);
insert into weapon(name, unlock_level, game_id, weapon_category_id) values ('MX9', 1, 1, 2);
insert into weapon(name, unlock_level, game_id, weapon_category_id) values ('GKS', 13, 1, 2);

-- Game Weapon Categories
insert into game_weapon_category(game_id, weapon_category_id) values (1, 1);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 2);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 3);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 4);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 5);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 6);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 7);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 8);
insert into game_weapon_category(game_id, weapon_category_id) values (1, 9);

-- Perks
insert into perk(name, unlock_level, game_id, tier) values ('Scavenger', 1, 1, 1);
insert into perk(name, unlock_level, game_id, tier) values ('Engineer', 1, 1, 1);
insert into perk(name, unlock_level, game_id, tier) values ('Flak Jacket', 12, 1, 1);
insert into perk(name, unlock_level, game_id, tier) values ('Tactical Mask', 24, 1, 1);

insert into perk(name, unlock_level, game_id, tier) values ('Lightweight', 1, 1, 2);
insert into perk(name, unlock_level, game_id, tier) values ('Skulker', 1, 1, 2);
insert into perk(name, unlock_level, game_id, tier) values ('Cold Blooded', 15, 1, 2);
insert into perk(name, unlock_level, game_id, tier) values ('Gung-Ho', 30, 1, 2);
insert into perk(name, unlock_level, game_id, tier) values ('Dexterity', 42, 1, 2);

insert into perk(name, unlock_level, game_id, tier) values ('Ghost', 1, 1, 3);
insert into perk(name, unlock_level, game_id, tier) values ('Team Link', 1, 1, 3);
insert into perk(name, unlock_level, game_id, tier) values ('Dead Silence', 18, 1, 3);
insert into perk(name, unlock_level, game_id, tier) values ('Tracker', 36, 1, 3);

-- Equipment Types
insert into equipment_type(name) values ('Lethal');
insert into equipment_type(name) values ('Tactical');
insert into equipment_type(name) values ('Other');

-- Attachments

-- Optics
insert into attachment(name, game_id, is_optic) values ('Reflex', 1, true);
insert into attachment(name, game_id, is_optic) values ('Recon', 1, true);
insert into attachment(name, game_id, is_optic) values ('Holographic', 1, true);
insert into attachment(name, game_id, is_optic) values ('Dual Zoom', 1, true);
insert into attachment(name, game_id, is_optic) values ('Threat Detector', 1, true);
insert into attachment(name, game_id, is_optic) values ('NVIR', 1, true);

-- Other
insert into attachment(name, game_id, is_optic) values ('Long Barrel I', 1, false);
insert into attachment(name, game_id, is_optic) values ('FMJ I', 1, false);
insert into attachment(name, game_id, is_optic) values ('Grip I', 1, false);
insert into attachment(name, game_id, is_optic) values ('Grip II', 1, false);
insert into attachment(name, game_id, is_optic) values ('Laser Sight I', 1, false);
insert into attachment(name, game_id, is_optic) values ('Quick Draw I', 1, false);

-- ICR - weapon id: 1
insert into weapon_attachment(weapon_id, attachment_id, unlock_level) values (1, 1, null);
insert into weapon_attachment(weapon_id, attachment_id, unlock_level) values (1, 2, null);

-- Gear
insert into gear(name, unlock_level, game_id) values ('Equipment Charge', null, 1);
insert into gear(name, unlock_level, game_id) values ('Stim Shot', null, 1);
insert into gear(name, unlock_level, game_id) values ('Comsec Device', null, 1);
insert into gear(name, unlock_level, game_id) values ('Body Armor', null, 1);
insert into gear(name, unlock_level, game_id) values ('Acoustic Sensor', null, 1);

-- Equipment
insert into equipment(name, unlock_level, equipment_type_id) values ('Trophy System', null, 2);
insert into equipment(name, unlock_level, equipment_type_id) values ('Combat Axe', null, 1);
insert into equipment(name, unlock_level, equipment_type_id) values ('Frag', null, 1);
insert into equipment(name, unlock_level, equipment_type_id) values ('Molotov', null, 1);
insert into equipment(name, unlock_level, equipment_type_id) values ('Concussion', null, 2);
insert into equipment(name, unlock_level, equipment_type_id) values ('Special Issue', null, 3);

-- Wildcards
insert into wildcard(name, unlock_level, game_id) values ('Perk 1 Greed', 11, 1);
insert into wildcard(name, unlock_level, game_id) values ('Perk 2 Greed', 14, 1);
insert into wildcard(name, unlock_level, game_id) values ('Perk 3 Greed', 17, 1);
insert into wildcard(name, unlock_level, game_id) values ('Overkill', 20, 1);
insert into wildcard(name, unlock_level, game_id) values ('Underkill', 50, 1);
insert into wildcard(name, unlock_level, game_id) values ('Primary Gunfighter 1', 0, 1);
insert into wildcard(name, unlock_level, game_id) values ('Primary Gunfighter 2', 23, 1);
insert into wildcard(name, unlock_level, game_id) values ('Primary Gunfighter 3', 32, 1);
insert into wildcard(name, unlock_level, game_id) values ('Primary Operator Mod', 0, 1);
insert into wildcard(name, unlock_level, game_id) values ('Secondary Operator Mod', 0, 1);
insert into wildcard(name, unlock_level, game_id) values ('Secondary Gunfighter 1', 0, 1);
insert into wildcard(name, unlock_level, game_id) values ('Secondary Gunfighter 2', 26, 1);
insert into wildcard(name, unlock_level, game_id) values ('Secondary Gunfighter 3', 35, 1);
insert into wildcard(name, unlock_level, game_id) values ('Perk 1 Gluttony', 38, 1);
insert into wildcard(name, unlock_level, game_id) values ('Perk 2 Gluttony', 44, 1);
insert into wildcard(name, unlock_level, game_id) values ('Perk 3 Gluttony', 47, 1);