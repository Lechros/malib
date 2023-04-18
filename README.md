# malib
메이플스토리의 캐릭터 상태를 시뮬레이션하는 라이브러리입니다.

- 인게임과 유사한 장비 생성 및 강화 로직 제공
- (WIP) 캐릭터 시뮬레이션
- IDE에서 타입과 자세한 설명 지원

## Documentation
문서는 [malib.pages.dev](https://malib.pages.dev/)에서 확인할 수 있습니다.

## Installation
```
npm install @malib/gear
...
```

## Example
create-gear 모듈을 사용하여 장비를 생성하고, gear 모듈을 사용하여 장비를 강화하는 예시입니다.
```js
import { createGearFromId } from "@malib/create-gear";
import {
  addAmazingEnhancement,
  addBonusStat,
  addStarforce,
  applyScroll,
  applySpellTrace,
  BonusStatType,
  GearPropType,
} from "@malib/gear";

// 트릭스터 레인져팬츠 장비 생성
const gear = createGearFromId(1062167);
if (gear === undefined) { /* return */ }

// 추가옵션
addBonusStat(gear, BonusStatType.DEX, 7);

// 주문서
const scroll = {
  name: "놀라운 긍정의 혼돈 주문서",
  option: new Map([
    [GearPropType.incSTR, 1],
    [GearPropType.incPAD, 6],
  ])
};
applyScroll(gear, scroll);

// 주문의 흔적
applySpellTrace(gear, GearPropType.incDEX, 30);

// 스타포스
addStarforce(gear);

// 놀라운 장비강화
addAmazingEnhancement(gear);

// 장비 옵션 확인
gear.option(GearPropType.incDEX).sum;
```

## Credits
gear 모듈 일부 로직과 구조는 [WzComparerR2-kms](https://github.com/KENNYSOFT/WzComparerR2)를 참고하였습니다.