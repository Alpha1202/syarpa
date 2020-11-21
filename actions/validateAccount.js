import { Alert } from 'react-native'
import { VALIDATE_ACCOUNT, VALIDATING_ACCOUNT } from '../types'

import { accountValidationRequest } from '../constants/api'

export const validateAccount = (bankAccount, sortCode) => async (dispatch) => {
  try {
    dispatch({
      type: VALIDATING_ACCOUNT,
      validatingAccount: true,
    })

    const url = `&AccountNumber=${bankAccount}&SortCode=${sortCode}`
    const response = await accountValidationRequest(url)

    if (response?.data?.Items[0]?.IsCorrect === false) {
      dispatch({
        type: VALIDATE_ACCOUNT,
        validateAccountStatus: 'failed',
        validateAccountData: response?.data?.Items[0],
      })
      Alert.alert('Error', 'Account Verifictation failed')
    } else if (response?.data?.Items[0]?.Error === '13') {
      dispatch({
        type: VALIDATE_ACCOUNT,
        validateAccountStatus: 'failed',
        validateAccountData: response?.data?.Items[0],
      })
      Alert.alert('Error', 'Account Verifictation failed')
    } else if (response?.data?.Items[0]?.IsCorrect) {
      dispatch({
        type: VALIDATE_ACCOUNT,
        validateAccountStatus: 'success',
        validateAccountData: response?.data?.Items[0],
      })
    }
  } catch (error) {
    dispatch({
      type: VALIDATE_ACCOUNT,
      validateAccountStatus: 'failed',
      validateAccountData: error,
    })
  } finally {
    dispatch({
      type: VALIDATING_ACCOUNT,
      validatingAccount: false,
    })
  }
}
