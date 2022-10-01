export type ErrorResponse = { error: { type: string, message: string }}
export type AuthResponse = ErrorResponse | { userId: string }