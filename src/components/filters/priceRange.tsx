import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { setRange } from '../../redux/slices/filterSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

const PriceRange = () => {
	const { range } = useAppSelector(state => state.filter);
	const dispatch = useAppDispatch();

	const [tempValue, setTempValue] = useState<[number, number]>(range as [number, number]);
	const [isChanged, setIsChanged] = useState(false);

	const handleSliderChange = (
		_event: Event,
		newValue: number | number[]
	) => {
		if (Array.isArray(newValue)) {
			setTempValue([newValue[0], newValue[1]]);
			setIsChanged(true);
		}
	};

	const handleApply = () => {
		if (isChanged) {
			dispatch(setRange(tempValue));
			setIsChanged(false);
		}
	};

	const valuetext = (value: number) => `${value}$`;

	return (
		<div className="range-slider categories">
			<h4 className="range-slider__title categories__title">Price Range</h4>
			<div className="range-slider__content">
				<Slider
					getAriaLabel={() => 'price range'}
					value={tempValue}
					min={0}
					max={1500}
					onChange={handleSliderChange}
					valueLabelDisplay="auto"
					getAriaValueText={valuetext}
				/>
				<div className="range-slider__range">
					Price: <span>${tempValue[0]} - ${tempValue[1]}</span>
				</div>
				<button
					className="button range-slider__button"
					onClick={handleApply}
					disabled={!isChanged}
				>
					Filter
				</button>
			</div>
		</div>
	);
};

export default PriceRange;
