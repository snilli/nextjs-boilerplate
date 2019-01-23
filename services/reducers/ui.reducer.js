const initialState = {
  tabSelected: 3,
}

const actionTypes = {
  CHANGE_TAB: 'CHANGE_TAB',
}

// REDUCERS
const reducer = (state = initialState, action) => {
  const { type, tabSelected } = action
  switch (type) {
    case actionTypes.CHANGE_TAB: {
      const data = {
        ...state,
        tabSelected,
      }
      return data
    }
    default:
      return state
  }
}

// ACTIONS
const actionCreators = {}
actionCreators.changeTab = (tabSelected) => ({
  type: actionTypes.CHANGE_TAB,
  tabSelected,
})

// Discpatchers
const dispatchers = {}
dispatchers.changeTab = (tabSelected) => actionCreators.changeTab(tabSelected)

export { actionCreators, reducer, dispatchers, initialState }
