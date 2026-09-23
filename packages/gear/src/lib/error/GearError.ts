import { ErrorCode } from './codes';
import type { ErrorLanguage } from './language';
import { errorMessages, type ErrorContextFields } from './messages';

/**
 * 장비 오류 컨텍스트입니다.
 */
export type Context = {
  gear: { id: number; name: string; errorLanguage: ErrorLanguage };
  [key: string]: unknown;
};

type ErrorArguments = {
  [Code in ErrorCode]: [
    code: Code,
    context: Context &
      (Code extends keyof ErrorContextFields
        ? ErrorContextFields[Code]
        : unknown),
  ];
}[ErrorCode];

/**
 * 장비 오류 클래스입니다.
 */
export class GearError extends Error {
  readonly code: ErrorCode;
  readonly context: Readonly<Context>;

  /**
   * 오류 코드와 컨텍스트를 받아 `GearError` 객체를 생성합니다.
   *
   * 생성자는 예고 없이 변경될 수 있으며 SemVer에 포함되지 않습니다.
   */
  constructor(...[code, context]: ErrorArguments) {
    const { gear } = context;
    super(formatMessage(errorMessages[gear.errorLanguage][code], context));
    this.name = 'GearError';
    this.code = code;
    this.context = context;
  }
}

/**
 * 메시지 템플릿에서 컨텍스트의 값을 치환합니다.
 */
function formatMessage(message: string, context: Context): string {
  return message.replace(/\{([^{}]*)\}/g, (placeholder, key: string) => {
    const result = getContextValue(context, key);
    if (!result) return placeholder;
    const { value } = result;
    try {
      if (typeof value === 'object')
        return JSON.stringify(value) ?? placeholder;
      // oxlint-disable-next-line typescript/no-base-to-string
      return String(value);
    } catch {
      return placeholder;
    }
  });
}

function getContextValue(
  context: Context,
  path: string,
): { value: unknown } | undefined {
  let value: unknown = context;
  let remaining = path;
  while (value !== null && typeof value === 'object') {
    if (remaining in value) {
      return { value: (value as Record<string, unknown>)[remaining] };
    }
    const separator = remaining.indexOf('.');
    if (separator === -1) return undefined;
    const key = remaining.slice(0, separator);
    if (!(key in value)) return undefined;
    value = (value as Record<string, unknown>)[key];
    remaining = remaining.slice(separator + 1);
  }
  return undefined;
}
