import { createContext } from 'react'
import createPersistedState from 'use-persisted-state'

const useCounterState = createPersistedState('add-parent-mobile')
const MainContext = createContext()
const useMain = () => {
  const initialState = {
    citizen: '',
    fetchCheck: false,
    isSavePhone: false,
    canAccessAt: null,
    errorCode: 0,
  }

  const [state, setState] = useCounterState(initialState)
  const actions = {
    setCitizen: (citizen, fetchCheck = false, canAccessAt = null, errorCode = 0) => {
      setState({
        ...state,
        citizen,
        fetchCheck,
        canAccessAt,
        errorCode,
      })
    },
    resetState: () => {
      setState({
        ...state,
        ...initialState,
      })
    },
    afterSave: () => {
      setState({
        ...state,
        isSavePhone: true,
      })
    },
    setParentLogCheck: () => {
      setState({
        ...state,
        fetchCheck: true,
      })
    },
    unsetParentLogCheck: () => {
      setState({
        ...state,
        fetchCheck: false,
      })
    },
  }
  return {
    state,
    actions,
  }
}
export { MainContext, useMain }
