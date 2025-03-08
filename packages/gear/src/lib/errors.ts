export const enum ErrorMessage {
  AddOption_InvalidAttackPowerGear = '공격력/마력 추가 옵션은 착용 가능 레벨 60 이상의 무기 장비에만 부여할 수 있습니다.',
  AddOption_UnknownLongSwordGear = '공격력/마력 추가 옵션을 부여할 수 없는 태도 장비입니다. (Please submit issue with the gear info)',
  AddOption_InvalidSpeedGear = '이동속도 추가 옵션은 무기가 아닌 장비에만 부여할 수 있습니다.',
  AddOption_InvalidJumpGear = '점프력 추가 옵션은 무기가 아닌 장비에만 부여할 수 있습니다.',
  AddOption_InvalidDamageGear = '데미지(%) 추가 옵션은 무기 장비에만 부여할 수 있습니다.',
  AddOption_InvalidBossDamageGear = '보스 공격 시 데미지 증가(%) 추가 옵션은 착용 가능 레벨 90 이상의 무기 장비에만 부여할 수 있습니다.',
  AddOption_InvalidAllStatGear = '올스탯(%) 추가 옵션은 착용 가능 레벨 70 이상 또는 무기 장비에만 부여할 수 있습니다.',
  AddOption_InvalidReqLevelDecreaseGear = '착용 레벨 감소 옵션은 착용 가능 레벨 1 이상의 장비에만 부여할 수 있습니다.',

  Upgrade_InvalidGoldenHammerGear = '황금 망치를 적용할 수 없는 상태의 장비입니다.',
  Upgrade_InvalidFailScrollGear = '주문서 실패를 적용할 수 없는 상태의 장비입니다.',
  Upgrade_InvalidResileScrollGear = '업그레이드 가능 횟수를 복구할 수 없는 상태의 장비입니다.',
  Upgrade_InvalidResetScrollGear = '주문서 강화를 초기화할 수 없는 장비입니다.',
  Upgrade_InvalidApplyScrollGear = '주문서를 적용할 수 없는 상태의 장비입니다.',
  SpellTrace_InvalidSpellTrace = '주문의 흔적을 장비에 적용할 수 없습니다.',
  SpellTrace_InvalidGearType = '주문의 흔적을 적용할 수 없는 장비 분류입니다.',

  Starforce_InvalidStarforceGear = '스타포스 강화를 적용할 수 없는 상태의 장비입니다.',
  Starforce_InvalidReqLevelGear = '장비의 착용 가능 레벨은 0 이상이어야 합니다.',
  StarScroll_InvalidStarScrollGear = '놀라운 장비 강화 주문서를 적용할 수 없는 상태의 장비입니다.',
  Starforce_InvalidResetGear = '스타포스 강화를 초기화할 수 없는 장비입니다.',

  Potential_InvalidPotentialGear = '잠재능력을 적용할 수 없는 상태의 장비입니다.',
  Potential_InvalidPotentialOptions = '잠재옵션 개수는 1개에서 3개 사이여야 합니다.',
  Potential_InvalidPotentialGrade = '잠재능력 등급을 Normal로 설정할 수 없습니다. (잠재능력을 초기화하려면 resetPotential을 사용하세요.)',
  Potential_InvalidAdditionalPotentialGear = '에디셔널 잠재능력을 적용할 수 없는 상태의 장비입니다.',
  Potential_InvalidAdditionalPotentialOptions = '에디셔널 잠재옵션 개수는 1개에서 3개 사이여야 합니다.',
  Potential_InvalidAdditionalPotentialGrade = '에디셔널 잠재능력 등급을 Normal로 설정할 수 없습니다. (에디셔널 잠재능력을 초기화하려면 resetAdditionalPotential을 사용하세요.)',

  Soul_SetSoulUnenchanted = '소울웨폰 상태의 장비에만 소울을 장착할 수 있습니다.',
  Soul_SetChargeUnenchanted = '소울웨폰 상태의 장비만 소울 충전량을 변경할 수 있습니다.',
  Soul_InvalidSoulCharge = '소울 충전량은 0 이상 1000 이하의 값으로만 변경할 수 있습니다.',
  Soul_AlreadyEnchanted = '소울웨폰은 중복해서 적용할 수 없습니다.',

  Exceptional_InvalidEnhanceGear = '익셉셔널 강화를 적용할 수 없는 상태의 장비입니다.',
  Exceptional_InvalidResetGear = '익셉셔널 강화를 초기화할 수 없는 장비입니다.',
}
