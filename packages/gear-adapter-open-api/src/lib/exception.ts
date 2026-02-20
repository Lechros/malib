/**
 * Open API에서 해당 라이브러리가 지원하지 않는 형식의 데이터를 반환했을 때 발생하는 예외입니다.
 */
export class OpenApiFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFormatError';
  }
}

/**
 * Open API에서 해당 라이브러리가 아직 지원하지 않는 데이터를 반환했을 때 발생하는 예외입니다.
 */
export class OpenApiValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownOpenApiError';
  }
}
