# malib

메이플스토리의 캐릭터 상태를 시뮬레이션하는 라이브러리입니다.

구현된 기능

- 장비 강화 및 관리

## API Documentation

추후 [malib.pages.dev](https://malib.pages.dev/)에 게시될 예정입니다.

## Installation

### @malib/gear

```shell
# Npm
npm install @malib/gear
# Yarn
yarn add @malib/gear
# Pnpm
pnpm add @malib/gear
```

## Overview

### @malib/gear

#### GearData

장비 정보는 `GearData` 타입의 순수한 JS 객체로 저장됩니다. `JSON.stringify` 및 `JSON.parse` 후에도 동일한 상태를 유지합니다.

#### Gear

`Gear` 클래스는 `GearData` 객체에 대한 가벼운 래퍼입니다. `GearData`의 모든 속성을 읽기 전용으로 포함하며, 상태를 변경하는 메서드를 제공합니다. 잘못된 `GearData` 상태에 대해 검사하지 않습니다.

`Gear` 생성 시 하나의 `GearData`만을 받으며, 이를 제외한 어떠한 상태도 가지지 않습니다. 모든 작업은 `GearData` 객체를 직접 수정하는 방식으로 작동합니다. 따라서 하나의 `GearData`로부터 여러 `Gear`를 생성해도 변경 사항은 `Gear` 인스턴스 간에 공유됩니다.

`Gear`의 참조형 속성은 완전한 동등(`===`)이 보장되지 않으며, 깊은 동등만이 보장됩니다.

`GearData` 객체에 대해해 불변성이 필요한 경우 직접 구현해야 합니다.

## Example

### Creating GearData

`GearData` 객체를 생성하는 별도의 기능은 없으며 직접 생성해야 합니다.

라이브러리 업데이트로 인해 `GearData`의 형태가 변경될 경우 `meta.version` 속성에 반영되며, 새로운 버전으로 변환하는 함수가 제공될 예정입니다.

```ts
import { type GearData, type GearType } from '@malib/gear';

const data: GearData = {
  meta: {
    id: 1009876,
    version: 1,
    add: [],
  },
  name: 'Example cap',
  type: GearType.cap,
  req: { level: 100 },
  attributes: {},
  baseOption: { str: 1 },
  potentials: [null, null, null],
  additionalPotentials: [null, null, null],
};
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
// Example, modify data with caution.
gear.data.maxStar = 8;

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

## Support

라이브러리 관련 문의는 GitHub 이슈로 남겨주시기 바랍니다.
