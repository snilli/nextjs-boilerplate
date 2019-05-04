import persist from '../../../libraries/persist'
import { defineState } from 'redux-localstore'

// Constants
export const IDENTITY_SUCCESS = 'IDENTITY/SUCCESS'
export const IDENTITY_EXISTING = 'IDENTITY/EXISTING'
export const IDENTITY_ERROR = 'IDENTITY/ERROR'
export const IDENTITY_VERIFYSUCCESS = 'IDENTITY/VERIFYSUCCESS'
export const LOCALSTORAGE_2REDUX_IDEN = 'LOCALSTORAGE/2REDUX/IDEN'
export const AUTH_SIGNOUT_IDEN = 'AUTH/SIGNOUT/IDEN'

// Initial State
const defaultState = {
  citizen: '',
  email: '',
  error: null
}

const initialState = defineState(defaultState)('Iden')

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IDENTITY_SUCCESS:
      return {
        ...state,
        citizen: action.citizen,
        email: action.email,
        error: null
      }
    case IDENTITY_EXISTING:
      return {
        ...state,
        citizen: action.citizen,
        email: action.email,
        error: null
      }
    case IDENTITY_ERROR:
      return {
        ...state,
        citizen: action.citizen,
        email: action.email,
        error: action.error
      }
    case IDENTITY_VERIFYSUCCESS:
      return {
        ...state,
        citizen: action.citizen,
        error: null
      }
    case LOCALSTORAGE_2REDUX_IDEN: {
      const data = {
        ...state,
        [action.key]: action.val
      }
      return data
    }
    case AUTH_SIGNOUT_IDEN:
      return initialState
    default:
      return state
  }
}

// Action creators
const actionCreators = {}

actionCreators.identifySuccess = (citizen, email) => ({
  type: IDENTITY_SUCCESS,
  citizen,
  email
})
actionCreators.identifyExisting = (citizen, email) => ({
  type: IDENTITY_EXISTING,
  citizen,
  email
})

actionCreators.verifySuccess = citizen => ({
  type: IDENTITY_SUCCESS,
  citizen
})

actionCreators.localStorage2Redux = (key, val) => ({
  type: LOCALSTORAGE_2REDUX_IDEN,
  key,
  val
})

actionCreators.signOutIden = () => ({ type: AUTH_SIGNOUT_IDEN })

// Discpatchers
const dispatchers = {}

dispatchers.identifySuccess = (citizen, email) => {
  persist.willSetAccessToken(citizen)
  return actionCreators.identifySuccess(citizen, email)
}

dispatchers.identifyExisting = (citizen, email) => {
  persist.willRemoveAccessToken()
  return actionCreators.identifyExisting(citizen, email)
}

dispatchers.verifySuccess = citizen => {
  persist.willRemoveAccessToken()
  return actionCreators.verifySuccess(citizen)
}

dispatchers.localStorage2Redux = (key, val) =>
  actionCreators.localStorage2Redux(key, val)

dispatchers.signOutIden = () => actionCreators.signOutIden()

export { actionCreators, reducer, dispatchers, initialState }
