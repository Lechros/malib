# @malib/gear

## 1.0.0-next.6

### Patch Changes

- 89c3662: refactor: use null coalescing assignment

## 1.0.0-next.5

### Minor Changes

- 5c71ccb: feat: rename Gear scroll fail, resile methods
- 72abb2b: feat: remove soul enchant req level
- adcb667: feat: move gear capability calculations to wz-gear
- dae7acb: feat: increase maxStar from 25 to 30
- 6d680f0: feat: include req level increase in GearReq
- 6351736: feat: update gear with add option history and set max add option count
- 14b62f4: feat: move add option logic to wz-gear
- 64486a3: feat: support set item and weapon skill information
- e5fc428: feat: correctly support unlimited items starforce
- 3b25044: feat: implement ReadonlyGear class
- 39fbb6b: feat: remove golden hammer and add total cuttable count
- 6351736: feat: remove stat reqs from GearReq
- ae66f8c: feat: add grade property to PotentialData

### Patch Changes

- 1afadb7: feat: remove knockback option
- fd7352f: fix: respect reqLevelIncrease when creating SpellTrace
- 9c92893: feat: export potential types
- 82780d3: feat: add Fixed option to AddOptionCan enum in GearAttributeData
- 8476395: docs: remove golden hammer example
- e704e37: fix: removed attackPower, magicPower bonus from gloves with req level < 130

## 1.0.0-next.4

### Minor Changes

- bbf5207: fix: add maxDemonForce and knockback to GearBaseOption type
- bbf5207: refactor: rename 'title' to 'summary' in PotentialData
- bbf5207: feat: implement potential and additional potential management in Gear class

### Patch Changes

- bbf5207: feat: add normalDamage to PotentialOption
- 9fc45e7: fix: correct type union to intersection for totalOption in Gear class
- d8a8d2c: fix: respect canAddOption attribute in supportsAddOption

## 1.0.0-next.3

### Minor Changes

- 7013d3a: feat: add maxDemonForce, knockback, and normalDamage properties to GearOption
- ea9724c: feat: refactor gear shape to use value object
- 2f199cb: feat: add attackSpeed property to GearAttribute with tests
- f4a1bef: feat: return mutable gear potentials

### Patch Changes

- 6f3e05f: feat: implement stronger type check in Gear and GearAttribute classes

## 1.0.0-next.2

### Minor Changes

- d5fbf5f: fix: export enum as non-type to consumer

## 1.0.0-next.1

### Minor Changes

- bfeab46: feat: make potentials var-length and optional in GearData

### Patch Changes

- ba1f65f: refactor: replace const enum with enum

## 1.0.0-next.0

### Major Changes

- 99422d0: Major rewrite of gear package.

## 0.15.1

### Patch Changes

- dfc938e: Fix MagnificentSoulOptionType export.

## 0.15.0

### Minor Changes

- cac8b06: Support injection of external item data by repository class.
- 3d9cbc1: Integrate create-gear module into gear.

  Deprecates create-gear.

## 0.14.0

### Minor Changes

- 00fa0d4: Add gear migrate function.
- fff2336: Remove soulWeapon.charge setter and add setCharge method.

## 0.13.0

### Minor Changes

- 6593115: Remove icon origin from gear.

## 0.12.3

### Patch Changes

- 5db130d: Export exceptional types.

## 0.12.2

### Patch Changes

- 7bfebb2: Support exceptional enchant serialize/deserialize

## 0.12.1

### Patch Changes

- 7db4a90: Fix soul option serialize error.

## 0.12.0

### Minor Changes

- 6fe266e: Use setter in soul weapon
- afb2c43: Support exceptional enchant

## 0.11.1

### Patch Changes

- 4f9c66f: Fix eternel bonus stat bug.

## 0.11.0

### Minor Changes

- af21c5b: Update spelltrace code. Support armor 15% scroll.

## 0.10.2

### Patch Changes

- 8b347f3: Fix validateParseGear throw

## 0.10.1

### Patch Changes

- 2126a14: Fix wrong serialize type

## 0.10.0

### Minor Changes

- 9e62e4e: Fix serialize bugs

## 0.9.0

### Minor Changes

- 2be4912: Move serialize inside gear.
- 2be4912: Add gear data validator

## 0.8.0

### Minor Changes

- 4477aa3: Use plain object instead of class where possible

## 0.7.0

### Minor Changes

- eda519f: Gear potential can contain undefined entries

## 0.6.0

### Minor Changes

- 9c54ffb: Fix bugs

## 0.5.0

### Minor Changes

- 3deadac: Add gear anvil support
- 3deadac: Add ItemIndex

### Patch Changes

- aae0150: Organize export file

## 0.4.0

### Minor Changes

- c145405: Add anvil, karma support

## 0.3.0

### Minor Changes

- 55d2b1a: Change exports

### Patch Changes

- ff78c05: Fix soul charge AD value

## 0.2.0

### Minor Changes

- fde5254: Fix package.json types

## 0.1.1

### Patch Changes

- 33fc4b4: Update version tag

## 0.1.0

### Minor Changes

- 8043907: Rework Soul module.
- ff25669: Refactor gear class
- 29c058d: Add tests
