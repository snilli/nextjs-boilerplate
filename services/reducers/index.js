import { combineReducers } from 'redux'
import storage from '../storage/reducer'
import { reducer as ui } from './ui.reducer'

const rootReducer = combineReducers({
  storage,
  ui,
})

export default rootReducer
