import { GearType } from './data';

/**
 * 장비 분류가 주무기인지 여부를 확인합니다. 블레이드(`katara`)는 포함되지 않습니다.
 * @param type 장비 분류.
 * @returns 주무기일 경우 `true`; 아닐 경우 `false`.
 */
export function isWeapon(type: GearType): boolean {
  return isLeftWeapon(type) || isDoubleHandWeapon(type);
}

/**
 * 장비 분류가 한손무기인지 여부를 확인합니다. 블레이드(`katara`)는 포함되지 않습니다.
 * @param type 장비 분류.
 * @returns 한손무기일 경우 `true`; 아닐 경우 `false`.
 */
export function isLeftWeapon(type: GearType): boolean {
  return (
    (121 <= type && type <= 139 && type !== GearType.katara) ||
    Math.floor(type / 10) === 121
  );
}

/**
 * 장비 분류가 두손무기인지 여부를 확인합니다.
 * @param type 장비 분류.
 * @returns 두손무기일 경우 `true`; 아닐 경우 `false`.
 */
export function isDoubleHandWeapon(type: GearType): boolean {
  return (
    (type >= 140 && type <= 149) ||
    (type >= 152 && type <= 159) ||
    Math.floor(type / 10) === 140
  );
}

/**
 * 장비 분류가 보조무기인지 여부를 확인합니다. 블레이드(`katara`), 방패류가 포함됩니다.
 * @param type 장비 분류.
 * @returns 보조무기일 경우 `true`; 아닐 경우 `false`.
 */
export function isSubWeapon(type: GearType): boolean {
  if (isShield(type)) {
    return true;
  }
  switch (type) {
    case GearType.katara:
      return true;
    default:
      if (Math.floor(type / 1000) === 135) {
        return true;
      }
      return false;
  }
}

/**
 * 장비 분류가 방패인지 여부를 확인합니다.
 * @param type 장비 분류.
 * @returns 방패일 경우 `true`; 아닐 경우 `false`.
 */
export function isShield(type: GearType): boolean {
  switch (type) {
    case GearType.shield:
    case GearType.demonShield:
    case GearType.soulShield:
      return true;
    default:
      return false;
  }
}

/**
 * 장비 분류가 방어구인지 여부를 확인합니다. 어깨장식이 포함되지 않고 방패가 포함됩니다.
 * @param type 장비 분류.
 * @returns 방어구일 경우 `true`; 아닐 경우 `false`.
 */
export function isArmor(type: GearType): boolean {
  return (
    type === 100 ||
    (type >= 104 && type <= 110) ||
    type === GearType.soulShield ||
    type === GearType.demonShield
  );
}

/**
 * 장비 분류가 장신구인지 여부를 확인합니다. 어깨장식이 포함됩니다.
 * @param type 장비 분류.
 * @returns 장신구일 경우 `true`; 아닐 경우 `false`.
 */
export function isAccessory(type: GearType): boolean {
  return (
    (type >= 101 && type <= 103) || (type >= 111 && type <= 113) || type === 115
  );
}

/**
 * 장비 분류가 메카닉 장비인지 여부를 확인합니다.
 * @param type 장비 분류.
 * @returns 메카닉 장비일 경우 `true`; 아닐 경우 `false`.
 */
export function isMechanicGear(type: GearType): boolean {
  return type >= 161 && type <= 165;
}

/**
 * 장비 분류가 에반 드래곤 장비인지 여부를 확인합니다.
 * @param type 장비 분류.
 * @returns 에반 드래곤 장비일 경우 `true`; 아닐 경우 `false`.
 */
export function isDragonGear(type: GearType): boolean {
  return type >= 194 && type <= 197;
}
