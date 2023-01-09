import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import kanbanSlice from './kanbanSlice'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['kanbanApp'],
}

const rootReducer = combineReducers({
	kanbanApp: kanbanSlice,
})

const kanbanPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: kanbanPersistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)
