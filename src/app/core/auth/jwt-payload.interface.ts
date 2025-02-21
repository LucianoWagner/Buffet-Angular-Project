export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  permissions: string[];
  role: string;
}
