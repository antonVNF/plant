import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../store";

type InitialStateType = {
	totalPrice: number;
	items: {
		id: string;
		name: string;
		imageUrl: string;
		price: number;
		finalPrice: number;
		count: number;
		discount: number;
		size: string;
	}[];
}

export type CartItemType = {
	count: number;
	discount: number;
	price: number;
	finalPrice: number;
	id: string
	imageUrl: string
	name: string;
	size: string;

}

const initialState: InitialStateType = {
	items: [],
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const { id, finalPrice, count = 1 } = action.payload;
			const findItem = state.items.find((item) => item.id === id);

			if (findItem) {
				findItem.count += count;
			} else {
				// Создаём новый товар, гарантируя, что count задан явно
				const { count: _, ...rest } = action.payload; // удаляем старый count
				state.items.push({ ...rest, count });
			}

			state.totalPrice += finalPrice * count;
		},

		minusItemCount: (state, action) => {
			const findItem = state.items.find((item) => item.id === action.payload);
			if (findItem) {
				if (findItem.count > 1) {
					findItem.count -= 1;
					state.totalPrice -= findItem.finalPrice;
				} else {
					// если 1 — удаляем товар полностью
					state.items = state.items.filter((item) => item.id !== action.payload);
					state.totalPrice -= findItem.finalPrice;
				}
			}
		},

		deleteItem: (state, action) => {
			const findItem = state.items.find((item) => item.id === action.payload);
			if (findItem) {
				state.totalPrice -= findItem.count * findItem.finalPrice;
				state.items = state.items.filter((item) => item.id !== action.payload);
			}
		}
	},
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, minusItemCount, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
