import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

type ErrorObject = { [k in 'key' | 'value']: string | string[] };

export const ValidationErrorPipe = new ValidationPipe({
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) => {
    if (errors.length === 0) {
      return new Error('ValidationErrorPipe was called without errors');
    }

    const validationErrors = errors.map(formatValidationError);

    return new BadRequestException(validationErrors);
  },
});

const formatValidationError = (e: ValidationError): ErrorObject => {
  let errorDetails: string | string[] = Object.values(e.constraints);

  if (errorDetails.length === 0) {
    errorDetails = '';
  }

  if (errorDetails.length === 1) {
    errorDetails = errorDetails[0];
  }

  return {
    key: e.property,
    value: errorDetails,
  };
};
