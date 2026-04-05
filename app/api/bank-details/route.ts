import { NextResponse } from 'next/server'
import { getBankDetailsPublic } from '@/lib/bank-details'

/** Public bank details for EFT instructions (no auth). */
export async function GET() {
  return NextResponse.json(getBankDetailsPublic())
}
