import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ClassInfo from "./ClassInfo";
import itemsBuffet from "../other/itemsPaperStore.json";

function CreateAccount() {
	const sitmanName = "Siťák";
	const oinerdName = "Óíčkař";
	const kyrguyName = "Kyrák";
	const defName = "Noobguy";
	const [chosenClass, changeClass] = useState(1);
	const [chosenClassName, setClassName] = useState(sitmanName);
	const [classname, setClassname] = useState("");
	const [classnameCenter, setClassnameCenter] = useState("");
	const [classnameLeft, setClassnameLeft] = useState("");
	const [classnameRight, setClassnameRight] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		switch (chosenClass) {
			case 1:
				setClassName(sitmanName);
				setClassname("");
				setClassnameCenter("grow-center");
				setClassnameLeft("");
				setClassnameRight("");
				break;
			case 2:
				setClassName(oinerdName);
				setClassname("classs-left");
				setClassnameCenter("");
				setClassnameLeft("");
				setClassnameRight("grow-left");
				break;
			case 3:
				setClassName(kyrguyName);
				setClassnameCenter("");
				setClassnameLeft("grow-right");
				setClassnameRight("");
				setClassname("classs-right");
				break;
			default:
				setClassName(defName);
				setClassname("");
		}
	});
	function changeClassInfoMinus() {
		if (chosenClass === 1) {
			changeClass(3);
		} else {
			changeClass(chosenClass - 1);
		}
	}
	function changeClassInfoPlus() {
		if (chosenClass === 3) {
			changeClass(1);
		} else {
			changeClass(chosenClass + 1);
		}
	}
	function saveAndRedirect() {
		localStorage.setItem("class", chosenClass);
		navigate("/setname");
		switch (chosenClass) {
			case 1:
				localStorage.setItem("stats", JSON.stringify([1, 1, 1, 1, 1, 1]));
				localStorage.setItem("prices", JSON.stringify([1, 1, 1, 1, 1, 1]));
				localStorage.setItem("battleStat", 2);
				break;
			case 2:
				localStorage.setItem("stats", JSON.stringify([1, 1, 1, 1, 1, 3]));
				localStorage.setItem("prices", JSON.stringify([1, 1, 1, 1, 1, 3]));
				localStorage.setItem("battleStat", 0);
				break;
			case 3:
				localStorage.setItem("stats", JSON.stringify([1, 1, 1, 1, 1, 5]));
				localStorage.setItem("prices", JSON.stringify([1, 1, 1, 1, 1, 5]));
				localStorage.setItem("battleStat", 1);
				break;
			default:
		}
	}

	return (
		<Grid container direction="column" className="create-account">
			<Grid item xs={2} className="info">
				<h1>Fel and Baguett</h1>
			</Grid>
			<Grid item xs={8} className="classes">
				<Grid container className="class">
					<Grid item xs={4} className="inf">
						<h2>O hře:</h2>
						<article>
							Vyber si svoji classu, svůj obor na FELu a vydej se vzhůru za
							dobrodružstvím. Čekají tě hodiny na přednáškách... Vydělávej
							dollary a kredity... Kupuj bagety, boty, zbraně... Obětuj krev
							slzy a pot u tabule na cvičení, kde jsi Ty sám svým největším
							nepřítelem... Jestli jsi uspěl se ale ukáže až u zkoušky, kde na
							tebe čeká nejeden kantor. Poraž je všechny a uspěj v Fel and
							baguett.
						</article>
						<h1>{chosenClassName}</h1>
						<article>
							<ClassInfo class={chosenClass} />
						</article>
					</Grid>
					<Grid item xs={8}>
						<Grid
							container
							direction="column"
							style={{ height: "100%", overflow: "hidden" }}
						>
							<Grid item xs={9} className={"classs "}>
								<div
									className={"images " + classname + " " + classnameLeft}
									onClick={() => {
										if (chosenClass === 2) {
											changeClassInfoMinus();
											changeClassInfoMinus();
										} else if (chosenClass === 1) {
											changeClassInfoMinus();
										}
									}}
								>
									<img
										src={
											process.env.PUBLIC_URL + "/pictures/chars/kyr-picture.png"
										}
										alt=" "
										className="img"
									/>
								</div>
								<div
									className={"images " + classname + " " + classnameCenter}
									onClick={() => {
										if (chosenClass === 2) {
											changeClassInfoMinus();
										} else if (chosenClass === 3) {
											changeClassInfoPlus();
										}
									}}
								>
									<img
										src={
											process.env.PUBLIC_URL + "/pictures/chars/sit-picture.png"
										}
										alt=" "
										className="img"
									/>
								</div>
								<div
									className={"images " + classname + " " + classnameRight}
									onClick={() => {
										if (chosenClass === 3) {
											changeClassInfoPlus();
											changeClassInfoPlus();
										} else if (chosenClass === 1) {
											changeClassInfoPlus();
										}
									}}
								>
									<img
										src={
											process.env.PUBLIC_URL + "/pictures/chars/oi-picture.png"
										}
										alt=" "
										className="img"
									/>
								</div>
							</Grid>
							<Grid item xs={3} className="bttns">
								<Button
									className="button"
									variant="contained"
									size="large"
									onClick={changeClassInfoMinus}
								>
									Previous
								</Button>
								<Button
									className="button"
									variant="contained"
									size="large"
									onClick={changeClassInfoPlus}
								>
									Next
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={2} className="continue">
				<Button
					className="button"
					variant="contained"
					size="large"
					onClick={saveAndRedirect}
				>
					Continue
				</Button>
			</Grid>
		</Grid>
	);
}
export default CreateAccount;
