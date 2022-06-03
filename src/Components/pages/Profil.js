import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import "./Profil.css";
import Character from "./Character";
import TopItems from "./TopItems";

function Profil(props) {
	const [inventory, setInventory] = useState(
		JSON.parse(localStorage.getItem("inventory"))
	);
	const [change, setChange] = useState(false);
	const refreshAll = () => {
		change ? setChange(false) : setChange(true);
	};
	useEffect(() => {
		setInventory(JSON.parse(localStorage.getItem("inventory")));
		reload();
	}, [change]);
	useEffect(() => {
		refreshAll();
		reload();
	}, [inventory]);
	const reload = () => {
		return (
			<Grid container style={{ width: "auto", height: "100%" }}>
				<Character
					onChange={props.onChange}
					change={change}
					refreshAll={() => {
						refreshAll();
					}}
				/>
				<Grid item xs={7} style={{ maxHeight: "100%" }}>
					<Grid
						container
						direction="column"
						style={{
							width: "auto",
							height: "100%",
							backgroundImage:
								"url('" +
								process.env.PUBLIC_URL +
								"/pictures/locations/studovna.jpg')",
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
						}}
					>
						<TopItems
							onChange={props.onChange}
							change={change}
							refreshAll={() => refreshAll()}
							style={{
								maxHeight: "16.6667%",
							}}
						/>
						<Grid item xs={6}></Grid>
						<Grid item xs={3}></Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	};
	return reload();
}

export default Profil;
