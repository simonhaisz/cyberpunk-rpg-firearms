import { Weapon } from "./weapon";
import { pistols, longGuns, machineGuns } from "./weapons";

function reportWeapon(w: Weapon) {
    console.log(w.name);
    console.log(`${w.caliber}\t${w.accuracy}\t${w.getRecoil()}\t${w.getAvailability()}\t${w.getCost()}`);
}

export function reportWeapons() {
    const weapons = [
        ...pistols,
        ...longGuns,
        ...machineGuns
    ];

    weapons.forEach(reportWeapon);
}