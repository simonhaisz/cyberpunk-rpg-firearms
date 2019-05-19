import { Weapon, Caliber, WeaponClass } from "./weapon";

export const pistols = [
    new Weapon("Browing Ultra Power", Caliber.Pistol, WeaponClass.Gun, 2),
    new Weapon("Ceska Black Scorpion", Caliber.Pistol, WeaponClass.AssaultGun, 2),
    new Weapon("Ares Predator", Caliber.Magnum, WeaponClass.Gun, 2),
    new Weapon("Savalette Guardian", Caliber.Magnum, WeaponClass.AssaultGun, 2),
];

export const longGuns = [
    new Weapon("Uzi IV", Caliber.Pistol, WeaponClass.MachineGun, 2),
    new Weapon("HK 227", Caliber.Pistol, WeaponClass.MachineGun, 3),
    new Weapon("Defiance T-250", Caliber.Shotgun, WeaponClass.Gun, 1),
    new Weapon("Franchi SPAS-24", Caliber.Shotgun, WeaponClass.AssaultGun, 1),
    new Weapon("Ruger 100", Caliber.Rifle, WeaponClass.Gun, 4),
    new Weapon("Remington 950", Caliber.Rifle, WeaponClass.Gun, 5),
    new Weapon("AK-97", Caliber.Rifle, WeaponClass.AssaultGun, 4),
    new Weapon("Colt M-23", Caliber.Rifle, WeaponClass.AssaultGun, 5),
    new Weapon("Ranger Arms SM-3", Caliber.Rifle, WeaponClass.Gun, 6),
    new Weapon("Ares Desert Strike", Caliber.Cannon, WeaponClass.Gun, 6),
];

export const machineGuns = [
    new Weapon("Auto Assault 16", Caliber.Shotgun, WeaponClass.MachineGun, 1),
    new Weapon("SA Nemesis", Caliber.Rifle, WeaponClass.MachineGun, 4),
    new Weapon("Ingram Valiant", Caliber.Rifle, WeaponClass.MachineGun, 5),
    new Weapon("Stoner Ares M202", Caliber.Cannon, WeaponClass.MachineGun, 5),
];