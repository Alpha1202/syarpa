import { VALIDATE_ACCOUNT, VALIDATING_ACCOUNT } from '../types'

const initialState = {
  validateAccountData: {},
  validatingAccount: false,
  validateAccountStatus: 'failed',
}

const validateAccountReducer = (
  state = initialState,
  { type, validateAccountData, validatingAccount, validateAccountStatus },
) => {
  switch (type) {
    case VALIDATING_ACCOUNT:
      return {
        ...state,
        validatingAccount,
      }
    case VALIDATE_ACCOUNT:
      return {
        ...state,
        validateAccountStatus,
        validateAccountData,
      }
    default:
      return state
  }
}

export default validateAccountReducer
