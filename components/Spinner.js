import styles from "../styles/Spinner.module.css";

export default function Spinner() {
	return (
		<div className={styles.spinnerOverlay}>
			<div className={styles.spinnerContainer}></div>
		</div>
	);
}
