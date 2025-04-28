import { ExceptionalHammer } from '../enhance/exceptional';

export function createExceptional(
  data?: Partial<ExceptionalHammer>,
): ExceptionalHammer {
  return {
    name: '테스트용 익셉셔널 해머',
    option: {},

    ...data,
  };
}
