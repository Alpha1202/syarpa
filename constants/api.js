import axios from 'axios'
import { Alert } from 'react-native'
import { LOQATE_API_URL } from './index'

import env from '../environment'

export const { loqateKey } = env

export const accountValidationRequest = async (
  endpoint,
  method = 'POST',
  body = {},
  contentType = 'application/json',
) => {
  try {
    const url = `${LOQATE_API_URL}?Key=${loqateKey}${endpoint}`
  
    const request = axios.request(url, {
      method: method.toUpperCase(),
      headers: { 'Content-Type': contentType },
    })

    return request
  } catch (error) {
    return Promise.reject(error)
  }
}
