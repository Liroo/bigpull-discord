import { STATUS_CODES } from 'http';

export default class HttpError extends Error {
  public statusCode: string;

  constructor(code: string, message: string) {
    super(message || STATUS_CODES[code]);
    this.name = toName(code);
    this.statusCode = code;
  }
}

export function toName (code) {
  const suffix = (code / 100 | 0) === 4 || (code / 100 | 0) === 5 ? 'error' : '';
  return String(STATUS_CODES[code]).replace(/error$/i, '');
}