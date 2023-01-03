import { Gear, GearPropType, GearType, PotentialGrade } from "..";

test("test getPropValue()", () => {
  const gear = new Gear();
  gear.props.set(GearPropType.exceptUpgrade, 2);
  expect(gear.getPropValue(GearPropType.exceptUpgrade)).toBe(2);
  expect(gear.getPropValue(GearPropType.blockGoldHammer)).toBe(0);
});

test("test getBooleanValue()", () => {
  const gear = new Gear();
  gear.props.set(GearPropType.blockGoldHammer, 0);
  gear.props.set(GearPropType.noPotential, 1);
  gear.props.set(GearPropType.tradeBlock, 2);
  expect(gear.getBooleanValue(GearPropType.noPotential)).toBe(true);
  expect(gear.getBooleanValue(GearPropType.tradeBlock)).toBe(true);
  expect(gear.getBooleanValue(GearPropType.blockGoldHammer)).toBe(false);
  expect(gear.getBooleanValue(GearPropType.exceptUpgrade)).toBe(false);
});

test("test createFromID()", () => {
  // let gear: Gear;
  // // 앱솔랩스 아처슈즈
  // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // gear = Gear.createFromID(1073033)!;
  // expect(gear).not.toBeUndefined();
  // expect(gear.itemID).toBe(1073033);
  // expect(gear.name).toBe("앱솔랩스 아처슈즈");
  // expect(gear.type).toBe(GearType.shoes);
  // expect(gear.req.level).toBe(160);
  // expect(gear.totalUpgradeCount).toBe(7);
  // expect(gear.getPropValue(GearPropType.reqLevel)).toBe(0);
  // expect(gear.getBooleanValue(GearPropType.equipTradeBlock)).toBe(true);
  // expect(gear.maxStar).toBe(25);
  // expect(gear.star).toBe(0);
  // // 아케인셰이드 튜너 (PC방)
  // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // gear = Gear.createFromID(1213030)!;
  // expect(gear).not.toBeUndefined();
  // expect(gear.name).toBe("아케인셰이드 튜너");
  // expect(gear.req.level).toBe(200);
  // expect(gear.req.job).toBe(1);
  // expect(gear.req.str).toBe(600);
  // expect(gear.req.int).toBe(0);
  // expect(gear.upgradeCount).toBe(0);
  // expect(gear.grade).toBe(PotentialGrade.legendary);
  // expect(gear.potentials.length).toBe(3);
  // expect(gear.potentials[0].convertSummary).toBe("보스 몬스터 공격 시 데미지 : +35%");
  // expect(gear.potentials[1].convertSummary).toBe("데미지 : +12%");
  // expect(gear.potentials[2].convertSummary).toBe("크리티컬 확률 : +12%");
});

test("test getMaxStar()", () => {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  // expect(Gear.createFromID(1022226)!.maxStar).toBe(5); // 사이클롭스 아이 Lv.3
  // expect(Gear.createFromID(1002408)!.maxStar).toBe(8); // 그린 아르나햇
  // expect(Gear.createFromID(1342041)!.maxStar).toBe(15); // 피어리스 코션
  // expect(Gear.createFromID(1382246)!.maxStar).toBe(20); // 로얄 반 레온 스태프
  // expect(Gear.createFromID(1432167)!.maxStar).toBe(25); // 파프니르 브류나크
  // expect(Gear.createFromID(1005980)!.maxStar).toBe(25); // 에테르넬 나이트헬름
  // expect(Gear.createFromID(1652003)!.maxStar).toBe(0); // 골드 트랜지스터
  // expect(Gear.createFromID(1114303)!.maxStar).toBe(0); // 코스모스 링
  // expect(Gear.createFromID(1114227)!.maxStar).toBe(0); // 오닉스 링 "완성"
  // expect(Gear.createFromID(1114307)!.maxStar).toBe(0); // 테네브리스 원정대 반지
  // expect(Gear.createFromID(1114305)!.maxStar).toBe(0); // 카오스 링
  // expect(Gear.createFromID(1114324)!.maxStar).toBe(0); // 이터널 플레임 링
  // expect(Gear.createFromID(1162025)!.maxStar).toBe(0); // 핑크빛 성배
  // expect(Gear.createFromID(1142879)!.maxStar).toBe(0); // 우르스 격파왕
  // expect(Gear.createFromID(1182200)!.maxStar).toBe(0); // 칠요의 뱃지
  // expect(Gear.createFromID(1942004)!.maxStar).toBe(0); // 어비스 마스크
  // expect(Gear.createFromID(1352972)!.maxStar).toBe(0); // 에레브의 광휘
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
});

test("test diff()", () => {
  const gear = new Gear();
  gear.option(GearPropType.incSTR).base = 10;
  gear.option(GearPropType.incSTR).bonus = 24;
  gear.option(GearPropType.incSTR).enchant = 15;
  gear.option(GearPropType.incMHP).bonus = 2400;
  gear.option(GearPropType.incPDD).upgrade = 56;
  expect(gear.diff).toBeCloseTo(24 + 15 + 24 + 5);
});

test("test isLeftWeapon()", () => {
  expect(Gear.isLeftWeapon(GearType.tuner)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.soulShooter)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.desperado)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.energySword)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.espLimiter)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.chain2)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.magicGauntlet)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.handFan)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.ohSword)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.ohAxe)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.ohBlunt)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.dagger)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.cane)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.wand)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.staff)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.breathShooter)).toBe(true);

  expect(Gear.isLeftWeapon(GearType.thSword)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.crossbow)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.swordZL)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.novaMarrow)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.cap)).toBe(false);
});



test("test isDoubleHandWeapon()", () => {
  expect(Gear.isDoubleHandWeapon(GearType.thSword)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.thAxe)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.thBlunt)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.spear)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.polearm)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.bow)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.crossbow)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.throwingGlove)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.knuckle)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.gun)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.dualBow)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.handCannon)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.swordZB)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.swordZL)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.GauntletBuster)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.ancientBow)).toBe(true);

  expect(Gear.isDoubleHandWeapon(GearType.tuner)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.chain2)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.dagger)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.novaMarrow)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.cap)).toBe(false);
});

test("test isSubWeapon()", () => {
  expect(Gear.isSubWeapon(GearType.shield)).toBe(true);
  expect(Gear.isSubWeapon(GearType.soulShield)).toBe(true);
  expect(Gear.isSubWeapon(GearType.demonShield)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicArrow)).toBe(true);
  expect(Gear.isSubWeapon(GearType.card)).toBe(true);
  expect(Gear.isSubWeapon(GearType.heroMedal)).toBe(true);
  expect(Gear.isSubWeapon(GearType.rosario)).toBe(true);
  expect(Gear.isSubWeapon(GearType.chain)).toBe(true);
  expect(Gear.isSubWeapon(GearType.book1)).toBe(true);
  expect(Gear.isSubWeapon(GearType.book2)).toBe(true);
  expect(Gear.isSubWeapon(GearType.book3)).toBe(true);
  expect(Gear.isSubWeapon(GearType.bowMasterFeather)).toBe(true);
  expect(Gear.isSubWeapon(GearType.crossBowThimble)).toBe(true);
  expect(Gear.isSubWeapon(GearType.shadowerSheath)).toBe(true);
  expect(Gear.isSubWeapon(GearType.nightLordPoutch)).toBe(true);
  expect(Gear.isSubWeapon(GearType.orb)).toBe(true);
  expect(Gear.isSubWeapon(GearType.novaMarrow)).toBe(true);
  expect(Gear.isSubWeapon(GearType.soulBangle)).toBe(true);
  expect(Gear.isSubWeapon(GearType.mailin)).toBe(true);
  expect(Gear.isSubWeapon(GearType.viperWristband)).toBe(true);
  expect(Gear.isSubWeapon(GearType.captainSight)).toBe(true);
  expect(Gear.isSubWeapon(GearType.cannonGunPowder)).toBe(true);
  expect(Gear.isSubWeapon(GearType.aranPendulum)).toBe(true);
  expect(Gear.isSubWeapon(GearType.evanPaper)).toBe(true);
  expect(Gear.isSubWeapon(GearType.battlemageBall)).toBe(true);
  expect(Gear.isSubWeapon(GearType.wildHunterArrowHead)).toBe(true);
  expect(Gear.isSubWeapon(GearType.cygnusGem)).toBe(true);
  expect(Gear.isSubWeapon(GearType.cannonGunPowder2)).toBe(true);
  expect(Gear.isSubWeapon(GearType.controller)).toBe(true);
  expect(Gear.isSubWeapon(GearType.foxPearl)).toBe(true);
  expect(Gear.isSubWeapon(GearType.chess)).toBe(true);
  expect(Gear.isSubWeapon(GearType.transmitter)).toBe(true);
  expect(Gear.isSubWeapon(GearType.ExplosivePill)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicWing)).toBe(true);
  expect(Gear.isSubWeapon(GearType.pathOfAbyss)).toBe(true);
  expect(Gear.isSubWeapon(GearType.relic)).toBe(true);
  expect(Gear.isSubWeapon(GearType.fanTassel)).toBe(true);
  expect(Gear.isSubWeapon(GearType.bracelet)).toBe(true);
  expect(Gear.isSubWeapon(GearType.weaponBelt)).toBe(true);
  expect(Gear.isSubWeapon(GearType.ornament)).toBe(true);
  expect(Gear.isSubWeapon(GearType.katara)).toBe(true);

  expect(Gear.isSubWeapon(GearType.tuner)).toBe(false);
  expect(Gear.isSubWeapon(GearType.pickaxe)).toBe(false);
  expect(Gear.isSubWeapon(GearType.cape)).toBe(false);
});

test("test isArmor()", () => {
  expect(Gear.isArmor(GearType.cap)).toBe(true);
  expect(Gear.isArmor(GearType.faceAccessory)).toBe(false);
  expect(Gear.isArmor(GearType.eyeAccessory)).toBe(false);
  expect(Gear.isArmor(GearType.earrings)).toBe(false);
  expect(Gear.isArmor(GearType.coat)).toBe(true);
  expect(Gear.isArmor(GearType.longcoat)).toBe(true);
  expect(Gear.isArmor(GearType.pants)).toBe(true);
  expect(Gear.isArmor(GearType.shoes)).toBe(true);
  expect(Gear.isArmor(GearType.glove)).toBe(true);
  expect(Gear.isArmor(GearType.cape)).toBe(true);
  expect(Gear.isArmor(GearType.ring)).toBe(false);
  expect(Gear.isArmor(GearType.pendant)).toBe(false);
  expect(Gear.isArmor(GearType.belt)).toBe(false);
  expect(Gear.isArmor(GearType.medal)).toBe(false);
  expect(Gear.isArmor(GearType.shoulderPad)).toBe(false);
  expect(Gear.isArmor(GearType.pocket)).toBe(false);
  expect(Gear.isArmor(GearType.badge)).toBe(false);
  expect(Gear.isArmor(GearType.shiningRod)).toBe(false);
});

test("test isAccessory()", () => {
  expect(Gear.isAccessory(GearType.cap)).toBe(false);
  expect(Gear.isAccessory(GearType.faceAccessory)).toBe(true);
  expect(Gear.isAccessory(GearType.eyeAccessory)).toBe(true);
  expect(Gear.isAccessory(GearType.earrings)).toBe(true);
  expect(Gear.isAccessory(GearType.coat)).toBe(false);
  expect(Gear.isAccessory(GearType.longcoat)).toBe(false);
  expect(Gear.isAccessory(GearType.pants)).toBe(false);
  expect(Gear.isAccessory(GearType.shoes)).toBe(false);
  expect(Gear.isAccessory(GearType.glove)).toBe(false);
  expect(Gear.isAccessory(GearType.cape)).toBe(false);
  expect(Gear.isAccessory(GearType.ring)).toBe(true);
  expect(Gear.isAccessory(GearType.pendant)).toBe(true);
  expect(Gear.isAccessory(GearType.belt)).toBe(true);
  expect(Gear.isAccessory(GearType.medal)).toBe(false);
  expect(Gear.isAccessory(GearType.shoulderPad)).toBe(true);
  expect(Gear.isAccessory(GearType.pocket)).toBe(false);
  expect(Gear.isAccessory(GearType.badge)).toBe(false);
  expect(Gear.isAccessory(GearType.shiningRod)).toBe(false);
});

test("test getGearType()", () => {
  expect(Gear.getGearType(1213017)).toBe(GearType.tuner);
  expect(Gear.getGearType(1222109)).toBe(GearType.soulShooter);
  expect(Gear.getGearType(1232109)).toBe(GearType.desperado);
  expect(Gear.getGearType(1242116)).toBe(GearType.energySword);
  expect(Gear.getGearType(1262017)).toBe(GearType.espLimiter);
  expect(Gear.getGearType(1272016)).toBe(GearType.chain2);
  expect(Gear.getGearType(1282016)).toBe(GearType.magicGauntlet);
  expect(Gear.getGearType(1292017)).toBe(GearType.handFan);
  expect(Gear.getGearType(1302333)).toBe(GearType.ohSword);
  expect(Gear.getGearType(1312199)).toBe(GearType.ohAxe);
  expect(Gear.getGearType(1322250)).toBe(GearType.ohBlunt);
  expect(Gear.getGearType(1332274)).toBe(GearType.dagger);
  expect(Gear.getGearType(1342101)).toBe(GearType.katara);
  expect(Gear.getGearType(1362135)).toBe(GearType.cane);
  expect(Gear.getGearType(1372222)).toBe(GearType.wand);
  expect(Gear.getGearType(1382259)).toBe(GearType.staff);
  expect(Gear.getGearType(1402251)).toBe(GearType.thSword);
  expect(Gear.getGearType(1412177)).toBe(GearType.thAxe);
  expect(Gear.getGearType(1422184)).toBe(GearType.thBlunt);
  expect(Gear.getGearType(1432214)).toBe(GearType.spear);
  expect(Gear.getGearType(1442268)).toBe(GearType.polearm);
  expect(Gear.getGearType(1452252)).toBe(GearType.bow);
  expect(Gear.getGearType(1462239)).toBe(GearType.crossbow);
  expect(Gear.getGearType(1472261)).toBe(GearType.throwingGlove);
  expect(Gear.getGearType(1482216)).toBe(GearType.knuckle);
  expect(Gear.getGearType(1492231)).toBe(GearType.gun);
  expect(Gear.getGearType(1522138)).toBe(GearType.dualBow);
  expect(Gear.getGearType(1532144)).toBe(GearType.handCannon);
  expect(Gear.getGearType(1582017)).toBe(GearType.GauntletBuster);
  expect(Gear.getGearType(1592019)).toBe(GearType.ancientBow);
  expect(Gear.getGearType(1214017)).toBe(GearType.breathShooter);
  expect(Gear.getGearType(1404013)).toBe(GearType.chakram);
});
