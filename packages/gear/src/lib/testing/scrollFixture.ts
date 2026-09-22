import { Scroll } from '../enhance/upgrade';

export function createScroll(data?: Partial<Scroll>): Scroll {
  return {
    name: '테스트용 주문서',
    option: {},
    ...data,
  };
}
