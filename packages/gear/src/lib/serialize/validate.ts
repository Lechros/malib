import { GearLike } from "./interface";

/**
 * 객체가 `GearLike` 형식인지 여부를 확인합니다.
 * @param input 확인할 객체.
 * @returns 입력이 `GearLike` 형식일 경우 `true`; 아닐 경우 `false`.
 */
export const isGearLike = (input: unknown): input is GearLike => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const $io0 = (input: any): boolean =>
    "number" === typeof input.id &&
    "string" === typeof input.name &&
    (undefined === input.desc || "string" === typeof input.desc) &&
    "object" === typeof input.icon &&
    null !== input.icon &&
    $io1(input.icon) &&
    (undefined === input.anvilIcon ||
      ("object" === typeof input.anvilIcon &&
        null !== input.anvilIcon &&
        $io1(input.anvilIcon))) &&
    (undefined === input.anvilName || "string" === typeof input.anvilName) &&
    (100 === input.type ||
      101 === input.type ||
      102 === input.type ||
      103 === input.type ||
      104 === input.type ||
      105 === input.type ||
      106 === input.type ||
      107 === input.type ||
      108 === input.type ||
      110 === input.type ||
      111 === input.type ||
      112 === input.type ||
      113 === input.type ||
      114 === input.type ||
      115 === input.type ||
      116 === input.type ||
      118 === input.type ||
      166 === input.type ||
      167 === input.type ||
      109 === input.type ||
      119 === input.type ||
      119020 === input.type ||
      1212 === input.type ||
      1213 === input.type ||
      1214 === input.type ||
      122 === input.type ||
      123 === input.type ||
      124 === input.type ||
      126 === input.type ||
      127 === input.type ||
      128 === input.type ||
      129 === input.type ||
      130 === input.type ||
      131 === input.type ||
      132 === input.type ||
      133 === input.type ||
      134 === input.type ||
      136 === input.type ||
      137 === input.type ||
      138 === input.type ||
      140 === input.type ||
      1404 === input.type ||
      141 === input.type ||
      142 === input.type ||
      143 === input.type ||
      144 === input.type ||
      145 === input.type ||
      146 === input.type ||
      147 === input.type ||
      148 === input.type ||
      149 === input.type ||
      150 === input.type ||
      151 === input.type ||
      152 === input.type ||
      153 === input.type ||
      156 === input.type ||
      157 === input.type ||
      158 === input.type ||
      159 === input.type ||
      1098 === input.type ||
      1099 === input.type ||
      135200 === input.type ||
      135210 === input.type ||
      135220 === input.type ||
      135221 === input.type ||
      135222 === input.type ||
      135223 === input.type ||
      135224 === input.type ||
      135225 === input.type ||
      135226 === input.type ||
      135227 === input.type ||
      135228 === input.type ||
      135229 === input.type ||
      135240 === input.type ||
      135250 === input.type ||
      135260 === input.type ||
      135270 === input.type ||
      135290 === input.type ||
      135291 === input.type ||
      135292 === input.type ||
      135293 === input.type ||
      135294 === input.type ||
      135295 === input.type ||
      135296 === input.type ||
      135297 === input.type ||
      135298 === input.type ||
      135300 === input.type ||
      135310 === input.type ||
      135320 === input.type ||
      135330 === input.type ||
      135340 === input.type ||
      135350 === input.type ||
      135360 === input.type ||
      135370 === input.type ||
      135380 === input.type ||
      135400 === input.type ||
      135401 === input.type ||
      135402 === input.type ||
      135403 === input.type ||
      180 === input.type ||
      161 === input.type ||
      162 === input.type ||
      163 === input.type ||
      164 === input.type ||
      165 === input.type ||
      194 === input.type ||
      195 === input.type ||
      196 === input.type ||
      197 === input.type) &&
    "object" === typeof input.req &&
    null !== input.req &&
    $io2(input.req) &&
    Array.isArray(input.props) &&
    input.props.every(
      (elem: any) =>
        Array.isArray(elem) &&
        elem.length === 2 &&
        (1 === elem[0] ||
          2 === elem[0] ||
          3 === elem[0] ||
          4 === elem[0] ||
          5 === elem[0] ||
          6 === elem[0] ||
          7 === elem[0] ||
          8 === elem[0] ||
          9 === elem[0] ||
          10 === elem[0] ||
          11 === elem[0] ||
          12 === elem[0] ||
          13 === elem[0] ||
          14 === elem[0] ||
          15 === elem[0] ||
          16 === elem[0] ||
          17 === elem[0] ||
          18 === elem[0] ||
          19 === elem[0] ||
          20 === elem[0] ||
          21 === elem[0] ||
          22 === elem[0] ||
          23 === elem[0] ||
          24 === elem[0] ||
          25 === elem[0] ||
          26 === elem[0] ||
          27 === elem[0] ||
          28 === elem[0] ||
          29 === elem[0] ||
          30 === elem[0] ||
          31 === elem[0] ||
          100 === elem[0] ||
          101 === elem[0] ||
          102 === elem[0] ||
          103 === elem[0] ||
          104 === elem[0] ||
          105 === elem[0] ||
          106 === elem[0] ||
          107 === elem[0] ||
          108 === elem[0] ||
          109 === elem[0] ||
          110 === elem[0] ||
          111 === elem[0] ||
          112 === elem[0] ||
          113 === elem[0] ||
          114 === elem[0] ||
          115 === elem[0] ||
          116 === elem[0] ||
          117 === elem[0] ||
          118 === elem[0] ||
          119 === elem[0] ||
          120 === elem[0] ||
          121 === elem[0] ||
          122 === elem[0] ||
          123 === elem[0] ||
          124 === elem[0] ||
          125 === elem[0] ||
          126 === elem[0] ||
          127 === elem[0] ||
          128 === elem[0] ||
          129 === elem[0] ||
          130 === elem[0] ||
          131 === elem[0] ||
          132 === elem[0] ||
          133 === elem[0] ||
          134 === elem[0] ||
          135 === elem[0] ||
          200 === elem[0] ||
          201 === elem[0] ||
          202 === elem[0] ||
          203 === elem[0] ||
          1100 === elem[0] ||
          1101 === elem[0] ||
          1102 === elem[0] ||
          1103 === elem[0] ||
          1104 === elem[0] ||
          1105 === elem[0] ||
          1106 === elem[0] ||
          1107 === elem[0] ||
          1108 === elem[0] ||
          1109 === elem[0] ||
          1110 === elem[0] ||
          1111 === elem[0] ||
          1112 === elem[0] ||
          1113 === elem[0] ||
          1114 === elem[0] ||
          1115 === elem[0] ||
          1116 === elem[0] ||
          1117 === elem[0] ||
          1118 === elem[0] ||
          1119 === elem[0] ||
          1120 === elem[0] ||
          1121 === elem[0] ||
          1122 === elem[0] ||
          1123 === elem[0] ||
          1124 === elem[0] ||
          1125 === elem[0] ||
          1126 === elem[0]) &&
        "number" === typeof elem[1]
    ) &&
    Array.isArray(input.options) &&
    input.options.every(
      (elem: any) =>
        Array.isArray(elem) &&
        elem.length === 2 &&
        (1 === elem[0] ||
          2 === elem[0] ||
          3 === elem[0] ||
          4 === elem[0] ||
          5 === elem[0] ||
          6 === elem[0] ||
          7 === elem[0] ||
          8 === elem[0] ||
          9 === elem[0] ||
          10 === elem[0] ||
          11 === elem[0] ||
          12 === elem[0] ||
          13 === elem[0] ||
          14 === elem[0] ||
          15 === elem[0] ||
          16 === elem[0] ||
          17 === elem[0] ||
          18 === elem[0] ||
          19 === elem[0] ||
          20 === elem[0] ||
          21 === elem[0] ||
          22 === elem[0] ||
          23 === elem[0] ||
          24 === elem[0] ||
          25 === elem[0] ||
          26 === elem[0] ||
          27 === elem[0] ||
          28 === elem[0] ||
          29 === elem[0] ||
          30 === elem[0] ||
          31 === elem[0] ||
          100 === elem[0] ||
          101 === elem[0] ||
          102 === elem[0] ||
          103 === elem[0] ||
          104 === elem[0] ||
          105 === elem[0] ||
          106 === elem[0] ||
          107 === elem[0] ||
          108 === elem[0] ||
          109 === elem[0] ||
          110 === elem[0] ||
          111 === elem[0] ||
          112 === elem[0] ||
          113 === elem[0] ||
          114 === elem[0] ||
          115 === elem[0] ||
          116 === elem[0] ||
          117 === elem[0] ||
          118 === elem[0] ||
          119 === elem[0] ||
          120 === elem[0] ||
          121 === elem[0] ||
          122 === elem[0] ||
          123 === elem[0] ||
          124 === elem[0] ||
          125 === elem[0] ||
          126 === elem[0] ||
          127 === elem[0] ||
          128 === elem[0] ||
          129 === elem[0] ||
          130 === elem[0] ||
          131 === elem[0] ||
          132 === elem[0] ||
          133 === elem[0] ||
          134 === elem[0] ||
          135 === elem[0] ||
          200 === elem[0] ||
          201 === elem[0] ||
          202 === elem[0] ||
          203 === elem[0] ||
          1100 === elem[0] ||
          1101 === elem[0] ||
          1102 === elem[0] ||
          1103 === elem[0] ||
          1104 === elem[0] ||
          1105 === elem[0] ||
          1106 === elem[0] ||
          1107 === elem[0] ||
          1108 === elem[0] ||
          1109 === elem[0] ||
          1110 === elem[0] ||
          1111 === elem[0] ||
          1112 === elem[0] ||
          1113 === elem[0] ||
          1114 === elem[0] ||
          1115 === elem[0] ||
          1116 === elem[0] ||
          1117 === elem[0] ||
          1118 === elem[0] ||
          1119 === elem[0] ||
          1120 === elem[0] ||
          1121 === elem[0] ||
          1122 === elem[0] ||
          1123 === elem[0] ||
          1124 === elem[0] ||
          1125 === elem[0] ||
          1126 === elem[0]) &&
        "object" === typeof elem[1] &&
        null !== elem[1] &&
        false === Array.isArray(elem[1]) &&
        $io3(elem[1])
    ) &&
    (undefined === input.tuc || "number" === typeof input.tuc) &&
    (undefined === input.up || "number" === typeof input.up) &&
    (undefined === input.fail || "number" === typeof input.fail) &&
    (undefined === input.hammer || "number" === typeof input.hammer) &&
    (undefined === input.maxStar || "number" === typeof input.maxStar) &&
    (undefined === input.star || "number" === typeof input.star) &&
    (undefined === input.amazing || "boolean" === typeof input.amazing) &&
    (undefined === input.karma || "number" === typeof input.karma) &&
    (undefined === input.canPot || "boolean" === typeof input.canPot) &&
    (undefined === input.grade ||
      0 === input.grade ||
      1 === input.grade ||
      2 === input.grade ||
      3 === input.grade ||
      4 === input.grade ||
      5 === input.grade) &&
    (undefined === input.pots ||
      (Array.isArray(input.pots) &&
        input.pots.every(
          (elem: any) =>
            undefined === elem ||
            ("object" === typeof elem && null !== elem && $io4(elem))
        ))) &&
    (undefined === input.addGrade ||
      0 === input.addGrade ||
      1 === input.addGrade ||
      2 === input.addGrade ||
      3 === input.addGrade ||
      4 === input.addGrade ||
      5 === input.addGrade) &&
    (undefined === input.addPots ||
      (Array.isArray(input.addPots) &&
        input.addPots.every(
          (elem: any) =>
            undefined === elem ||
            ("object" === typeof elem && null !== elem && $io4(elem))
        ))) &&
    "object" === typeof input.soulWeapon &&
    null !== input.soulWeapon &&
    false === Array.isArray(input.soulWeapon) &&
    $io5(input.soulWeapon);
  const $io1 = (input: any): boolean =>
    "number" === typeof input.id &&
    Array.isArray(input.origin) &&
    input.origin.length === 2 &&
    "number" === typeof input.origin[0] &&
    "number" === typeof input.origin[1];
  const $io2 = (input: any): boolean =>
    "number" === typeof input.level &&
    "number" === typeof input.str &&
    "number" === typeof input.luk &&
    "number" === typeof input.dex &&
    "number" === typeof input.int &&
    "number" === typeof input.job &&
    "number" === typeof input.specJob;
  const $io3 = (input: any): boolean =>
    (undefined === input.base || "number" === typeof input.base) &&
    (undefined === input.bonus || "number" === typeof input.bonus) &&
    (undefined === input.upgrade || "number" === typeof input.upgrade) &&
    (undefined === input.enchant || "number" === typeof input.enchant);
  const $io4 = (input: any): boolean =>
    "number" === typeof input.code &&
    "number" === typeof input.optionType &&
    "number" === typeof input.reqLevel &&
    "string" === typeof input.summary &&
    Array.isArray(input.option) &&
    input.option.every(
      (elem: any) =>
        Array.isArray(elem) &&
        elem.length === 2 &&
        (1 === elem[0] ||
          2 === elem[0] ||
          3 === elem[0] ||
          4 === elem[0] ||
          5 === elem[0] ||
          6 === elem[0] ||
          7 === elem[0] ||
          8 === elem[0] ||
          9 === elem[0] ||
          10 === elem[0] ||
          11 === elem[0] ||
          12 === elem[0] ||
          13 === elem[0] ||
          14 === elem[0] ||
          15 === elem[0] ||
          16 === elem[0] ||
          17 === elem[0] ||
          18 === elem[0] ||
          19 === elem[0] ||
          20 === elem[0] ||
          21 === elem[0] ||
          22 === elem[0] ||
          23 === elem[0] ||
          24 === elem[0] ||
          25 === elem[0] ||
          26 === elem[0] ||
          27 === elem[0] ||
          28 === elem[0] ||
          29 === elem[0] ||
          30 === elem[0] ||
          31 === elem[0] ||
          100 === elem[0] ||
          101 === elem[0] ||
          102 === elem[0] ||
          103 === elem[0] ||
          104 === elem[0] ||
          105 === elem[0] ||
          106 === elem[0] ||
          107 === elem[0] ||
          108 === elem[0] ||
          109 === elem[0] ||
          110 === elem[0] ||
          111 === elem[0] ||
          112 === elem[0] ||
          113 === elem[0] ||
          114 === elem[0] ||
          115 === elem[0] ||
          116 === elem[0] ||
          117 === elem[0] ||
          118 === elem[0] ||
          119 === elem[0] ||
          120 === elem[0] ||
          121 === elem[0] ||
          122 === elem[0] ||
          123 === elem[0] ||
          124 === elem[0] ||
          125 === elem[0] ||
          126 === elem[0] ||
          127 === elem[0] ||
          128 === elem[0] ||
          129 === elem[0] ||
          130 === elem[0] ||
          131 === elem[0] ||
          132 === elem[0] ||
          133 === elem[0] ||
          134 === elem[0] ||
          135 === elem[0] ||
          200 === elem[0] ||
          201 === elem[0] ||
          202 === elem[0] ||
          203 === elem[0] ||
          1100 === elem[0] ||
          1101 === elem[0] ||
          1102 === elem[0] ||
          1103 === elem[0] ||
          1104 === elem[0] ||
          1105 === elem[0] ||
          1106 === elem[0] ||
          1107 === elem[0] ||
          1108 === elem[0] ||
          1109 === elem[0] ||
          1110 === elem[0] ||
          1111 === elem[0] ||
          1112 === elem[0] ||
          1113 === elem[0] ||
          1114 === elem[0] ||
          1115 === elem[0] ||
          1116 === elem[0] ||
          1117 === elem[0] ||
          1118 === elem[0] ||
          1119 === elem[0] ||
          1120 === elem[0] ||
          1121 === elem[0] ||
          1122 === elem[0] ||
          1123 === elem[0] ||
          1124 === elem[0] ||
          1125 === elem[0] ||
          1126 === elem[0]) &&
        "number" === typeof elem[1]
    );
  const $io5 = (input: any): boolean =>
    (undefined === input.enchanted || "boolean" === typeof input.enchanted) &&
    (undefined === input.soul ||
      ("object" === typeof input.soul &&
        null !== input.soul &&
        $io6(input.soul))) &&
    (undefined === input.charge || "number" === typeof input.charge) &&
    (undefined === input.chargeOption ||
      (Array.isArray(input.chargeOption) &&
        input.chargeOption.every(
          (elem: any) =>
            Array.isArray(elem) &&
            elem.length === 2 &&
            (1 === elem[0] ||
              2 === elem[0] ||
              3 === elem[0] ||
              4 === elem[0] ||
              5 === elem[0] ||
              6 === elem[0] ||
              7 === elem[0] ||
              8 === elem[0] ||
              9 === elem[0] ||
              10 === elem[0] ||
              11 === elem[0] ||
              12 === elem[0] ||
              13 === elem[0] ||
              14 === elem[0] ||
              15 === elem[0] ||
              16 === elem[0] ||
              17 === elem[0] ||
              18 === elem[0] ||
              19 === elem[0] ||
              20 === elem[0] ||
              21 === elem[0] ||
              22 === elem[0] ||
              23 === elem[0] ||
              24 === elem[0] ||
              25 === elem[0] ||
              26 === elem[0] ||
              27 === elem[0] ||
              28 === elem[0] ||
              29 === elem[0] ||
              30 === elem[0] ||
              31 === elem[0] ||
              100 === elem[0] ||
              101 === elem[0] ||
              102 === elem[0] ||
              103 === elem[0] ||
              104 === elem[0] ||
              105 === elem[0] ||
              106 === elem[0] ||
              107 === elem[0] ||
              108 === elem[0] ||
              109 === elem[0] ||
              110 === elem[0] ||
              111 === elem[0] ||
              112 === elem[0] ||
              113 === elem[0] ||
              114 === elem[0] ||
              115 === elem[0] ||
              116 === elem[0] ||
              117 === elem[0] ||
              118 === elem[0] ||
              119 === elem[0] ||
              120 === elem[0] ||
              121 === elem[0] ||
              122 === elem[0] ||
              123 === elem[0] ||
              124 === elem[0] ||
              125 === elem[0] ||
              126 === elem[0] ||
              127 === elem[0] ||
              128 === elem[0] ||
              129 === elem[0] ||
              130 === elem[0] ||
              131 === elem[0] ||
              132 === elem[0] ||
              133 === elem[0] ||
              134 === elem[0] ||
              135 === elem[0] ||
              200 === elem[0] ||
              201 === elem[0] ||
              202 === elem[0] ||
              203 === elem[0] ||
              1100 === elem[0] ||
              1101 === elem[0] ||
              1102 === elem[0] ||
              1103 === elem[0] ||
              1104 === elem[0] ||
              1105 === elem[0] ||
              1106 === elem[0] ||
              1107 === elem[0] ||
              1108 === elem[0] ||
              1109 === elem[0] ||
              1110 === elem[0] ||
              1111 === elem[0] ||
              1112 === elem[0] ||
              1113 === elem[0] ||
              1114 === elem[0] ||
              1115 === elem[0] ||
              1116 === elem[0] ||
              1117 === elem[0] ||
              1118 === elem[0] ||
              1119 === elem[0] ||
              1120 === elem[0] ||
              1121 === elem[0] ||
              1122 === elem[0] ||
              1123 === elem[0] ||
              1124 === elem[0] ||
              1125 === elem[0] ||
              1126 === elem[0]) &&
            "number" === typeof elem[1]
        )));
  const $io6 = (input: any): boolean =>
    "string" === typeof input.name &&
    "string" === typeof input.skill &&
    input.option instanceof Map &&
    [...input.option].every(
      (elem: any) =>
        Array.isArray(elem) &&
        elem.length === 2 &&
        (1 === elem[0] ||
          2 === elem[0] ||
          3 === elem[0] ||
          4 === elem[0] ||
          5 === elem[0] ||
          6 === elem[0] ||
          7 === elem[0] ||
          8 === elem[0] ||
          9 === elem[0] ||
          10 === elem[0] ||
          11 === elem[0] ||
          12 === elem[0] ||
          13 === elem[0] ||
          14 === elem[0] ||
          15 === elem[0] ||
          16 === elem[0] ||
          17 === elem[0] ||
          18 === elem[0] ||
          19 === elem[0] ||
          20 === elem[0] ||
          21 === elem[0] ||
          22 === elem[0] ||
          23 === elem[0] ||
          24 === elem[0] ||
          25 === elem[0] ||
          26 === elem[0] ||
          27 === elem[0] ||
          28 === elem[0] ||
          29 === elem[0] ||
          30 === elem[0] ||
          31 === elem[0] ||
          100 === elem[0] ||
          101 === elem[0] ||
          102 === elem[0] ||
          103 === elem[0] ||
          104 === elem[0] ||
          105 === elem[0] ||
          106 === elem[0] ||
          107 === elem[0] ||
          108 === elem[0] ||
          109 === elem[0] ||
          110 === elem[0] ||
          111 === elem[0] ||
          112 === elem[0] ||
          113 === elem[0] ||
          114 === elem[0] ||
          115 === elem[0] ||
          116 === elem[0] ||
          117 === elem[0] ||
          118 === elem[0] ||
          119 === elem[0] ||
          120 === elem[0] ||
          121 === elem[0] ||
          122 === elem[0] ||
          123 === elem[0] ||
          124 === elem[0] ||
          125 === elem[0] ||
          126 === elem[0] ||
          127 === elem[0] ||
          128 === elem[0] ||
          129 === elem[0] ||
          130 === elem[0] ||
          131 === elem[0] ||
          132 === elem[0] ||
          133 === elem[0] ||
          134 === elem[0] ||
          135 === elem[0] ||
          200 === elem[0] ||
          201 === elem[0] ||
          202 === elem[0] ||
          203 === elem[0] ||
          1100 === elem[0] ||
          1101 === elem[0] ||
          1102 === elem[0] ||
          1103 === elem[0] ||
          1104 === elem[0] ||
          1105 === elem[0] ||
          1106 === elem[0] ||
          1107 === elem[0] ||
          1108 === elem[0] ||
          1109 === elem[0] ||
          1110 === elem[0] ||
          1111 === elem[0] ||
          1112 === elem[0] ||
          1113 === elem[0] ||
          1114 === elem[0] ||
          1115 === elem[0] ||
          1116 === elem[0] ||
          1117 === elem[0] ||
          1118 === elem[0] ||
          1119 === elem[0] ||
          1120 === elem[0] ||
          1121 === elem[0] ||
          1122 === elem[0] ||
          1123 === elem[0] ||
          1124 === elem[0] ||
          1125 === elem[0] ||
          1126 === elem[0]) &&
        "number" === typeof elem[1]
    ) &&
    "number" === typeof input.multiplier;
  return "object" === typeof input && null !== input && $io0(input);
  /* eslint-enable @typescript-eslint/no-explicit-any */
};
