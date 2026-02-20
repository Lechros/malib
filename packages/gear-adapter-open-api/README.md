# @malib/gear-adapter-open-api

메이플스토리 Open API의 데이터를 `@malib/gear` 형식으로 변환하는 기능을 제공합니다.

## Installation

```shell
# Npm
npm install @malib/gear-adapter-open-api
# Yarn
yarn add @malib/gear-adapter-open-api
# Pnpm
pnpm add @malib/gear-adapter-open-api
```

## Examples

### Converting API Response to GearData

```ts
import { type GearData } from '@malib/gear';
import { convert } from '@malib/gear-adapter-open-api';

const jobName = '아델';
const info: ItemEquipmentInfo = {...};

const data: GearData = convert(info);
```
