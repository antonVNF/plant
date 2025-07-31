import React, { useState } from "react";
import styles from "../scss/components/flowerPage.module.scss";
interface FlowerGalleryProps {
	images: string[];
	activeImage: number;
	onSelect: (index: number) => void;
}


const FlowerGallery = ({ images = [], activeImage, onSelect }: FlowerGalleryProps) => {
	const [backgroundPosition, setBackgroundPosition] = useState<string>("center");
	const [isHovering, setIsHovering] = useState<boolean>(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
		const x = ((e.pageX - left) / width) * 100;
		const y = ((e.pageY - top) / height) * 100;
		setBackgroundPosition(`${x}% ${y}%`);
	};

	const handleMouseEnter = () => setIsHovering(true);
	const handleMouseLeave = () => {
		setIsHovering(false);
		setBackgroundPosition("center");
	};

	return (
		<div className={styles.gallery}>
			<div className={styles.thumbs}>
				{images.map((img, idx) => (
					<img
						key={idx}
						src={img}
						alt={`thumb-${idx}`}
						className={activeImage === idx ? styles.active : ""}
						onClick={() => onSelect(idx)}
					/>
				))}
			</div>

			<div
				className={styles.mainImage}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
				style={{
					backgroundImage: `url(${images[activeImage]})`,
					backgroundSize: isHovering ? "180%" : "contain",
					backgroundPosition,
				}}
			/>
		</div>
	);
};

export default FlowerGallery;
