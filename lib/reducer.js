import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer,initialState } from '../store';

const persistConfig = {
  key: 'app',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

const initializeStore = (state = initialState) => {
  const store = createStore(
    persistedReducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

export default initializeStore