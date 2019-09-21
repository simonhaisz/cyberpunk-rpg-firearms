import { Weapon, Caliber, WeaponClass } from "./weapon";

export const pistols = [
    new Weapon("Walther PPK", Caliber.LightPistol, WeaponClass.Gun, 2),
    new Weapon("Ceska Black Scorpion", Caliber.LightPistol, WeaponClass.AssaultGun, 2),
    new Weapon("Browing Ultra Power", Caliber.LightPistol, WeaponClass.Gun, 2),
    new Weapon("Steyr TMP", Caliber.LightPistol, WeaponClass.AssaultGun, 2),
    new Weapon("Ares Predator", Caliber.HeavyPistol, WeaponClass.Gun, 2)
];

export const longGuns = [
    new Weapon("Uzi IV", Caliber.LightPistol, WeaponClass.MachineGun, 2),
    new Weapon("HK 227", Caliber.LightPistol, WeaponClass.MachineGun, 3),
    new Weapon("Remington 990", Caliber.Shotgun, WeaponClass.Gun, 1),
    new Weapon("Mossberg CMDT", Caliber.Shotgun, WeaponClass.AssaultGun, 1),
    new Weapon("Defiance T-250", Caliber.Shotgun, WeaponClass.Gun, 1),
    new Weapon("Franchi SPAS-24", Caliber.Shotgun, WeaponClass.AssaultGun, 1),
    new Weapon("Ruger 100", Caliber.LightRifle, WeaponClass.Gun, 4),
    new Weapon("Remington 950", Caliber.LightRifle, WeaponClass.Gun, 5),
    new Weapon("AK-97", Caliber.LightRifle, WeaponClass.AssaultGun, 3),
    new Weapon("Colt M-23", Caliber.LightRifle, WeaponClass.AssaultGun, 4),
    new Weapon("FN HAR", Caliber.LightRifle, WeaponClass.AssaultGun, 4),
    new Weapon("Ares Alpha", Caliber.LightRifle, WeaponClass.AssaultGun, 5),
    new Weapon("Ranger Arms SM-3", Caliber.LightRifle, WeaponClass.Gun, 6),
    new Weapon("Barrett Model 122", Caliber.HeavyRifle, WeaponClass.Gun, 6),
];

export const machineGuns = [
    new Weapon("Auto Assault 16", Caliber.Shotgun, WeaponClass.MachineGun, 1),
    new Weapon("SA Nemesis", Caliber.LightRifle, WeaponClass.MachineGun, 2),
    new Weapon("Ingram Valiant", Caliber.LightRifle, WeaponClass.MachineGun, 4),
    new Weapon("Stoner Ares M202", Caliber.HeavyRifle, WeaponClass.MachineGun, 4),
];