/** Server-side bank details from env (used by `/api/bank-details`). */
export const BANK_DETAILS = {
  bankName: process.env.BANK_NAME,
  accountName: process.env.BANK_ACCOUNT_NAME,
  accountNumber: process.env.BANK_ACCOUNT_NUMBER,
  branchCode: process.env.BANK_BRANCH_CODE,
  accountType: process.env.BANK_ACCOUNT_TYPE,
}

export type BankDetailsPublic = {
  bankName: string
  accountName: string
  accountNumber: string
  branchCode: string
  accountType: string
}

export function getBankDetailsPublic(): BankDetailsPublic {
  return {
    bankName: BANK_DETAILS.bankName ?? '',
    accountName: BANK_DETAILS.accountName ?? '',
    accountNumber: BANK_DETAILS.accountNumber ?? '',
    branchCode: BANK_DETAILS.branchCode ?? '',
    accountType: BANK_DETAILS.accountType ?? '',
  }
}
