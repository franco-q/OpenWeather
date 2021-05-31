import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import reducers from './reducers'
import Sagas from './sagas'

const persistedReducers = persistReducer(
	{
		key: 'root',
		storage: AsyncStorage,
		blacklist: ['error', 'redirect']
	},
	reducers
)
const sagaMiddleware = createSagaMiddleware()
const store = createStore(persistedReducers, applyMiddleware(sagaMiddleware))
const persistor = persistStore(store)

sagaMiddleware.run(Sagas)

export default ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	)
}
