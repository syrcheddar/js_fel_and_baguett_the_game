import { Button, Grid, LinearProgress } from "@mui/material";
import { display, getThemeProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Cviceni.css";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "./CountDown";

function Cviceni(props) {
	const lvl = +localStorage.getItem("level");
	const [started, setStarted] = useState(false);
	let tt = Date.now();
	if (localStorage.getItem("cviceniTime") != null)
		tt = +localStorage.getItem("cviceniTime");
	const [minutes, seconds, setNewTime] = useCountdown(tt);
	const [countDown, setCountDown] = useState(minutes + seconds > 0);

	const stats = JSON.parse(localStorage.getItem("stats"));
	const classes = [
		"pictures/chars/sit-picture.png",
		"pictures/chars/oi-picture.png",
		"pictures/chars/kyr-picture.png",
	];
	const [leftID, setLeftID] = useState(null);
	const [rightID, setRightID] = useState("");
	let weaponItem = JSON.parse(localStorage.getItem("gear"))[4];
	let weapon = "";
	if (weaponItem == null) {
		weaponItem = {
			minDmg: lvl * 10,
			maxDmg: 20 * lvl,
			sound: "sounds/punch.mp3",
		};
		weapon = process.env.PUBLIC_URL + "/pictures/items/weapons/fist.png";
	} else weapon = process.env.PUBLIC_URL + weaponItem.src;
	const [userHP, setUserHP] = useState(stats[3] * 4 * (lvl + 1));
	const [enemyHP, setEnemyHP] = useState(stats[3] * 4 * (lvl + 1));
	const [maxUserHP, setMaxUserHP] = useState(stats[3] * 4 * (lvl + 1));
	const [maxEnemyHP, setMaxEnemyHP] = useState(stats[3] * 4 * (lvl + 1));
	let userSound = new Audio();
	userSound.src = process.env.PUBLIC_URL + weaponItem.sound;

	const finish = (winner) => {
		if (winner === 1) {
			localStorage.setItem(
				"dollary",
				+localStorage.getItem("dollary") + lvl * 10
			);
			let xp = +localStorage.getItem("xp") + lvl * 10;
			if (xp >= +localStorage.getItem("level") * 1000) {
				xp -= +localStorage.getItem("level") * 1000;
				localStorage.setItem("level", lvl + 1);
			} else {
				localStorage.setItem("xp", xp);
			}
			props.onChange();
		}
	};

	const fightRound = () => {
		if (leftID !== "") {
			let wdmg = weaponItem.maxDmg - weaponItem.minDmg;
			wdmg = Math.round(Math.random() * wdmg) + weaponItem.minDmg;
			const critChance = (((stats[4] * 5) / lvl) * 2) / 100;
			let crit = 1;
			if (critChance > 0.5) {
				if (Math.random() < 0.5) crit = 2;
			} else if (Math.random() < critChance) crit = 2;
			let armor =
				stats[5] / (lvl * (+localStorage.getItem("battleStat") + 1)) / 100;
			if (armor > 0.1 * (+localStorage.getItem("battleStat") + 1))
				armor = 0.1 * (+localStorage.getItem("battleStat") + 1);
			let dmg =
				wdmg *
				((stats[localStorage.getItem("battleStat")] + 1) / 10) *
				0.5 *
				crit *
				(1 - armor);
			dmg -= stats[localStorage.getItem("battleStat")] / 2;
			if (dmg < 0) dmg = 1;
			setEnemyHP(enemyHP - dmg);
			setLeftID("");
			setRightID("weaponRight");
		} else {
			const critChance = (((stats[4] * 5) / lvl) * 2) / 100;
			let wdmg = weaponItem.maxDmg - weaponItem.minDmg;
			wdmg = Math.round(Math.random() * wdmg) + weaponItem.minDmg;
			let crit = 1;
			if (critChance > 0.5) {
				if (Math.random() < 0.5) crit = 2;
			} else if (Math.random() < critChance) crit = 2;
			let armor =
				stats[5] / (lvl * (+localStorage.getItem("battleStat") + 1)) / 100;
			if (armor > 0.1 * (+localStorage.getItem("battleStat") + 1))
				armor = 0.1 * (+localStorage.getItem("battleStat") + 1);
			let dmg =
				wdmg *
				((stats[localStorage.getItem("battleStat")] + 1) / 10) *
				0.5 *
				crit *
				(1 - armor);
			dmg -= stats[localStorage.getItem("battleStat")] / 2;
			if (dmg < 0) dmg = 1;
			setUserHP(userHP - dmg);
			setLeftID("weaponLeft");
			setRightID("");
		}
	};

	const play = () => {
		if (started) {
			setTimeout(() => {
				fightRound();
			}, 1500);
		}
	};

	useEffect(() => {
		if (started) {
			if (userHP <= 0 || enemyHP <= 0) {
				userSound.play();
				let winner = 0;
				userHP > 0 ? (winner = 1) : (winner = 0);
				finish(winner);
				localStorage.setItem("cviceniTime", Date.now() + 60 * 2 * 1000);
				setNewTime(localStorage.getItem("cviceniTime"));
				setCountDown(true);
				setStarted(false);
				return;
			}
			userSound.play();
			setTimeout(() => {
				fightRound();
			}, 1200);
		}
	}, [leftID]);

	useEffect(() => {
		setEnemyHP(stats[3] * 4 * (lvl + 1));
		setUserHP(stats[3] * 4 * (lvl + 1));
		setMaxEnemyHP(stats[3] * 4 * (lvl + 1));
		setMaxUserHP(stats[3] * 4 * (lvl + 1));
		if (started) {
			setLeftID("weaponLeft");
			setTimeout(1200);
			play();
		}
		if (!started) {
			setLeftID(null);
			setRightID("");
		}
	}, [started]);
	useEffect(() => {
		if (seconds + minutes <= 0) setCountDown(false);
	}, [seconds]);
	return !started ? (
		<Grid
			container
			style={{
				height: "100%",
				backgroundImage: "url('pictures/locations/cviceni.jpg')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<Grid item xs={2} />
			<Grid item xs={8}>
				<Grid container direction="column" style={{ height: "100%" }}>
					<Grid item xs={2} />
					<Grid
						item
						xs={8}
						style={{
							backgroundColor: "rgb(94, 94, 94,0.9)",
						}}
					>
						<Grid
							container
							direction="column"
							style={{ height: "100%", display: "flex", alignItems: "center" }}
						>
							<Grid item xs={2} style={{ fontSize: "5vh" }}>
								Cvičení!
							</Grid>
							<Grid item xs={8} style={{ marginLeft: "2vw" }}>
								{" "}
								Tohle je cvičení. Ale ber to jakože tohle není cvičení! U tabule
								jsi svým největším nepřítelem ty sám, proto se utkáš sám se
								sebou. Vyhraješ, získáš dollary, prohraješ, ztratíš dollary. Je
								to jenom na tobě
							</Grid>
							<Grid
								item
								xs={2}
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "space-around",
									paddingBottom: "2vh",
								}}
							>
								{countDown
									? (minutes < 10 ? "0" + minutes : minutes) +
									  ":" +
									  (seconds < 10 ? "0" + seconds : seconds)
									: ""}
								{countDown ? (
									<Button
										variant="contained"
										onClick={() => {
											localStorage.setItem(
												"kredity",
												+localStorage.getItem("kredity") - 10
											);
											props.onChange();
											setCountDown(false);
											setStarted(true);
										}}
										disabled={
											localStorage.getItem("kredity") >= 10 ? false : true
										}
									>
										Přeskočit za 10 kreditů
									</Button>
								) : (
									<Button
										variant="contained"
										onClick={() => {
											setStarted(true);
										}}
									>
										K tabuli!
									</Button>
								)}
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} />
				</Grid>
			</Grid>
			<Grid item xs={2} />
		</Grid>
	) : (
		<Grid
			container
			style={{
				height: "100%",
				backgroundImage: "url('pictures/locations/cviceni.jpg')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<Grid item xs={3} />
			<Grid item xs={2}>
				<Grid container direction="column" style={{ height: "100%" }}>
					<Grid item xs={2} />
					<Grid
						item
						xs={8}
						style={{
							backgroundColor: "rgb(94, 94, 94,0.9)",
						}}
					>
						<Grid container direction="column" style={{ height: "100%" }}>
							<Grid
								item
								xs={4}
								style={{
									backgroundImage:
										"url('" +
										process.env.PUBLIC_URL +
										classes[+localStorage.getItem("class") - 1] +
										"')",
									backgroundRepeat: "no-repeat",
									backgroundSize: "contain",
									backgroundPosition: "center",
								}}
							>
								<img
									id={leftID}
									src={weapon}
									alt=" "
									style={{
										position: "absolute",
										display: "none",
										zIndex: "10",
									}}
								/>
							</Grid>
							<Grid item xs={8} style={{ textAlign: "center" }}>
								<LinearProgress
									variant="determinate"
									value={(userHP / maxUserHP) * 100}
									style={{ height: "1vh" }}
								></LinearProgress>
								{Math.floor(userHP).toLocaleString("cs")}/
								{maxUserHP.toLocaleString("cs")} <br />
								<div className="enemyName">
									{localStorage.getItem("username")}
								</div>
								<div className="statC">
									<div>Matika: {stats[0].toLocaleString("cs")}</div>
									<div>Fyzika: {stats[1].toLocaleString("cs")}</div>
									<div>Programování: {stats[2].toLocaleString("cs")}</div>
									<div>Vůle k životu: {stats[3].toLocaleString("cs")}</div>
									<div>"Mozková kapacita": {stats[4].toLocaleString("cs")}</div>
									<div>Duchapřítomnost: {stats[5].toLocaleString("cs")}</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} />
				</Grid>
			</Grid>
			<Grid item xs={2}></Grid>
			<Grid item xs={2}>
				<Grid container direction="column" style={{ height: "100%" }}>
					<Grid item xs={2} />
					<Grid
						item
						xs={8}
						style={{
							backgroundColor: "rgb(94, 94, 94,0.9)",
						}}
					>
						<Grid container direction="column" style={{ height: "100%" }}>
							<Grid
								item
								xs={4}
								style={{
									backgroundImage:
										"url('" +
										process.env.PUBLIC_URL +
										classes[+localStorage.getItem("class") - 1] +
										"')",
									backgroundRepeat: "no-repeat",
									backgroundSize: "contain",
									backgroundPosition: "center",
									transform: "scaleX(-1)",
								}}
							>
								<img
									id={rightID}
									src={process.env.PUBLIC_URL + weapon}
									alt=" "
									style={{
										position: "absolute",
										display: "none",
										zIndex: "10",
									}}
								/>
							</Grid>
							<Grid item xs={8} style={{ textAlign: "center" }}>
								<LinearProgress
									variant="determinate"
									value={(enemyHP / maxEnemyHP) * 100}
									style={{ height: "1vh" }}
								></LinearProgress>
								{Math.floor(enemyHP).toLocaleString("cs")}/
								{maxEnemyHP.toLocaleString("cs")} <br />
								<div className="enemyName">
									{localStorage.getItem("username")}
								</div>
								<div className="statC">
									<div>Matika: {stats[0].toLocaleString("cs")}</div>
									<div>Fyzika: {stats[1].toLocaleString("cs")}</div>
									<div>Programování: {stats[2].toLocaleString("cs")}</div>
									<div>Vůle k životu: {stats[3].toLocaleString("cs")}</div>
									<div>"Mozková kapacita": {stats[4].toLocaleString("cs")}</div>
									<div>Duchapřítomnost: {stats[5].toLocaleString("cs")}</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} />
				</Grid>
			</Grid>
			<Grid item xs={3} />
		</Grid>
	);
}

export default Cviceni;
