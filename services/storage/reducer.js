import { REHYDRATE } from 'redux-persist'

export default function storage(state = {}, action) {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        storageLoaded: true,
      }
    default:
      return state
  }
}
