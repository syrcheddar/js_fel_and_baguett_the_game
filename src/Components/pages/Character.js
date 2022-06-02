import React, { useEffect, useState } from "react";
import { Button, Grid, LinearProgress } from "@mui/material";
import "./Profil.css";
import GearPlace from "../other/Items/GearPlace";
import GearItem from "../other/Items/GearItem";

function Character(props) {
	let prices = JSON.parse(localStorage.getItem("prices"));
	let sound = new Audio();
	sound.src = process.env.PUBLIC_URL + "/sounds/drop.wav";
	const [inventory, setInventory] = useState(
		JSON.parse(localStorage.getItem("inventory"))
	);
	const [picture, setPicture] = useState(() => {
		switch (localStorage.getItem("class")) {
			case "1":
				return process.env.PUBLIC_URL + "/pictures/chars/sit-picture.png";
			case "2":
				return process.env.PUBLIC_URL + "/pictures/chars/oi-picture.png";
			case "3":
				return process.env.PUBLIC_URL + "/pictures/chars/kyr-picture.png";
			default:
				return "";
		}
	});
	let weaponItem =
		JSON.parse(localStorage.getItem("gear"))[4] != null
			? JSON.parse(localStorage.getItem("gear"))[4]
			: {
					minDmg: +localStorage.getItem("level") * 10,
					maxDmg: +localStorage.getItem("level") * 20,
			  };
	const [stats, setStats] = useState(JSON.parse(localStorage.getItem("stats")));

	const [gear, setGear] = useState(JSON.parse(localStorage.getItem("gear")));

	const handleAdd = (e) => {
		if (+localStorage.getItem("dollary") - prices[e] >= 0) {
			const newStats = stats;
			newStats[e] = newStats[e] + 1;
			setStats(newStats);
			prices[e] += 1;
			localStorage.setItem("prices", JSON.stringify(prices));
			localStorage.setItem("stats", JSON.stringify(newStats));
			localStorage.setItem(
				"dollary",
				+localStorage.getItem("dollary") - +prices[e]
			);
			refresh();
			props.onChange();
		}
	};
	const putOn = (item, invSlot, gearSlot) => {
		sound.play();
		let newInv = JSON.parse(localStorage.getItem("inventory"));
		newInv[invSlot] = null;
		localStorage.setItem("inventory", JSON.stringify(newInv));
		setInventory(newInv);
		let newGear = JSON.parse(localStorage.getItem("gear"));
		item.gearSlot = gearSlot;
		newGear[gearSlot] = item;
		localStorage.setItem("gear", JSON.stringify(newGear));
		setGear(newGear);
		const newStats = JSON.parse(localStorage.getItem("stats"));
		newStats[0] += item.stats[0];
		newStats[1] += item.stats[1];
		newStats[2] += item.stats[2];
		newStats[3] += item.stats[3];
		newStats[4] += item.stats[4];
		newStats[5] += item.stats[5];
		localStorage.setItem("stats", JSON.stringify(newStats));
		setStats(newStats);
		refresh();
		props.refreshAll();
	};
	useEffect(() => {
		refresh();
	}, [props.change]);
	const refresh = () => {
		setGear(JSON.parse(localStorage.getItem("gear")));
		setInventory(JSON.parse(localStorage.getItem("inventory")));
		setStats(JSON.parse(localStorage.getItem("stats")));
		reload();
	};

	let armor =
		stats[5] /
		(+localStorage.getItem("level") *
			(+localStorage.getItem("battleStat") + 1)) /
		100;
	if (armor > 0.1 * (+localStorage.getItem("battleStat") + 1))
		armor = 0.1 * (+localStorage.getItem("battleStat") + 1);

	const critChance =
		(((stats[4] * 5) / +localStorage.getItem("level")) * 2) / 100 > 0.5
			? 0.5
			: (((stats[4] * 5) / +localStorage.getItem("level")) * 2) / 100;
	const reload = () => {
		return (
			<Grid item xs={5}>
				<Grid
					container
					direction="column"
					style={{ width: "auto", height: "100%" }}
				>
					<Grid item xs={7}>
						<Grid
							container
							direction="column"
							style={{ width: "auto", height: "100%", flexWrap: "nowrap" }}
						>
							<Grid item xs={9}>
								<Grid container style={{ width: "auto", height: "100%" }}>
									<Grid item xs={3}>
										<Grid
											container
											direction="column"
											style={{ width: "auto", height: "100%" }}
											className="item-box-odd"
										>
											<Grid item xs={4} className="item">
												{gear[0] !== null ? (
													<GearItem item={gear[0]} />
												) : (
													<GearPlace
														itemType="capec"
														putOn={(item, invSlot) => putOn(item, invSlot, 0)}
													/>
												)}
											</Grid>
											<Grid item xs={4} className="item">
												{gear[1] !== null ? (
													<GearItem item={gear[1]} />
												) : (
													<GearPlace
														itemType="bagl"
														putOn={(item, invSlot) => putOn(item, invSlot, 1)}
													/>
												)}
											</Grid>
											<Grid item xs={4} className="item">
												{gear[2] !== null ? (
													<GearItem item={gear[2]} />
												) : (
													<GearPlace
														itemType="kalhoty"
														putOn={(item, invSlot) => putOn(item, invSlot, 2)}
													/>
												)}
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={6}>
										<Grid
											container
											direction="column"
											style={{ width: "auto", height: "100%" }}
										>
											<Grid item xs={9}>
												<img src={picture} style={{ width: "100%" }} alt=" " />
											</Grid>
											<Grid
												item
												xs={0.3}
												style={{
													backgroundColor: "#a1a1a1",
												}}
											>
												<LinearProgress
													variant="determinate"
													value={
														(localStorage.getItem("xp") /
															(localStorage.getItem("level") * 1000)) *
														100
													}
													style={{ height: "1vh" }}
												/>
											</Grid>
											<Grid
												item
												xs={1}
												style={{
													backgroundColor: "#a1a1a1",
													fontSize: "2vh",
													alignItems: "center",
													textAlign: "center",
												}}
											>
												{(+localStorage.getItem("xp")).toLocaleString("cs") +
													"/" +
													(
														+localStorage.getItem("level") * 1000
													).toLocaleString("cs") +
													" xp"}
											</Grid>
											<Grid
												item
												xs={1.7}
												style={{
													backgroundColor: "#a1a1a1",
													fontSize: "4vh",
													alignItems: "center",
													textAlign: "center",
												}}
											>
												{localStorage.getItem("username")}
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={3}>
										<Grid
											container
											direction="column"
											style={{ width: "auto", height: "100%" }}
											className="item-box"
										>
											<Grid item xs={4} className="item">
												{gear[6] !== null ? (
													<GearItem item={gear[6]} />
												) : (
													<GearPlace
														itemType="naramek"
														putOn={(item, invSlot) => putOn(item, invSlot, 6)}
													/>
												)}
											</Grid>
											<Grid item xs={4} className="item">
												{gear[7] !== null ? (
													<GearItem item={gear[7]} />
												) : (
													<GearPlace
														itemType="prsten"
														putOn={(item, invSlot) => putOn(item, invSlot, 7)}
													/>
												)}
											</Grid>
											<Grid item xs={4} className="item">
												{gear[8] !== null ? (
													<GearItem item={gear[8]} />
												) : (
													<GearPlace
														itemType="bageta"
														putOn={(item, invSlot) => putOn(item, invSlot, 8)}
													/>
												)}
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={3}>
								<Grid
									container
									style={{ width: "auto", height: "100%" }}
									className="item-box"
								>
									<Grid item xs={3} className="item">
										{gear[3] !== null ? (
											<GearItem item={gear[3]} />
										) : (
											<GearPlace
												itemType="boty"
												putOn={(item, invSlot) => putOn(item, invSlot, 3)}
											/>
										)}
									</Grid>
									<Grid item xs={3} className="item">
										{gear[4] !== null ? (
											<GearItem item={gear[4]} />
										) : (
											<GearPlace
												itemType="zbran"
												putOn={(item, invSlot) => putOn(item, invSlot, 4)}
											/>
										)}
									</Grid>
									<Grid item xs={3} className="item"></Grid>
									<Grid item xs={3} className="item">
										{gear[5] !== null ? (
											<GearItem item={gear[5]} />
										) : (
											<GearPlace
												itemType="bageta"
												putOn={(item, invSlot) => putOn(item, invSlot, 5)}
											/>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={5}>
						<Grid container direction="column" style={{ height: "100%" }}>
							<Grid item xs={2} className="nadpiskv">
								Kvality:
							</Grid>
							<Grid item xs={10}>
								<Grid container>
									<Grid item xs={6}>
										<Grid
											container
											direction="column"
											className="statcontainer"
										>
											<Grid item xs={4} className="stat">
												Matika: {stats[0].toLocaleString("cs")}
												<Button
													className="buttonStat"
													id={0}
													onClick={(e) => handleAdd(e.target.id)}
												>
													<div className="price" style={{ display: "none" }}>
														Cena: {prices[0]}
													</div>
													+
												</Button>
												{+localStorage.getItem("battleStat") === 0 ? (
													<div className="statInfo">
														<h4>Matika</h4>
														<h5>
															Z matiky se pro tvoji classu počítá požkození.
															Vzorec pro výpočet požkození je: Požkození zbraně
															* (Matika+1)/10 *0.5 .
														</h5>
														<h5>
															Aktuální požkození:{" "}
															{Math.round(
																((weaponItem.minDmg + weaponItem.maxDmg) / 2) *
																	((stats[0] + 1) / 10) *
																	0.56
															).toLocaleString("cs")}
															hp
														</h5>
													</div>
												) : (
													<div className="statInfo">
														<h4>Matika</h4>
														<h5>
															Matika je obranný stat proti jiným classám Snižuje
															požkození od classy která matiku využívá. Vzorec
															pro výpočet obrany proti matice je: Matika/2
														</h5>
														<h5>
															Aktuální obrana proti Matice:{" "}
															{Math.round(stats[0] / 2).toLocaleString("cs")}
														</h5>
													</div>
												)}
											</Grid>
											<Grid item xs={4} className="stat">
												Fyzika: {stats[1].toLocaleString("cs")}
												<Button
													className="buttonStat"
													id={1}
													onClick={(e) => handleAdd(e.target.id)}
												>
													<div className="price" style={{ display: "none" }}>
														Cena: {prices[1]}
													</div>
													+
												</Button>
												{+localStorage.getItem("battleStat") === 1 ? (
													<div className="statInfo">
														<h4>Fyzika</h4>
														<h5>
															Z fyziky se pro tvoji classu počítá požkození.
															Vzorec pro výpočet požkození je: Požkození zbraně
															* (Fyzika+1)/10 *0.5 .
														</h5>
														<h5>
															Aktuální požkození:{" "}
															{Math.round(
																((weaponItem.minDmg + weaponItem.maxDmg) / 2) *
																	((stats[1] + 1) / 10) *
																	0.56
															).toLocaleString("cs")}
															hp
														</h5>
													</div>
												) : (
													<div className="statInfo">
														<h4>Fyzika</h4>
														<h5>
															Fyzika je obranný stat proti jiným classám Snižuje
															požkození od classy která fyziku využívá. Vzorec
															pro výpočet obrany proti fyzice je: Fyzika/2
														</h5>
														<h5>
															Aktuální obrana proti fyzice:{" "}
															{Math.round(stats[1] / 2).toLocaleString("cs")}
														</h5>
													</div>
												)}
											</Grid>
											<Grid item xs={4} className="stat">
												Programování: {stats[2].toLocaleString("cs")}
												<Button
													className="buttonStat"
													id={2}
													onClick={(e) => handleAdd(e.target.id)}
												>
													<div className="price" style={{ display: "none" }}>
														Cena: {prices[2]}
													</div>
													+
												</Button>
												{+localStorage.getItem("battleStat") === 2 ? (
													<div className="statInfo">
														<h4>Programování</h4>
														<h5>
															Z programování se pro tvoji classu počítá
															požkození. Vzorec pro výpočet požkození je:
															Požkození zbraně * (Programování+1)/10 *0.5.
														</h5>
														<h5>
															Aktuální požkození:{" "}
															{Math.round(
																((weaponItem.minDmg + weaponItem.maxDmg) / 2) *
																	((stats[2] + 1) / 10) *
																	0.56
															).toLocaleString("cs")}
															hp
														</h5>
													</div>
												) : (
													<div className="statInfo">
														<h4>Programování</h4>
														<h5>
															Programování je obranný stat proti jiným classám
															Snižuje požkození od classy programování využívá.
															Vzorec pro výpočet obrany proti programování je:
															Programování/2
														</h5>
														<h5>
															Aktuální obrana proti programování:{" "}
															{Math.round(stats[2] / 2).toLocaleString("cs")}
														</h5>
													</div>
												)}
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={6}>
										<Grid
											container
											direction="column"
											className="statcontainer"
										>
											<Grid item xs={4} className="stat">
												Vůle k životu: {stats[3].toLocaleString("cs")}
												<Button
													className="buttonStat"
													id={3}
													onClick={(e) => handleAdd(e.target.id)}
												>
													<div className="price" style={{ display: "none" }}>
														Cena: {prices[3]}
													</div>
													+
												</Button>
												<div className="statInfo">
													<h4>Vůle k životu</h4>
													<h5>
														Z Vůle k životu se počítají body života. Vzorec pro
														výpočet hp je: Vůle k životu * 4 * (lvl + 1).
													</h5>
													<h5>
														Aktuální HP:{" "}
														{stats[3] *
															4 *
															(+localStorage.getItem("level") + 1)}
													</h5>
												</div>
											</Grid>
											<Grid item xs={4} className="stat">
												"Mozková kapacita": {stats[4].toLocaleString("cs")}
												<Button
													className="buttonStat"
													id={4}
													onClick={(e) => handleAdd(e.target.id)}
												>
													<div className="price" style={{ display: "none" }}>
														Cena: {prices[4]}
													</div>
													+
												</Button>
												<div className="statInfo">
													<h4>"Mozková kapacita"</h4>
													<h5>
														Z "mozkové kapacity" se počítá šance na kritický
														zásah. Vzorec pro výpočet šance na kritický zásah
														je: ((("Mozková kapacita") / Level nepřítele) * 2)
														Šance na kritický zásah nemůže přesáhnout hodnotu{" "}
														50%
													</h5>
													<h5>
														Aktuální šance na kritický zásah:{" "}
														{Math.round(critChance * 100)}%
													</h5>
												</div>
											</Grid>
											<Grid item xs={4} className="stat">
												Duchapřítomnost: {stats[5].toLocaleString("cs")}
												<Button id={5} style={{ visibility: "hidden" }}>
													+
												</Button>
												<div className="statInfo">
													<h4>Duchapřítomnost</h4>
													<h5>
														Duchapřítomnost zvyšuje redukci požkození, vzorec
														pro výpočet redukce požkození je: Duchapřítomnost /
														(Level nepřítele *{" "}
														{+localStorage.getItem("battleStat") + 1}) / 100
														Redukce požkození nemůže přesáhnout hodnotu{" "}
														{10 * (+localStorage.getItem("battleStat") + 1)}%
													</h5>
													<h5>
														Aktuální redukce požkození:{" "}
														{Math.round(armor * 100)}%
													</h5>
												</div>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	};
	useEffect(() => {
		refresh();
		reload();
	}, [props.change]);
	return reload();
}

export default Character;
