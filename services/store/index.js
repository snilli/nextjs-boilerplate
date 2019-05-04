import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import devTools from 'remote-redux-devtools'
import { createLogger } from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'app',
  storage,
}
const logger = createLogger() // disable when production
const enhancer = compose(
  applyMiddleware(
    thunk,
    logger // disable when production
  ),
  devTools() // disable when production
)

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store, null, () => {
  store.getState()
})

export { store, persistor }
