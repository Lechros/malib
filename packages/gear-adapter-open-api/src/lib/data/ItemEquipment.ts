import { ItemEquipmentAddOption } from './ItemEquipmentAddOption';
import { ItemEquipmentBaseOption } from './ItemEquipmentBaseOption';
import { ItemEquipmentEtcOption } from './ItemEquipmentEtcOption';
import { ItemEquipmentExceptionalOption } from './ItemEquipmentExceptionalOption';
import { ItemEquipmentStarforceOption } from './ItemEquipmentStarforceOption';
import { ItemEquipmentTotalOption } from './ItemEquipmentTotalOption';

/**
 * 캐릭터 장비 아이템 상세 정보
 */
export interface ItemEquipmentInfo {
  /** 장비 부위 명 */
  item_equipment_part: string;
  /** 장비 슬롯 위치 */
  item_equipment_slot: string;
  /** 장비 명 */
  item_name: string;
  /** 장비 아이콘 */
  item_icon: string;
  /** 장비 설명 */
  item_description: string | null;
  /** 장비 외형 */
  item_shape_name: string;
  /** 장비 외형 아이콘 */
  item_shape_icon: string;
  /** 전용 성별 */
  item_gender: string | null;
  /** 장비 최종 옵션 */
  item_total_option: ItemEquipmentTotalOption;
  /** 장비 기본 옵션 */
  item_base_option: ItemEquipmentBaseOption;
  /** 잠재능력 봉인 여부 (true 봉인, false 봉인 없음) */
  potential_option_flag: string | null;
  /** 에디셔널 잠재능력 봉인 여부 (true 봉인, false 봉인 없음) */
  additional_potential_option_flag: string | null;
  /** 잠재능력 등급 */
  potential_option_grade: string | null;
  /** 에디셔널 잠재능력 등급 */
  additional_potential_option_grade: string | null;
  /** 잠재능력 첫 번째 옵션 */
  potential_option_1: string | null;
  /** 잠재능력 두 번째 옵션 */
  potential_option_2: string | null;
  /** 잠재능력 세 번째 옵션 */
  potential_option_3: string | null;
  /** 에디셔널 잠재능력 첫 번째 옵션 */
  additional_potential_option_1: string | null;
  /** 에디셔널 잠재능력 두 번째 옵션 */
  additional_potential_option_2: string | null;
  /** 에디셔널 잠재능력 세 번째 옵션 */
  additional_potential_option_3: string | null;
  /** 착용 레벨 증가 */
  equipment_level_increase: number;
  /** 장비 특별 옵션 */
  item_exceptional_option: ItemEquipmentExceptionalOption;
  /** 장비 추가 옵션 */
  item_add_option: ItemEquipmentAddOption;
  /** 성장 경험치 */
  growth_exp: number;
  /** 성장 레벨 */
  growth_level: number;
  /** 업그레이드 횟수 */
  scroll_upgrade: string;
  /** 가위 사용 가능 횟수 (교환 불가 장비, 가위 횟수가 없는 교환 가능 장비는 255) */
  cuttable_count: string;
  /** 황금 망치 재련 적용 (1:적용, 이외 미 적용) */
  golden_hammer_flag: string;
  /** 복구 가능 횟수 */
  scroll_resilience_count: string;
  /** 업그레이드 가능 횟수 */
  scroll_upgradeable_count: string;
  /** 소울 명 */
  soul_name: string | null;
  /** 소울 옵션 */
  soul_option: string | null;
  /** 장비 기타 옵션 */
  item_etc_option: ItemEquipmentEtcOption;
  /** 강화 단계 */
  starforce: string;
  /** 놀라운 장비 강화 주문서 사용 여부 (0:미사용, 1:사용) */
  starforce_scroll_flag: string;
  /** 장비 스타포스 옵션 */
  item_starforce_option: ItemEquipmentStarforceOption;
  /** 특수 반지 레벨 */
  special_ring_level: number;
  /** 장비 유효 기간 */
  date_expire: Date | null;
  /** 프리스타일 쿠폰 적용 여부 (0:미적용, 1:적용) */
  freestyle_flag: string | null;
}
