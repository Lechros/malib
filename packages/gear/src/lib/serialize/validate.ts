import { GearLike } from "./interface";

//$ pnpm typia generate --input packages/gear/src/lib/serialize/typia --output packages/gear/src/lib/serialize --project tsconfig.typia.json

/**
 * 객체가 `GearLike` 형식인지 여부를 확인합니다.
 * @param input 확인할 객체.
 * @returns 입력이 `GearLike` 형식일 경우 `true`; 아닐 경우 `false`.
 */
export const isGearLike = (input: unknown): input is GearLike => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const $io0 = (input: any): boolean =>
    "number" === typeof input.id &&
    "string" === typeof input.n &&
    (undefined === input.d || "string" === typeof input.d) &&
    "object" === typeof input.i &&
    null !== input.i &&
    $io1(input.i) &&
    (undefined === input.i2 ||
      ("object" === typeof input.i2 && null !== input.i2 && $io1(input.i2))) &&
    (undefined === input.n2 || "string" === typeof input.n2) &&
    (100 === input.t ||
      101 === input.t ||
      102 === input.t ||
      103 === input.t ||
      104 === input.t ||
      105 === input.t ||
      106 === input.t ||
      107 === input.t ||
      108 === input.t ||
      110 === input.t ||
      111 === input.t ||
      112 === input.t ||
      113 === input.t ||
      114 === input.t ||
      115 === input.t ||
      116 === input.t ||
      118 === input.t ||
      166 === input.t ||
      167 === input.t ||
      109 === input.t ||
      119 === input.t ||
      119020 === input.t ||
      1212 === input.t ||
      1213 === input.t ||
      1214 === input.t ||
      122 === input.t ||
      123 === input.t ||
      124 === input.t ||
      126 === input.t ||
      127 === input.t ||
      128 === input.t ||
      129 === input.t ||
      130 === input.t ||
      131 === input.t ||
      132 === input.t ||
      133 === input.t ||
      134 === input.t ||
      136 === input.t ||
      137 === input.t ||
      138 === input.t ||
      140 === input.t ||
      1404 === input.t ||
      141 === input.t ||
      142 === input.t ||
      143 === input.t ||
      144 === input.t ||
      145 === input.t ||
      146 === input.t ||
      147 === input.t ||
      148 === input.t ||
      149 === input.t ||
      150 === input.t ||
      151 === input.t ||
      152 === input.t ||
      153 === input.t ||
      156 === input.t ||
      157 === input.t ||
      158 === input.t ||
      159 === input.t ||
      1098 === input.t ||
      1099 === input.t ||
      135200 === input.t ||
      135210 === input.t ||
      135220 === input.t ||
      135221 === input.t ||
      135222 === input.t ||
      135223 === input.t ||
      135224 === input.t ||
      135225 === input.t ||
      135226 === input.t ||
      135227 === input.t ||
      135228 === input.t ||
      135229 === input.t ||
      135240 === input.t ||
      135250 === input.t ||
      135260 === input.t ||
      135270 === input.t ||
      135290 === input.t ||
      135291 === input.t ||
      135292 === input.t ||
      135293 === input.t ||
      135294 === input.t ||
      135295 === input.t ||
      135296 === input.t ||
      135297 === input.t ||
      135298 === input.t ||
      135300 === input.t ||
      135310 === input.t ||
      135320 === input.t ||
      135330 === input.t ||
      135340 === input.t ||
      135350 === input.t ||
      135360 === input.t ||
      135370 === input.t ||
      135380 === input.t ||
      135400 === input.t ||
      135401 === input.t ||
      135402 === input.t ||
      135403 === input.t ||
      180 === input.t ||
      161 === input.t ||
      162 === input.t ||
      163 === input.t ||
      164 === input.t ||
      165 === input.t ||
      194 === input.t ||
      195 === input.t ||
      196 === input.t ||
      197 === input.t) &&
    "object" === typeof input.r &&
    null !== input.r &&
    $io2(input.r) &&
    Array.isArray(input.pr) &&
    input.pr.every(
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
    Array.isArray(input.o) &&
    input.o.every(
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
        Array.isArray(elem[1]) &&
        elem[1].length === 4 &&
        "number" === typeof elem[1][0] &&
        "number" === typeof elem[1][1] &&
        "number" === typeof elem[1][2] &&
        "number" === typeof elem[1][3]
    ) &&
    (undefined === input.c || "number" === typeof input.c) &&
    (undefined === input.up || "number" === typeof input.up) &&
    (undefined === input.f || "number" === typeof input.f) &&
    (undefined === input.h || "number" === typeof input.h) &&
    (undefined === input.m || "number" === typeof input.m) &&
    (undefined === input.s || "number" === typeof input.s) &&
    (undefined === input.a || "boolean" === typeof input.a) &&
    (undefined === input.k || "number" === typeof input.k) &&
    (undefined === input.cp || "boolean" === typeof input.cp) &&
    (undefined === input.g ||
      0 === input.g ||
      1 === input.g ||
      2 === input.g ||
      3 === input.g ||
      4 === input.g ||
      5 === input.g) &&
    (undefined === input.p ||
      (Array.isArray(input.p) &&
        input.p.every(
          (elem: any) =>
            null === elem ||
            ("object" === typeof elem && null !== elem && $io3(elem))
        ))) &&
    (undefined === input.g2 ||
      0 === input.g2 ||
      1 === input.g2 ||
      2 === input.g2 ||
      3 === input.g2 ||
      4 === input.g2 ||
      5 === input.g2) &&
    (undefined === input.p2 ||
      (Array.isArray(input.p2) &&
        input.p2.every(
          (elem: any) =>
            null === elem ||
            ("object" === typeof elem && null !== elem && $io3(elem))
        ))) &&
    (undefined === input.w ||
      ("object" === typeof input.w &&
        null !== input.w &&
        false === Array.isArray(input.w) &&
        $io4(input.w)));
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
    "number" === typeof input.c &&
    "number" === typeof input.t &&
    "number" === typeof input.l &&
    "string" === typeof input.s &&
    Array.isArray(input.o) &&
    input.o.every(
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
  const $io4 = (input: any): boolean =>
    (undefined === input.e || "boolean" === typeof input.e) &&
    (undefined === input.s ||
      ("object" === typeof input.s && null !== input.s && $io5(input.s))) &&
    (undefined === input.c || "number" === typeof input.c) &&
    (undefined === input.o ||
      (Array.isArray(input.o) &&
        input.o.every(
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
  const $io5 = (input: any): boolean =>
    "string" === typeof input.n &&
    "string" === typeof input.s &&
    Array.isArray(input.o) &&
    input.o.every(
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
    "number" === typeof input.m;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return "object" === typeof input && null !== input && $io0(input);
};
