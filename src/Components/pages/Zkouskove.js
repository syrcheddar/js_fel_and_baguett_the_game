import { Button, Grid, LinearProgress } from "@mui/material";
import { display, getThemeProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Cviceni.css";
import bosses from "../other/Bosses.json";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "./CountDown";

function Zkouskove(props) {
	const lvl = +localStorage.getItem("level");
	const bossNumber = +localStorage.getItem("bossNumber");

	const [started, setStarted] = useState(false);
	let tt = Date.now();
	if (localStorage.getItem("zkouskaTime") != null)
		tt = +localStorage.getItem("zkouskaTime");
	const [minutes, seconds, setNewTime] = useCountdown(tt);
	const [countDown, setCountDown] = useState(minutes + seconds > 0);

	const stats = JSON.parse(localStorage.getItem("stats"));
	const classes = [
		"/pictures/chars/sit-picture.png",
		"/pictures/chars/oi-picture.png",
		"/pictures/chars/kyr-picture.png",
	];

	let boss = null;
	if (bossNumber < 6) boss = bosses[bossNumber];
	if (boss == null)
		boss = {
			name: "",
			weapon: "",
			src: "",
			stats: [50, 50, 100, 50, 50],
			battleStat: 0,
			lvl: 0,
		};
	const [leftID, setLeftID] = useState(null);
	const [rightID, setRightID] = useState("");
	let weaponItem = JSON.parse(localStorage.getItem("gear"))[4];
	let weapon = "";
	if (weaponItem == null) {
		weaponItem = {
			minDmg: lvl * 10,
			maxDmg: 20 * lvl,
			sound: "/sounds/punch.mp3",
		};
		weapon = process.env.PUBLIC_URL + "/pictures/items/weapons/fist.png";
	} else weapon = process.env.PUBLIC_URL + weaponItem.src;
	const [userHP, setUserHP] = useState(stats[3] * 4 * (lvl + 1));
	const [enemyHP, setEnemyHP] = useState(boss.stats[3] * 4 * (boss.lvl + 1));
	const [maxUserHP, setMaxUserHP] = useState(stats[3] * 4 * (lvl + 1));
	const [maxEnemyHP, setMaxEnemyHP] = useState(
		boss.stats[3] * 4 * (boss.lvl + 1)
	);
	let userSound = new Audio();
	userSound.src = process.env.PUBLIC_URL + weaponItem.sound;
	let bossSound = new Audio();
	bossSound.src = process.env.PUBLIC_URL + boss.sound;

	const finish = (winner) => {
		if (winner === 1) {
			localStorage.setItem(
				"dollary",
				+localStorage.getItem("dollary") + boss.lvl * 100
			);
			let xp = +localStorage.getItem("xp") + boss.lvl * 1000;
			if (xp >= +localStorage.getItem("level") * 1000) {
				xp -= +localStorage.getItem("level") * 1000;
				let lvl = +localStorage.getItem("level") + 1;
				localStorage.setItem("level", lvl);
			} else {
				localStorage.setItem("xp", xp);
			}
			localStorage.setItem("bossNumber", bossNumber + 1);
			boss = bosses[bossNumber + 1];

			props.onChange();
		}
	};

	const fightRound = () => {
		if (leftID !== "") {
			let wdmg = weaponItem.maxDmg - weaponItem.minDmg;
			wdmg = Math.round(Math.random() * wdmg) + weaponItem.minDmg;
			const critChance = (((stats[4] * 5) / boss.lvl) * 2) / 100;
			let crit = 1;
			if (critChance > 0.5) {
				if (Math.random() < 0.5) crit = 2;
			} else if (Math.random() < critChance) crit = 2;
			let armor =
				boss.stats[5] /
				(+localStorage.getItem("level") * (boss.battleStat + 1)) /
				100;
			if (armor > 0.1 * (boss.battleStat + 1))
				armor = 0.1 * (boss.battleStat + 1);
			let dmg =
				wdmg *
				((stats[localStorage.getItem("battleStat")] + 1) / 10) *
				0.5 *
				crit *
				(1 - armor);
			dmg -= boss.stats[+localStorage.getItem("battleStat")] / 2;
			dmg = Math.round(dmg);
			if (dmg < 0) dmg = 1;
			setEnemyHP(enemyHP - dmg);
			setLeftID("");
			setRightID("weaponRight");
		} else {
			let wdmg = boss.maxDmg - boss.minDmg;
			wdmg = Math.round(Math.random() * wdmg) + boss.minDmg;
			const critChance = (((boss.stats[4] * 5) / lvl) * 2) / 100;
			let crit = 1;
			if (critChance > 0.5) {
				if (Math.random() < 0.5) crit = 2;
			} else if (Math.random() < critChance) crit = 2;
			let armor =
				stats[5] / (boss.lvl * (+localStorage.getItem("battleStat") + 1)) / 100;
			if (armor > 0.1 * (+localStorage.getItem("battleStat") + 1))
				armor = 0.1 * (+localStorage.getItem("battleStat") + 1);
			let dmg =
				wdmg *
				((stats[localStorage.getItem("battleStat")] + 1) / 10) *
				0.5 *
				crit *
				(1 - armor);
			dmg -= stats[boss.battleStat] / 2;
			dmg = Math.round(dmg);
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
			}, 1200);
		}
	};

	useEffect(() => {
		if (started) {
			if (leftID == "weaponLeft") userSound.play();
			else bossSound.play();
			if (userHP <= 0 || enemyHP <= 0) {
				bossSound.pause();
				userSound.pause();
				let winner = 0;
				userHP > 0 ? (winner = 1) : (winner = 0);
				finish(winner);
				localStorage.setItem("zkouskaTime", Date.now() + 60 * 5 * 1000);
				setNewTime(localStorage.getItem("zkouskaTime"));
				setCountDown(true);
				setStarted(false);
				return;
			}
			setTimeout(() => {
				fightRound();
			}, 1200);
		}
	}, [leftID]);

	useEffect(() => {
		setEnemyHP(boss.stats[3] * 4 * (boss.lvl + 1));
		setUserHP(stats[3] * 4 * (lvl + 1));
		setMaxEnemyHP(boss.stats[3] * 4 * (boss.lvl + 1));
		setMaxUserHP(stats[3] * 4 * (lvl + 1));
		if (started) {
			setLeftID("weaponLeft");
			setTimeout(1500);
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
				backgroundImage:
					"url('" +
					process.env.PUBLIC_URL +
					"/pictures/locations/cviceni.jpg')",
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
								Zkouškové!
							</Grid>
							<Grid item xs={8}>
								A jéje... Je to tady zase... Zkouškové období. Buď na pozoru,
								protože tihle kantoři ti to určitě nedají zadarmo.
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
										Ke zkoušce!
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
				backgroundImage:
					"url('" +
					process.env.PUBLIC_URL +
					"/pictures/locations/cviceni.jpg')",
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
						xs={7}
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
					<Grid item xs={3} />
				</Grid>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={2}>
				<Grid container direction="column" style={{ height: "100%" }}>
					<Grid item xs={2} />
					<Grid
						item
						xs={7}
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
										"url('" + process.env.PUBLIC_URL + boss.src + "')",
									backgroundRepeat: "no-repeat",
									backgroundSize: "contain",
									backgroundPosition: "center",
									transform: "scaleX(-1)",
								}}
							>
								<img
									id={rightID}
									src={process.env.PUBLIC_URL + boss.weapon}
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
								<div className="enemyName">{boss.name}</div>
								<div className="statC">
									<div>Matika: {boss.stats[0].toLocaleString("cs")}</div>
									<div>Fyzika: {boss.stats[1].toLocaleString("cs")}</div>
									<div>Programování: {boss.stats[2].toLocaleString("cs")}</div>
									<div>Vůle k životu: {boss.stats[3].toLocaleString("cs")}</div>
									<div>
										"Mozková kapacita": {boss.stats[4].toLocaleString("cs")}
									</div>
									<div>
										Duchapřítomnost: {boss.stats[5].toLocaleString("cs")}
									</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={3} />
				</Grid>
			</Grid>
			<Grid item xs={3} />
		</Grid>
	);
}

export default Zkouskove;
