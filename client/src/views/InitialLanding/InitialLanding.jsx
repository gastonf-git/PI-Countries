import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./InitialLanding.module.css";
import homeVideo from "../../assets/images/planet 720.mp4";

function InitialLanding() {
	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "visible";
		};
	}, []);
	return (
		<div className={styles.homeContainer}>
			<video
				width="100%"
				height="100%"
				loop
				autoPlay
				muted
				className={styles.video}
			>
				<source src={homeVideo} type="video/mp4" />
			</video>

			<div className={styles.overlay}>
				<span>
					Welcome to Countries App 
				</span>
				<Link className={styles.link} to="/countries">
					ENTER
				</Link>
			</div>
		</div>
	);
}

export default InitialLanding;
