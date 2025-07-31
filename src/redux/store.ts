import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import flowerReducer from './slices/flowersSlice';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		filter: filterReducer,
		flower: flowerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
