import { createContext } from 'react'
import createPersistedState from 'use-persisted-state'

const useCounterState = createPersistedState('add-parent-mobile')
const MainContext = createContext()
const useMain = () => {
  const initialState = {
    citizen: '',
    fetchCheck: false,
    is_save_phone: false,
  }

  const [state, setState] = useCounterState(initialState)
  const actions = {
    setCitizen: (citizen, fetchCheck = false) => {
      setState({
        ...state,
        citizen,
        fetchCheck,
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
        is_save_phone: true,
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
