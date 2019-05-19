export enum Caliber {
    Pistol = "Pistol",
    Magnum = "Magnum",
    Shotgun = "Shotgun",
    Rifle = "Rifle",
    Cannon = "Cannon"
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
    const v500 = 2;
    const v1000 = 4;

    let density: number;
    const d0_5 = 1;
    const d1 = 2;
    const d2 = 3;

    switch (caliber) {
        case Caliber.Pistol:
            size = s35;
            velocity = v500;
            density = d0_5;
            break;
        case Caliber.Magnum:
            size = s50;
            velocity = v500;
            density = d1;
            break;
        case Caliber.Shotgun:
            size = s70;
            velocity = v500;
            density = d1;
            break;
        case Caliber.Rifle:
            size = s25;
            velocity = v1000;
            density = d1;
            break;
        case Caliber.Cannon:
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
                case Caliber.Pistol:
                    return w1;
                case Caliber.Magnum:
                    return w2;
                case Caliber.Shotgun:
                case Caliber.Rifle:
                    return w4;
                case Caliber.Cannon:
                    return w8;
                default:
                    throw new Error(`Unknown gun caliber '${caliber}'`);
            }
        case WeaponClass.MachineGun:
            switch (caliber) {
                case Caliber.Pistol:
                return w2;
            case Caliber.Shotgun:
            case Caliber.Rifle:
                return w8;
            case Caliber.Cannon:
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
        case Caliber.Pistol:
            availability += 0;
            break;
        case Caliber.Magnum:
            availability += 4;
            break;
        case Caliber.Shotgun:
            availability += 4;
            break;
        case Caliber.Rifle:
            availability += 4;
            break;
        case Caliber.Cannon:
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
    100, 150, 200, 350, 500, 800, 1_000, 1_500, 2_000, 3_500, 5_000, 8_000, 10_000, 15_000, 20_000
]
function getCost(caliber: Caliber, weaponClass: WeaponClass, accuracy: number): number {
    let costIndex = 0;
    switch (caliber) {
        case Caliber.Pistol:
            costIndex += 2;
            break;
        case Caliber.Magnum:
            costIndex += 4;
            break;
        case Caliber.Shotgun:
            costIndex += 4;
            break;
        case Caliber.Rifle:
            costIndex += 4;
            break;
        case Caliber.Cannon:
            costIndex += 6;
            break;
    }
    switch (weaponClass) {
        case WeaponClass.Gun:
            costIndex += 0;
            break;
        case WeaponClass.AssaultGun:
            costIndex += 1;
            break;
        case WeaponClass.MachineGun:
            costIndex += 3;
            break;
    }
    costIndex += accuracy;
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