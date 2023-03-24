import jwt, { JwtPayload } from 'jsonwebtoken'

class BaseController {
  static verifyToken(token: string) {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6MywidXNlcm5hbWUiOiLmlofpvpk2NjYiLCJhZGRyZXNzIjoi5YyX5Lqs5Lit5YWz5p2RIiwidmFsaWQiOjEsImJpcnRoIjoiMjAyMy0wMi0yOCJ9LCJpYXQiOjE2Nzk2NDU4MzksImV4cCI6MTY3OTY0NTgzOX0.nkITyaE_7SfX_S6ss7UKWIL7iQFa_i6ErdTPJLPv4YA'
    const result = jwt.verify(token, 'dragon') as JwtPayload

    return result.data
  }
}

export const { verifyToken } = BaseController
