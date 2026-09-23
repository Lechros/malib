import { ErrorCode } from './codes';
import type { ErrorLanguage } from './language';

/**
 * 오류 코드가 요구하는 추가 컨텍스트입니다.
 */
export interface ErrorContextFields {
  [ErrorCode.SpellTrace_CreateScroll_UnsupportedSpellTraceType]: {
    type: string;
  };
  [ErrorCode.SpellTrace_CreateScroll_UnsupportedSpellTraceRate]: {
    rate: number;
  };
  [ErrorCode.SpellTrace_CreateScroll_UnsupportedTypeRateCombination]: {
    type: string;
    rate: number;
  };
  [ErrorCode.SoulWeapon_SetPotential_OptionCountNotThree]: {
    'options.length': number;
  };
}

/**
 * 각 언어와 에러 코드에 따른 에러 메시지를 정의합니다.
 *
 * 사용자에게 표시되는 완결된 문장으로 작성합니다.
 * 실패 원인을 간결하게 설명하며, 의미가 명확하면 불가능한 동작을 반복하지 않습니다.
 * 구체적인 원인이 없는 경우에는 대상과 수행할 수 없는 동작만 설명합니다.
 * 함수명과 내부 구현 용어, 해결 방법에 대한 지시는 포함하지 않습니다.
 * `{type}`과 `{options.length}`는 context의 값으로, `{gear.req.level}`은 중첩 속성 값으로 치환합니다.
 * 객체와 배열은 JSON.stringify, 나머지는 String으로 변환합니다.
 * 경로가 없으면 자리표시자를 유지하며, 존재하는 undefined 값은 문자열로 표시합니다.
 * 변환이 실패하거나 JSON 직렬화 결과가 undefined이면 해당 자리표시자를 유지합니다.
 */
export const errorMessages = {
  ko: {
    [ErrorCode.DEFAULT]: '알 수 없는 오류입니다.',
    [ErrorCode.AddOption_Apply_NotSupported]:
      '아이템이 추가옵션 부여를 지원하지 않습니다.',
    [ErrorCode.AddOption_Apply_MaxCountOf4Reached]:
      '추가옵션은 최대 4개까지 부여할 수 있습니다.',
    [ErrorCode.AddOption_Reset_NotSupported]:
      '아이템이 추가옵션 초기화를 지원하지 않습니다.',
    [ErrorCode.AddOption_Calculate_AttackPowerRequiresWeaponOrReqLevelAtLeast60]:
      '무기가 아닌 착용 레벨이 60 미만인 아이템에는 공격력 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_MagicPowerRequiresWeaponOrReqLevelAtLeast60]:
      '무기가 아닌 착용 레벨이 60 미만인 아이템에는 마력 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_UnknownLongSwordAttackPower]:
      '태도의 공격력에 대응하는 추가옵션 데이터가 없습니다.',
    [ErrorCode.AddOption_Calculate_SpeedRequiresNonWeapon]:
      '무기에는 이동속도 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_JumpRequiresNonWeapon]:
      '무기에는 점프력 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_DamageRequiresWeapon]:
      '무기가 아닌 아이템에는 데미지% 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_BossDamageRequiresWeapon]:
      '무기가 아닌 아이템에는 보스 몬스터 데미지% 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_BossDamageReqLevelBelow90]:
      '착용 레벨이 90 미만인 아이템에는 보스 몬스터 데미지% 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_AllStatRequiresWeaponOrReqLevelAtLeast70]:
      '무기가 아닌 착용 레벨이 70 미만인 아이템에는 올스탯% 추가옵션을 부여할 수 없습니다.',
    [ErrorCode.AddOption_Calculate_ReqLevelDecreaseRequiresPositiveReqLevel]:
      '착용 레벨이 0 이하인 아이템에는 착용 레벨 감소 추가옵션을 부여할 수 없습니다.',

    [ErrorCode.Upgrade_ApplyScroll_NotSupported]:
      '아이템이 주문서 강화를 지원하지 않습니다.',
    [ErrorCode.Upgrade_ApplyScroll_NoRemainingUpgradeCount]:
      '아이템에 남은 주문서 강화 횟수가 없습니다.',
    [ErrorCode.Upgrade_FailScroll_NotSupported]:
      '아이템이 주문서 강화 실패 적용을 지원하지 않습니다.',
    [ErrorCode.Upgrade_FailScroll_NoRemainingUpgradeCount]:
      '아이템에 남은 주문서 강화 횟수가 없습니다.',
    [ErrorCode.Upgrade_ResileScroll_NotSupported]:
      '아이템이 주문서 강화 횟수 복구를 지원하지 않습니다.',
    [ErrorCode.Upgrade_ResileScroll_NoResilienceCount]:
      '아이템에 복구할 주문서 강화 횟수가 없습니다.',
    [ErrorCode.Upgrade_Reset_NotSupported]:
      '아이템이 주문서 강화 초기화를 지원하지 않습니다.',
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedGearType]:
      '아이템이 주문의 흔적 강화를 지원하지 않습니다.',
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedSpellTraceType]:
      '아이템의 주문의 흔적 강화에 {type} 주문서가 없습니다.',
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedSpellTraceRate]:
      '아이템의 주문의 흔적 강화에 성공률 {rate}%인 주문서가 없습니다.',
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedTypeRateCombination]:
      '아이템의 주문의 흔적 강화에 {rate}% {type} 주문서가 없습니다.',

    [ErrorCode.Starforce_Apply_NotSupported]:
      '아이템이 스타포스 강화를 지원하지 않습니다.',
    [ErrorCode.Starforce_Apply_Fixed]:
      '아이템의 스타포스 강화 단계가 고정되어 있습니다.',
    [ErrorCode.Starforce_Apply_MaxStarReached]:
      '아이템의 최대 스타포스 강화 단계에 도달했습니다.',
    [ErrorCode.Starforce_Apply_AbsoluteMaxStarReached]:
      '스타포스 강화의 최대 허용 단계에 도달했습니다.',
    [ErrorCode.Starforce_Apply_SuperiorMaxStarReached]:
      '슈페리얼 아이템의 최대 스타포스 강화 단계에 도달했습니다.',
    [ErrorCode.Starforce_Calculate_UnsupportedReqLevel]:
      '착용 레벨이 {gear.req.level}인 아이템은 스타포스 강화를 지원하지 않습니다.',
    [ErrorCode.Starforce_Reset_NotSupported]:
      '아이템이 스타포스 강화 초기화를 지원하지 않습니다.',
    [ErrorCode.Starforce_Reset_Fixed]:
      '아이템의 스타포스 강화 단계가 고정되어 있어 초기화할 수 없습니다.',
    [ErrorCode.Starforce_Recalculate_NotSupported]:
      '아이템이 스타포스 강화 능력치 재계산을 지원하지 않습니다.',
    [ErrorCode.Starforce_Recalculate_StarScrollApplied]:
      '아이템에 놀라운 장비 강화 주문서가 적용되어 있어 스타포스 강화 능력치를 다시 계산할 수 없습니다.',
    [ErrorCode.StarScroll_Apply_NotSupported]:
      '아이템이 놀라운 장비 강화 주문서를 지원하지 않습니다.',
    [ErrorCode.StarScroll_Apply_Fixed]:
      '아이템의 스타포스 강화 단계가 고정되어 있어 놀라운 장비 강화 주문서를 사용할 수 없습니다.',
    [ErrorCode.StarScroll_Apply_SuperiorNotSupported]:
      '슈페리얼 아이템은 놀라운 장비 강화 주문서 사용을 지원하지 않습니다.',
    [ErrorCode.StarScroll_Apply_ReqLevelAbove150]:
      '아이템의 착용 레벨이 150을 초과하여 놀라운 장비 강화 주문서를 사용할 수 없습니다.',
    [ErrorCode.StarScroll_Apply_MaxStarReached]:
      '아이템의 최대 강화 단계에 도달하여 놀라운 장비 강화 주문서를 사용할 수 없습니다.',
    [ErrorCode.StarScroll_Apply_AbsoluteMaxStarReached]:
      '놀라운 장비 강화 주문서의 최대 강화 단계인 15성에 도달했습니다.',

    [ErrorCode.Potential_Set_NotSupported]:
      '아이템이 잠재능력 설정을 지원하지 않습니다.',
    [ErrorCode.Potential_Set_Fixed]:
      '아이템이 잠재능력 재설정을 지원하지 않습니다.',
    [ErrorCode.Potential_Set_NormalGradeNotAllowed]:
      '잠재능력을 Normal 등급으로 설정할 수 없습니다.',
    [ErrorCode.Potential_Set_OptionCountOutOfRange]:
      '잠재능력 옵션은 1~3개로 설정해야 합니다.',
    [ErrorCode.Potential_Reset_NotSupported]:
      '아이템이 잠재능력 초기화를 지원하지 않습니다.',
    [ErrorCode.AdditionalPotential_Set_NotSupported]:
      '아이템이 에디셔널 잠재능력 설정을 지원하지 않습니다.',
    [ErrorCode.AdditionalPotential_Set_Fixed]:
      '아이템이 에디셔널 잠재능력 재설정을 지원하지 않습니다.',
    [ErrorCode.AdditionalPotential_Set_NormalGradeNotAllowed]:
      '에디셔널 잠재능력을 Normal 등급으로 설정할 수 없습니다.',
    [ErrorCode.AdditionalPotential_Set_OptionCountOutOfRange]:
      '에디셔널 잠재능력 옵션은 1~3개로 설정해야 합니다.',
    [ErrorCode.AdditionalPotential_Reset_NotSupported]:
      '아이템이 에디셔널 잠재능력 초기화를 지원하지 않습니다.',

    [ErrorCode.SoulWeapon_Enchant_NotWeapon]:
      '무기가 아닌 아이템은 소울웨폰으로 변환할 수 없습니다.',
    [ErrorCode.SoulWeapon_Enchant_AlreadyEnchanted]:
      '이미 소울웨폰으로 변환된 아이템입니다.',
    [ErrorCode.SoulWeapon_Equip_NotEnchanted]:
      '소울웨폰으로 변환되지 않은 아이템에는 소울을 장착할 수 없습니다.',
    [ErrorCode.SoulWeapon_Equip_AmplifiedSlotRequiresAmplifiableSoul]:
      '소울 증폭이 진행된 아이템에는 위대한 소울만 장착할 수 있습니다.',
    [ErrorCode.SoulWeapon_Amplify_ReqLevelBelow200]:
      '아이템의 착용 레벨이 200 미만이어서 소울 증폭을 진행할 수 없습니다.',
    [ErrorCode.SoulWeapon_Amplify_NotEnchanted]:
      '소울 증폭을 진행하려면 먼저 소울웨폰으로 변환해야 합니다.',
    [ErrorCode.SoulWeapon_Amplify_NoSoulEquipped]:
      '소울 증폭을 진행하려면 먼저 소울을 장착해야 합니다.',
    [ErrorCode.SoulWeapon_Amplify_EquippedSoulNotAmplifiable]:
      '장착된 소울이 증폭을 지원하지 않습니다. 위대한 소울만 증폭할 수 있습니다.',
    [ErrorCode.SoulWeapon_Amplify_MaxLevelReached]:
      '소울 증폭이 이미 최대 단계에 도달했습니다.',
    [ErrorCode.SoulWeapon_SetPotential_NotEnchanted]:
      '소울 잠재능력을 설정하려면 먼저 소울웨폰으로 변환해야 합니다.',
    [ErrorCode.SoulWeapon_SetPotential_NotAmplified]:
      '소울 잠재능력을 설정하려면 먼저 소울 증폭을 진행해야 합니다.',
    [ErrorCode.SoulWeapon_SetPotential_NoSoulEquipped]:
      '소울 잠재능력을 설정하려면 먼저 소울을 장착해야 합니다.',
    [ErrorCode.SoulWeapon_SetPotential_EquippedSoulNotAmplifiable]:
      '아이템의 소울 증폭 단계와 장착된 소울 정보가 일치하지 않습니다. 장착된 소울을 위대한 소울로 교체해야 합니다.',
    [ErrorCode.SoulWeapon_SetPotential_NormalGradeNotAllowed]:
      '소울 잠재능력을 Normal 등급으로 설정할 수 없습니다.',
    [ErrorCode.SoulWeapon_SetPotential_OptionCountNotThree]:
      '소울 잠재능력 옵션은 3개로 설정해야 합니다. {options.length}개가 전달되었습니다.',

    [ErrorCode.Exceptional_Apply_NotSupported]:
      '아이템이 익셉셔널 강화를 지원하지 않습니다.',
    [ErrorCode.Exceptional_Apply_NoRemainingUpgradeCount]:
      '아이템에 남은 익셉셔널 강화 횟수가 없습니다.',
    [ErrorCode.Exceptional_Reset_NotSupported]:
      '아이템이 익셉셔널 강화 초기화를 지원하지 않습니다.',

    [ErrorCode.Shape_Set_ChangeNotAllowed]:
      '외형을 변경할 수 없는 아이템입니다.',

    [ErrorCode.Gear_Construct_UnsupportedDataVersion]:
      '지원하지 않는 장비 데이터 버전입니다.',
    [ErrorCode.Gear_Migrate_InvalidGearData]: '잘못된 장비 데이터 형식입니다.',
    [ErrorCode.Gear_Migrate_DataVersionTooNew]:
      '장비 데이터가 지정한 버전보다 최신입니다.',
    [ErrorCode.Gear_Migrate_UnknownDataVersion]:
      '지원하지 않는 장비 데이터 버전입니다.',
  },

  en: {
    [ErrorCode.DEFAULT]: 'An unknown error has occurred.',
    [ErrorCode.AddOption_Apply_NotSupported]:
      'This item does not support bonus stats.',
    [ErrorCode.AddOption_Apply_MaxCountOf4Reached]:
      'An item can have at most 4 bonus stats.',
    [ErrorCode.AddOption_Reset_NotSupported]:
      'This item does not support resetting bonus stats.',
    [ErrorCode.AddOption_Calculate_AttackPowerRequiresWeaponOrReqLevelAtLeast60]:
      'Non-weapon items with a required level below 60 cannot receive attack power bonus stats.',
    [ErrorCode.AddOption_Calculate_MagicPowerRequiresWeaponOrReqLevelAtLeast60]:
      'Non-weapon items with a required level below 60 cannot receive magic attack bonus stats.',
    [ErrorCode.AddOption_Calculate_UnknownLongSwordAttackPower]:
      "No bonus stat data is available for this long sword's attack power.",
    [ErrorCode.AddOption_Calculate_SpeedRequiresNonWeapon]:
      'Weapons cannot receive Speed bonus stats.',
    [ErrorCode.AddOption_Calculate_JumpRequiresNonWeapon]:
      'Weapons cannot receive Jump bonus stats.',
    [ErrorCode.AddOption_Calculate_DamageRequiresWeapon]:
      'Non-weapon items cannot receive Damage % bonus stats.',
    [ErrorCode.AddOption_Calculate_BossDamageRequiresWeapon]:
      'Non-weapon items cannot receive Boss Damage % bonus stats.',
    [ErrorCode.AddOption_Calculate_BossDamageReqLevelBelow90]:
      'Items with a required level below 90 cannot receive Boss Damage % bonus stats.',
    [ErrorCode.AddOption_Calculate_AllStatRequiresWeaponOrReqLevelAtLeast70]:
      'Non-weapon items with a required level below 70 cannot receive All Stats % bonus stats.',
    [ErrorCode.AddOption_Calculate_ReqLevelDecreaseRequiresPositiveReqLevel]:
      'Items with a required level of 0 or lower cannot receive required level reduction bonus stats.',

    [ErrorCode.Upgrade_ApplyScroll_NotSupported]:
      'This item does not support scroll enhancement.',
    [ErrorCode.Upgrade_ApplyScroll_NoRemainingUpgradeCount]:
      'This item has no remaining scroll upgrade slots.',
    [ErrorCode.Upgrade_FailScroll_NotSupported]:
      'This item does not support applying failed scroll enhancements.',
    [ErrorCode.Upgrade_FailScroll_NoRemainingUpgradeCount]:
      'This item has no remaining scroll upgrade slots.',
    [ErrorCode.Upgrade_ResileScroll_NotSupported]:
      'This item does not support restoring scroll upgrade slots.',
    [ErrorCode.Upgrade_ResileScroll_NoResilienceCount]:
      'This item has no scroll upgrade slots to restore.',
    [ErrorCode.Upgrade_Reset_NotSupported]:
      'This item does not support resetting scroll enhancements.',
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedGearType]:
      'This item does not support Spell Trace enhancement.',
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedSpellTraceType]:
      "No {type} scroll is available for this item's Spell Trace enhancement.",
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedSpellTraceRate]:
      "No scroll with a {rate}% success rate is available for this item's Spell Trace enhancement.",
    [ErrorCode.SpellTrace_CreateScroll_UnsupportedTypeRateCombination]:
      "No {rate}% {type} scroll is available for this item's Spell Trace enhancement.",

    [ErrorCode.Starforce_Apply_NotSupported]:
      'This item does not support Star Force enhancement.',
    [ErrorCode.Starforce_Apply_Fixed]: "This item's Star Force level is fixed.",
    [ErrorCode.Starforce_Apply_MaxStarReached]:
      'This item has reached its maximum Star Force level.',
    [ErrorCode.Starforce_Apply_AbsoluteMaxStarReached]:
      'The maximum allowed Star Force level has been reached.',
    [ErrorCode.Starforce_Apply_SuperiorMaxStarReached]:
      'This Superior item has reached its maximum Star Force level.',
    [ErrorCode.Starforce_Calculate_UnsupportedReqLevel]:
      'Star Force enhancement is not supported for items with a required level of {gear.req.level}.',
    [ErrorCode.Starforce_Reset_NotSupported]:
      'This item does not support resetting Star Force enhancements.',
    [ErrorCode.Starforce_Reset_Fixed]:
      "This item's Star Force level is fixed and cannot be reset.",
    [ErrorCode.Starforce_Recalculate_NotSupported]:
      'This item does not support recalculating Star Force stats.',
    [ErrorCode.Starforce_Recalculate_StarScrollApplied]:
      'Star Force stats cannot be recalculated because an Amazing Equipment Enhancement Scroll has been applied to this item.',
    [ErrorCode.StarScroll_Apply_NotSupported]:
      'This item does not support Amazing Equipment Enhancement Scrolls.',
    [ErrorCode.StarScroll_Apply_Fixed]:
      'Amazing Equipment Enhancement Scrolls cannot be used on this item because its Star Force level is fixed.',
    [ErrorCode.StarScroll_Apply_SuperiorNotSupported]:
      'Superior items do not support Amazing Equipment Enhancement Scrolls.',
    [ErrorCode.StarScroll_Apply_ReqLevelAbove150]:
      'Amazing Equipment Enhancement Scrolls cannot be used on this item because its required level exceeds 150.',
    [ErrorCode.StarScroll_Apply_MaxStarReached]:
      'Amazing Equipment Enhancement Scrolls cannot be used on this item because it has reached its maximum enhancement level.',
    [ErrorCode.StarScroll_Apply_AbsoluteMaxStarReached]:
      'The maximum enhancement level of 15 stars for Amazing Equipment Enhancement Scrolls has been reached.',

    [ErrorCode.Potential_Set_NotSupported]:
      'This item does not support setting Potential.',
    [ErrorCode.Potential_Set_Fixed]:
      'This item does not support resetting Potential.',
    [ErrorCode.Potential_Set_NormalGradeNotAllowed]:
      'Potential cannot be set to Normal rank.',
    [ErrorCode.Potential_Set_OptionCountOutOfRange]:
      'Potential must be set with 1 to 3 options.',
    [ErrorCode.Potential_Reset_NotSupported]:
      'This item does not support clearing Potential.',
    [ErrorCode.AdditionalPotential_Set_NotSupported]:
      'This item does not support setting Bonus Potential.',
    [ErrorCode.AdditionalPotential_Set_Fixed]:
      'This item does not support resetting Bonus Potential.',
    [ErrorCode.AdditionalPotential_Set_NormalGradeNotAllowed]:
      'Bonus Potential cannot be set to Normal rank.',
    [ErrorCode.AdditionalPotential_Set_OptionCountOutOfRange]:
      'Bonus Potential must be set with 1 to 3 options.',
    [ErrorCode.AdditionalPotential_Reset_NotSupported]:
      'This item does not support clearing Bonus Potential.',

    [ErrorCode.SoulWeapon_Enchant_NotWeapon]:
      'Non-weapon items cannot be converted into Soul Weapons.',
    [ErrorCode.SoulWeapon_Enchant_AlreadyEnchanted]:
      'This item has already been converted into a Soul Weapon.',
    [ErrorCode.SoulWeapon_Equip_NotEnchanted]:
      'A soul cannot be equipped on an item that has not been converted into a Soul Weapon.',
    [ErrorCode.SoulWeapon_Equip_AmplifiedSlotRequiresAmplifiableSoul]:
      'Only Magnificent Souls can be equipped on items that have undergone Soul Amplification.',
    [ErrorCode.SoulWeapon_Amplify_ReqLevelBelow200]:
      "Soul Amplification cannot be performed because this item's required level is below 200.",
    [ErrorCode.SoulWeapon_Amplify_NotEnchanted]:
      'The item must be converted into a Soul Weapon before Soul Amplification can be performed.',
    [ErrorCode.SoulWeapon_Amplify_NoSoulEquipped]:
      'A soul must be equipped before Soul Amplification can be performed.',
    [ErrorCode.SoulWeapon_Amplify_EquippedSoulNotAmplifiable]:
      'The equipped soul does not support amplification. Only Magnificent Souls can be amplified.',
    [ErrorCode.SoulWeapon_Amplify_MaxLevelReached]:
      'Soul Amplification has already reached its maximum level.',
    [ErrorCode.SoulWeapon_SetPotential_NotEnchanted]:
      'The item must be converted into a Soul Weapon before Soul Potential can be set.',
    [ErrorCode.SoulWeapon_SetPotential_NotAmplified]:
      'Soul Amplification must be performed before Soul Potential can be set.',
    [ErrorCode.SoulWeapon_SetPotential_NoSoulEquipped]:
      'A soul must be equipped before Soul Potential can be set.',
    [ErrorCode.SoulWeapon_SetPotential_EquippedSoulNotAmplifiable]:
      "The item's Soul Amplification level is inconsistent with the equipped soul. The equipped soul must be replaced with a Magnificent Soul.",
    [ErrorCode.SoulWeapon_SetPotential_NormalGradeNotAllowed]:
      'Soul Potential cannot be set to Normal rank.',
    [ErrorCode.SoulWeapon_SetPotential_OptionCountNotThree]:
      'Soul Potential must be set with 3 options. {options.length} options were provided.',

    [ErrorCode.Exceptional_Apply_NotSupported]:
      'This item does not support Exceptional Enhancement.',
    [ErrorCode.Exceptional_Apply_NoRemainingUpgradeCount]:
      'This item has no remaining Exceptional Enhancement slots.',
    [ErrorCode.Exceptional_Reset_NotSupported]:
      'This item does not support resetting Exceptional Enhancements.',
    [ErrorCode.Shape_Set_ChangeNotAllowed]:
      "This item's appearance cannot be changed.",
    [ErrorCode.Gear_Construct_UnsupportedDataVersion]:
      'This gear data version is not supported.',
    [ErrorCode.Gear_Migrate_InvalidGearData]:
      'The gear data format is invalid.',
    [ErrorCode.Gear_Migrate_DataVersionTooNew]:
      'The gear data version is newer than the specified target version.',
    [ErrorCode.Gear_Migrate_UnknownDataVersion]:
      'This gear data version is not supported.',
  },
} as const satisfies Record<ErrorLanguage, Record<ErrorCode, string>>;
