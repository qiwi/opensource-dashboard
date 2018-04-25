export const BAD_REQUEST = 400
export const NOT_FOUND = 404
export const INTERNAL_SERVER_ERROR = 500

export function formatError(code, message) {
  return {code, message}
}