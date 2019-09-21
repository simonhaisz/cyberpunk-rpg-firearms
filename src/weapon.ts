export enum Caliber {
    LightPistol = "LightPistol",
    HeavyPistol = "HeavyPistol",
    Shotgun = "Shotgun",
    LightRifle = "LightRifle",
    HeavyRifle = "HeavyRifle"
}

export enum WeaponClass {
    Gun = "Gun",
    AssaultGun = "Assault-ggun",
    MachineGun = "Machine-gun"
}

function getPower(caliber: Caliber): number {
    let size: number;
    const s25 = 1;
    const s35 = 2;
    const s50 = 3;
    const s70 = 4;

    let velocity: number;
    // const v350 = 1;
    const v500 = 2;
    // const v700 = 3;
    const v1000 = 4;

    let density: number;
    const d0_5 = 1;
    const d1 = 2;
    const d2 = 3;

    switch (caliber) {
        case Caliber.LightPistol:
            size = s35;
            velocity = v500;
            density = d0_5;
            break;
        case Caliber.HeavyPistol:
            size = s50;
            velocity = v500;
            density = d1;
            break;
        case Caliber.Shotgun:
            size = s70;
            velocity = v500;
            density = d1;
            break;
        case Caliber.LightRifle:
            size = s25;
            velocity = v1000;
            density = d1;
            break;
        case Caliber.HeavyRifle:
            size = s50;
            velocity = v1000;
            density = d2;
            break;
        default:
            throw new Error(`Unknown Caliber '${caliber}'`);
    }
    return size + velocity + density;
}

function getWeight(weaponClass: WeaponClass, caliber: Caliber) {
    const w1 = 0;
    const w2 = 1;
    const w4 = 2;
    const w8 = 3;
    const w16 = 4;
    switch (weaponClass) {
        case WeaponClass.Gun:
        case WeaponClass.AssaultGun:
            switch (caliber) {
                case Caliber.LightPistol:
                    return w1;
                case Caliber.HeavyPistol:
                    return w2;
                case Caliber.Shotgun:
                case Caliber.LightRifle:
                    return w4;
                case Caliber.HeavyRifle:
                    return w8;
                default:
                    throw new Error(`Unknown gun caliber '${caliber}'`);
            }
        case WeaponClass.MachineGun:
            switch (caliber) {
                case Caliber.LightPistol:
                    return w2;
                case Caliber.Shotgun:
                case Caliber.LightRifle:
                    return w8;
                case Caliber.HeavyRifle:
                    return w16;
                default:
                    throw new Error(`Unknown gun caliber '${caliber}'`);            }
        default:
            throw new Error(`Unknown weapon class '${weaponClass}'`);
    }
}

function getRecoil(caliber: Caliber, weaponClass: WeaponClass): number {
    const power = getPower(caliber);
    const weight = getWeight(weaponClass, caliber);
    return power - weight;
}

function getAvailability(caliber: Caliber, weaponClass: WeaponClass, accuracy: number): number {
    let availability = -2;
    switch (caliber) {
        case Caliber.LightPistol:
            availability += 0;
            break;
        case Caliber.HeavyPistol:
            availability += 4;
            break;
        case Caliber.Shotgun:
            availability += 4;
            break;
        case Caliber.LightRifle:
            availability += 4;
            break;
        case Caliber.HeavyRifle:
            availability += 8;
            break;
        default:
            throw new Error(`Unknown caliber '${caliber}'`);
    }
    switch (weaponClass) {
        case WeaponClass.Gun:
            availability += 0;
            break;
        case WeaponClass.AssaultGun:
            availability += 4;
            break;
        case WeaponClass.MachineGun:
            availability += 6;
            break;
    }
    availability += accuracy * 2;
    return availability;
}

const costs = [
    100, 150, 200, 350, 500, 750, 1_000, 1_500, 2_000, 3_500, 5_000, 7500, 10_000, 15_000, 20_000, 35_000, 50_000
]
function getCost(caliber: Caliber, weaponClass: WeaponClass, accuracy: number): number {
    let costIndex = 0;
    switch (caliber) {
        case Caliber.LightPistol:
            costIndex += 0;
            break;
        case Caliber.HeavyPistol:
            costIndex += 2;
            break;
        case Caliber.Shotgun:
            costIndex += 3;
            break;
        case Caliber.LightRifle:
            costIndex += 1;
            break;
        case Caliber.HeavyRifle:
            costIndex += 4;
            break;
        default:
            throw new Error(`Unknown caliber '${caliber}'`);
    }
    switch (weaponClass) {
        case WeaponClass.Gun:
            costIndex += 0;
            break;
        case WeaponClass.AssaultGun:
            costIndex += 2;
            break;
        case WeaponClass.MachineGun:
            costIndex += 4;
            break;
    }
    switch (accuracy) {
        case 1:
        case 2:
            costIndex += accuracy;
            break;
        case 3:
            costIndex += 4;
            break;
        case 4:
            costIndex += 6;
            break;
        case 5:
            costIndex += 8;
            break;
        case 6:
            costIndex += 10;
            break;
    }
    if (costIndex >= costs.length) {
        throw new Error(`Cost index ${costIndex} is greater than the highest costs`);
    }
    return costs[costIndex];
}

export class Weapon {
    readonly name: string;
    readonly caliber: Caliber;
    readonly weaponClass: WeaponClass;
    readonly accuracy: number;
    private recoil = Number.MAX_SAFE_INTEGER;
    private availability = Number.MAX_SAFE_INTEGER;
    private cost = Number.MAX_SAFE_INTEGER;

    constructor(name: string, caliber: Caliber, type: WeaponClass, accuracy: number) {
        this.name = name;
        this.caliber = caliber;
        this.weaponClass = type;
        this.accuracy = accuracy;
        this.initializeProperties();
    }

    private initializeProperties() {
        this.recoil = this.computeRecoil();
        this.availability = this.computeAvailability();
        this.cost = this.computeCost();
    }

    private computeRecoil(): number {
        return getRecoil(this.caliber, this.weaponClass);
    }

    private computeAvailability(): number {
        return getAvailability(this.caliber, this.weaponClass, this.accuracy);
    }

    private computeCost(): number {
        return getCost(this.caliber, this.weaponClass, this.accuracy);
    }

    getRecoil(): number {
        return this.recoil;
    }

    getAvailability(): number {
        return this.availability;
    }

    getCost(): number {
        return this.cost;
    }
}