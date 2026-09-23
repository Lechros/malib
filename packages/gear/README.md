# @malib/gear

메이플스토리 장비 강화 및 관리 기능을 제공합니다.

현재 제공되는 기능은 다음과 같습니다.

- 추가 옵션
- 주문서 및 주문의 흔적
- 스타포스 및 놀라운 장비 강화 주문서
- 잠재능력
- 에디셔널 잠재능력
- 소울웨폰, 소울 증폭 및 소울 잠재능력
- 익셉셔널 강화

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

장비 정보는 `GearData` 타입의 일반 JS 객체로 저장됩니다. JSON으로 저장하고 다시 읽을 수 있습니다. 단, 값이 `undefined`인 속성은 JSON 직렬화 과정에서 생략됩니다.

### ReadonlyGear

`ReadonlyGear` 클래스는 `GearData` 객체에 대한 가벼운 래퍼입니다. 장비 정보를 getter로 제공하며, 조회 과정에서 원본 데이터를 변경하지 않습니다.

읽기 전용 API가 데이터의 불변성을 보장하는 것은 아닙니다. 사용자는 조회한 값을 임의로 변경하지 않아야 합니다.

`GearData`가 외부에서 변경될 경우, `ReadonlyGear` 인스턴스에도 투명하게 노출됩니다. 따라서 하나의 `GearData`로부터 여러 `ReadonlyGear`를 생성하는 것도 가능합니다.

`ReadonlyGear`의 참조형 속성(`baseOption` 등)은 호출 간 같은 값을 가지는 다른 객체를 반환할 수 있습니다. 다시 말해, 깊은 동등은 보장되지만 참조 동등은 보장되지 않습니다.

### Gear

`Gear` 클래스는 `ReadonlyGear` 클래스를 상속합니다.

`GearData`를 변경할 수 있는 속성과 메서드를 추가로 제공합니다. 모든 작업은 내부의 `GearData` 객체를 직접 수정하는 방식으로 작동합니다. 따라서 불변성이 필요한 경우 `Immer` 등을 사용하여 직접 구현해야 합니다.

## Examples

아래 예제는 생성한 `data`와 `gear`를 이어서 사용합니다.

### Creating GearData

`GearData` 객체를 생성하는 별도의 기능은 없으며 직접 생성해야 합니다.

```ts
import { type GearData, GearCapability, GearType } from '@malib/gear';

const data: GearData = {
  version: 4,
  id: 1459876,
  name: 'Example bow',
  icon: '1459876',
  type: GearType.bow,
  req: { level: 100 },
  attributes: {
    canAddOption: GearCapability.Can,
    canScroll: GearCapability.Can,
    canStarforce: GearCapability.Can,
    canPotential: GearCapability.Can,
    canAdditionalPotential: GearCapability.Can,
  },
  baseOption: { dex: 1, attackPower: 100 },
  scrollUpgradeableCount: 2,
};
```

### Migrating GearData

라이브러리 업데이트로 인해 `GearData`의 형태가 변경될 경우 `version` 속성에 반영됩니다. `migrate` 함수로 현재 라이브러리가 지원하는 데이터 버전으로 변환합니다. `GearData` 버전보다 이전 버전으로의 변환은 지원하지 않습니다.

버전은 검사하지만 데이터 전체의 구조나 유효성을 검증하지는 않습니다. 외부 입력 검증은 호출자가 수행해야 합니다.

```ts
import { migrate } from '@malib/gear';

const oldData = {
  version: 3 as const,
  id: 1459876,
  name: 'Example bow',
  icon: '1452000',
  type: 145 as const, // bow
  req: { level: 100 },
  attributes: {},
};
const migratedData = migrate(oldData);

console.log(migratedData.version); // 4
```

### Creating ReadonlyGear

`ReadonlyGear` 및 `Gear` 생성자는 데이터의 `version`이 현재 버전인지 검사합니다. 이전 버전의 데이터는 먼저 `migrate`로 변환해야 합니다.

```ts
import { ReadonlyGear } from '@malib/gear';

const readonlyGear = new ReadonlyGear(data);
```

### Creating Gear

```ts
import { Gear } from '@malib/gear';

const gear = new Gear(data);
```

### Reading Property

`GearData`의 장비 정보를 제공합니다. 존재하지 않는 속성은 조회용 래퍼를 사용하여 기본값을 반환합니다.

```ts
console.log(gear.name); // 'Example bow'

console.log(gear.req.level); // 100

console.log(gear.req.job.class); // 0
console.log(gear.req.job.jobs); // []

console.log(gear.starforceOption.dex); // 0

console.log(gear.soul); // undefined
```

### Modifying State

`Gear` 클래스는 `GearData` 상태를 변경하는 여러 메서드를 제공합니다. 제공되는 메서드 외의 변경은 `gear.data`를 통해 직접 수행할 수 있습니다. 직접 수정할 때는 데이터의 일관성을 호출자가 유지해야 합니다.

`supports…`는 해당 강화 기능의 지원 여부를, `can…`은 현재 상태에서 해당 작업을 수행할 수 있는지를 나타냅니다.

#### 착용 제한 레벨 변경

```ts
// gear.req.level = 120; // Error

gear.data.req.level = 120; // OK
```

#### 추가 옵션 적용

```ts
import { AddOptionType } from '@malib/gear';

gear.applyAddOption(AddOptionType.str, /* grade */ 7);

console.log(gear.addOption.str); // 49

gear.applyAddOption(AddOptionType.str_dex, /* grade */ 7);

console.log(gear.addOption.str); // 77
```

#### 주문서 강화 적용

```ts
import { SpellTraceType } from '@malib/gear';

const premiumAttackScroll = {
  name: 'Premium Attack Scroll',
  option: { attackPower: 5 },
};

if (gear.supportsUpgrade) {
  if (gear.canApplyScroll) {
    gear.applyScroll(premiumAttackScroll);
  }

  if (gear.canApplyScroll) {
    gear.applySpellTrace(SpellTraceType.dex, /* rate */ 30);
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

#### 잠재능력 및 에디셔널 잠재능력 설정

```ts
import { PotentialGrade, type PotentialData } from '@malib/gear';

const potentialOptions: PotentialData[] = [
  {
    grade: PotentialGrade.Rare,
    summary: 'DEX +3%',
    option: { dexRate: 3 },
  },
];

if (gear.canSetPotential) {
  gear.setPotential(PotentialGrade.Rare, potentialOptions);
}

if (gear.canSetAdditionalPotential) {
  gear.setAdditionalPotential(PotentialGrade.Rare, potentialOptions);
}
```

#### 소울 장착 및 증폭

```ts
const godSoul = {
  name: 'God Soul',
  option: { attackPowerRate: 3 },
  canAmplify: true,
};

// Soul amplification requires level >= 200
gear.data.req.level = 200;

if (gear.canApplySoulEnchant) {
  gear.applySoulEnchant();
}
if (gear.canSetSoul(godSoul)) {
  gear.setSoul(godSoul);
}
if (gear.canAmplifySoul) {
  gear.amplifySoul();
}

console.log(gear.soulAmplificationLevel); // 1
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

### Error Handling

작업을 수행할 수 없는 경우 `GearError`가 발생합니다. `message`에는 실패 이유가, `context`에는 대상 장비와 해당 오류의 추가 정보가 포함됩니다.

`Gear`와 `ReadonlyGear`의 두 번째 인자인 `GearConfig`에서 예외 메시지 언어를 지정할 수 있습니다. 한국어(`ko`, 기본값)와 영어(`en`)를 지원합니다.

```ts
import { GearError } from '@malib/gear';

const englishGear = new Gear(data, { errorLanguage: 'en' });

try {
  englishGear.setPotential(PotentialGrade.Normal, potentialOptions);
} catch (error) {
  if (!(error instanceof GearError)) throw error;

  console.log(error.message); // 'Potential cannot be set to Normal rank.'
  console.log(error.context.gear.id); // 1459876
}
```
