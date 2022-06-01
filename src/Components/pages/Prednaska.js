import { Button } from "@mui/material";
import { color } from "@mui/system";
import React from "react";
import { useCountdown } from "./CountDown";
function Prednaska({ prednaska, onFinish }) {
	let [minutes, seconds] = useCountdown(
		prednaska.startTime + prednaska.data.duration * 1000
	);
	const cancel = () => {
		localStorage.removeItem("prednaska");
		onFinish();
	};
	const endClass = () => {
		let xp = +localStorage.getItem("xp");
		xp += Math.floor(prednaska.data.xp / 2);
		if (xp >= +localStorage.getItem("level") * 1000) {
			xp -= +localStorage.getItem("level") * 1000;
			let lvl = +localStorage.getItem("level") + 1;
			localStorage.setItem("level", lvl);
		}
		localStorage.setItem("xp", xp);
		let dollary = +localStorage.getItem("dollary");
		dollary += Math.floor(prednaska.data.money / 2);
		localStorage.setItem("dollary", dollary);
		localStorage.removeItem("prednaska");
		let n = Math.random();
		if (n < 0.05)
			localStorage.setItem("kredity", +localStorage.getItem("kredity") + 0.5);
		onFinish();
	};
	if (minutes + seconds <= 0) {
		endClass();
	}
	return (
		<div
			style={{
				height: "100%",
				position: "relative",
				backgroundImage: "url('pictures/locations/prednaska.jpg')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					position: "absolute",
					height: "15vh",
					width: "20vw",
					left: "0",
					right: "0",
					marginLeft: "auto",
					marginRight: "auto",
					top: "0",
					bottom: "0",
					marginTop: "auto",
					marginBottom: "5vh",
					fontSize: "5vh",
					color: "white",
					alignItems: "center",
				}}
			>
				{" "}
				{minutes < 10 ? "0" + minutes : minutes}:
				{seconds < 10 ? "0" + seconds : seconds}
				<Button
					variant="contained"
					onClick={() => {
						cancel();
					}}
				>
					Zrušit
				</Button>
			</div>
		</div>
	);
}

export default Prednaska;
