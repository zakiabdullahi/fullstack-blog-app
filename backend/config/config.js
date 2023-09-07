import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT || 8000
export const DbUrl = process.env.DATABASE_URL
export const JWT_Secret = process.env.JWT_SECRET_KEY










