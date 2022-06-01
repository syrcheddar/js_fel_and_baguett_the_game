import React, { useState } from "react";
import { Button, Grid, Input } from "@mui/material";
import "./SetName.css";
import { useNavigate } from "react-router-dom";
import itemsPaperStore from "../other/itemsPaperStore.json";
import itemsBufet from "../other/itemsBuffet.json";

function SetName(props) {
	const navigate = useNavigate();
	const initials = { username: "", email: "", password: "" };
	const [formValues, setFormValues] = useState(initials);
	const [errorMessage, setErrorMessage] = useState("");

	const saveData = () => {
		// Preparing game, saving data to local storage
		localStorage.setItem("email", formValues.email);
		localStorage.setItem("password", formValues.password);
		localStorage.setItem("username", formValues.username);
		localStorage.setItem("dollary", 100);
		localStorage.setItem("kredity", 50);
		localStorage.setItem("level", 1);
		const inventory = [null, null, null, null, null];
		localStorage.setItem("inventory", JSON.stringify(inventory));
		const paperShop = [
			itemsPaperStore[Math.floor(Math.random() * itemsPaperStore.length)],
			itemsPaperStore[Math.floor(Math.random() * itemsPaperStore.length)],
			itemsPaperStore[Math.floor(Math.random() * itemsPaperStore.length)],
			itemsPaperStore[Math.floor(Math.random() * itemsPaperStore.length)],
		];
		paperShop[1].price = 15;
		paperShop[1].stats = [10, 1, 1, 4, 10, 3];
		paperShop[2].price = 15;
		paperShop[2].stats = [1, 10, 1, 4, 10, 3];
		paperShop[3].price = 15;
		paperShop[3].stats = [3, 3, 3, 4, 10, 3];
		paperShop[0].price = 15;
		paperShop[0].stats = [1, 1, 10, 4, 10, 3];
		for (let item of paperShop) {
			if (item.itemType === "zbran") {
				item.minDmg = 1;
				item.maxDmg = 2;
			}
		}
		const bufet = [
			itemsBufet[Math.floor(Math.random() * itemsBufet.length)],
			itemsBufet[Math.floor(Math.random() * itemsBufet.length)],
			itemsBufet[Math.floor(Math.random() * itemsBufet.length)],
			itemsBufet[Math.floor(Math.random() * itemsBufet.length)],
		];
		bufet[1].price = 15;
		bufet[1].stats = [10, 1, 1, 4, 10, 3];
		bufet[2].price = 15;
		bufet[2].stats = [1, 10, 1, 4, 10, 3];
		bufet[3].price = 15;
		bufet[3].stats = [3, 3, 3, 4, 10, 3];
		bufet[0].price = 15;
		bufet[0].stats = [1, 1, 10, 4, 10, 3];
		localStorage.setItem("paperShop", JSON.stringify(paperShop));
		localStorage.setItem("bufet", JSON.stringify(bufet));
		localStorage.setItem("bossNumber", 0);
		localStorage.setItem("xp", 0);

		const gear = [null, null, null, null, null, null, null, null, null, null];
		localStorage.setItem("gear", JSON.stringify(gear));
		navigate("/");
		props.onLoggedChange(formValues.username);
	};
	//checks input name
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
		if (formValues.username.length > 12) {
			setErrorMessage("Jméno je příliš dlouhé");
		} else setErrorMessage("");
	};
	return (
		<Grid container style={{ height: "100vh" }}>
			<Grid item xs={3} />
			<Grid item xs={6}>
				<Grid container direction="column" style={{ height: "100vh" }}>
					<Grid item xs={3} />
					<Grid item xs={6} className="login-form">
						<Grid container direction="column" className="lgf">
							<Grid item xs={4} className="nadpis">
								Set your username:
							</Grid>
							<Grid item xs={5} className="inputy">
								<Grid container direction="column">
									<Grid
										item
										xs={4}
										className="input"
										style={{
											display: "flex",
											flexDirection: "column",
											textAlign: "left",
										}}
									>
										<input
											id="username"
											type="username"
											name="username"
											onChange={handleChange}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													if (errorMessage === "") saveData();
												}
											}}
										/>
										<div>{errorMessage + " "}</div>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={3} className="bttn">
								<Button
									className="button"
									variant="secondary"
									size="meduim"
									onClick={() => {
										navigate("/");
									}}
								>
									Back
								</Button>
								<Button
									className="button"
									variant="contained"
									size="meduim"
									onClick={() => {
										if (errorMessage == "") saveData();
									}}
								>
									Play game
								</Button>
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

export default SetName;
