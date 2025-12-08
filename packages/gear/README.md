# @malib/gear

메이플스토리 장비 강화 및 관리 기능을 제공합니다.

## Installation

```shell
# Npm
npm install @malib/gear
# Yarn
yarn add @malib/gear
# Pnpm
pnpm add @malib/gear
```

## Overview

### GearData

장비 정보는 `GearData` 타입의 순수한 JS 객체로 저장됩니다. `JSON.stringify` 및 `JSON.parse` 후에도 동일한 상태를 유지합니다.

### ReadonlyGear

`ReadonlyGear` 클래스는 `GearData` 객체에 대한 가벼운 래퍼입니다. `GearData`의 모든 속성을 읽기 전용으로 제공하며, 어떠한 작업도 `GearData`의 상태를 변경하지 않습니다.

`GearData`가 외부에서 변경될 경우, `ReadonlyGear` 인스턴스에도 투명하게 노출됩니다. 따라서 하나의 `GearData`로부터 여러 `ReadonlyGear`를 생성하는 것도 가능합니다.

`ReadonlyGear`의 참조형 속성(`baseOption` 등)은 호출 간 같은 값을 가지는 다른 객체를 반환할 수 있습니다. 다시 말해, 깊은 동등은 보장되지만 참조 동등은 보장되지 않습니다.

### Gear

`Gear` 클래스는 `ReadonlyGear` 클래스를 상속합니다.

`GearData`를 변경할 수 있는 속성과 메서드를 추가로 제공합니다. 모든 작업은 내부의 `GearData` 객체를 직접 수정하는 방식으로 작동합니다. 따라서 불변성이 필요한 경우 `Immer` 등을 사용하여 직접 구현해야 합니다.

## Examples

### Creating GearData

`GearData` 객체를 생성하는 별도의 기능은 없으며 직접 생성해야 합니다.

```ts
import { type GearData, type GearType } from '@malib/gear';

const data: GearData = {
  version: 2,
  id: 1009876,
  name: 'Example cap',
  icon: '1000000',
  type: GearType.cap,
  req: { level: 100 },
  attributes: {},
  baseOption: { str: 1 },
};
```

### Migrating GearData

라이브러리 업데이트로 인해 `GearData`의 형태가 변경될 경우 `version` 속성에 반영되며, `migrate` 함수를 사용해 기존의 데이터를 새로운 버전으로 변환할 수 있습니다. 별도의 데이터 검증은 수행하지 않습니다.

```ts
import { migrate } from '@malib/gear';

const dataV2 = migrate(data, 2);

try {
  const invalid = migrate({}, 2);
} catch (e) {
  console.log(e); // 입력 데이터가 유효하지 않습니다.
}
```

### Creating ReadonlyGear

`ReadonlyGear` 및 `Gear`를 생성 시 오직 데이터의 `version` 속성만을 검사합니다.

```ts
import { ReadonlyGear } from '@malib/gear';

const gear = new ReadonlyGear(data);
```

### Creating Gear

```ts
import { Gear } from '@malib/gear';

const gear = new Gear(data);
```

### Reading Property

`GearData`의 값을 그대로 반환하며, 존재하지 않는 속성에 접근하면 기본값을 반환합니다.

```ts
console.log(gear.name); // 'Example cap'

console.log(gear.req.level); // 100

console.log(gear.req.job); // 0

console.log(gear.starforceOption.dex); // 0

console.log(gear.soul); // undefined
```

### Modifying State

`Gear` 클래스는 `GearData` 상태를 변경하는 여러 메서드를 제공합니다. 인게임에서 수행할 수 없는 작업은 `Gear`에서 제공되지 않으므로 `GearData`를 직접 수정해야 합니다.

#### 착용 제한 레벨 변경

```ts
gear.req.level = 120; // Impossible!

gear.data.req.level = 120; // OK
```

#### 추가 옵션 적용

```ts
gear.applyAddOption(AddOptionType.str, /* grade */ 7);

console.log(gear.addOption.str); // 42

gear.applyAddOption(AddOptionType.str_dex, /* grade */ 7);

console.log(gear.addOption.str); // 63
```

#### 주문서 강화 적용

```ts
const premiumAttackScroll = {
  name: 'Premium Attack Scroll',
  option: { attackPower: 5 },
};

// Example, modify data with caution.
gear.data.scrollUpgradeableCount = 1;

if (gear.supportsUpgrade) {
  if (gear.canApplyScroll) {
    gear.applyScroll(premiumAttackScroll);
  }

  if (gear.canApplyScroll) {
    gear.applySpellTrace(SpellTraceType.dex /* rate */ 30);
  }
}
```

#### 스타포스 강화 적용

```ts
if (gear.canApplyStarforce) {
  gear.applyStarforce();
}
```

#### 놀라운 장비 강화 주문서 적용

```ts
gear.resetStarforce();

if (gear.canApplyStarScroll) {
  gear.applyStarScroll();
}
```

#### 소울 장착

```ts
const godSoul = {
  name: 'God Soul',
  skill: 'Jung Sang Hwa',
  option: { attackPowerRate: 3 },
  chargeFactor: 2,
};

// Example, modify data with caution.
gear.data.type = GearType.bow;

if (gear.canApplySoulEnchant) {
  gear.applySoulEnchant();
  gear.setSoul(godSoul);
  gear.setSoulCharge(1000);
}
```

#### 익셉셔널 강화

```ts
const exceptionalHammer = {
  name: 'Exceptional Hammer (Bow)',
  option: { str: 15, dex: 15, luk: 15, attackPower: 10 },
};

// Example, modify data with caution.
gear.data.exceptionalUpgradeableCount = 1;

if (gear.canApplyExceptional) {
  gear.applyExceptional(exceptionalHammer);
}
```
