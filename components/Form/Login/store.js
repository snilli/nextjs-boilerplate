import persist from '../../../lib/persist'

// Constants
export const IDENTITY_SUCCESS = 'IDENTITY/SUCCESS'
export const IDENTITY_EXISTING = 'IDENTITY/EXISTING'
export const IDENTITY_ERROR = 'IDENTITY/ERROR'

// Initial State
const initialState = {
  citizen: '',
  email: '',
  error: null,
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IDENTITY_SUCCESS:
      return {
        ...state,
        citizen: action.citizen,
        email: action.email,
        error: null,
      }
    case IDENTITY_EXISTING:
      return {
        ...state,
        citizen: action.citizen,
        email: action.email,
        error: null,
      }
    case IDENTITY_ERROR:
      return {
        ...state,
        citizen: action.citizen,
        email: action.email,
        error: action.error,
      }
    default:
      return state
  }
}

// Action creators
const actionCreators = {}

actionCreators.identifySuccess = (citizen, email) => ({
  type: IDENTITY_SUCCESS,
  citizen,
  email,
})
actionCreators.identifyExisting = (citizen, email) => ({
  type: IDENTITY_EXISTING,
  citizen,
  email,
})

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

export { actionCreators, reducer, dispatchers }
