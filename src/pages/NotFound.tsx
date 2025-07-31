import React from "react";
import { Link } from "react-router-dom";
import styles from "../scss/components/notFound.module.scss";
import NotFoundImage from "../assets/img/404.png";

const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<img src={NotFoundImage} alt="404 Not Found" className={styles.image} />
			<Link to="/" className={styles.backButton}>
				← Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
