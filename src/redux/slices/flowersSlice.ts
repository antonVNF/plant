import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {fetchedFlowers} from "../../api/flowersApi";

export type Size = 'small' | 'medium' | 'large';

export interface Flower {
	id: string;
	category?: number;
	discount: number;
	finalPrice: number;
	imageUrl: string;
	name: string;
	price: number;
	size: Size;
}


interface FlowerState {
	items: Flower[];
	status: 'loading' | 'error' | 'success';
	error: string | null;
	categoryItemCounts: Record<string, number>;
}



const initialState: FlowerState = {
	items: [],
	status: 'loading',
	error: null,
	categoryItemCounts: {}
};

const flowerSlice = createSlice({
	name: 'flower',
	initialState,
	reducers: {
		setCategoryItemCounts: (state, action: PayloadAction<Record<string, number>>) => {
			state.categoryItemCounts = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchedFlowers.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchedFlowers.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
				state.error = null;
			})
			.addCase(fetchedFlowers.rejected, (state, action) => {
				state.status = 'error';
				state.items = [];
				state.error = action.payload || 'Unknown error';
			});
	}
});

export const { setCategoryItemCounts } = flowerSlice.actions;
export const selectFlowers = (state: RootState) => state.flower;
export default flowerSlice.reducer;
