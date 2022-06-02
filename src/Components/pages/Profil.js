import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import "./Profil.css";
import Character from "./Character";
import TopItems from "./TopItems";

function Profil(props) {
	const refreshAll = () => {};
	return (
		<Grid container style={{ width: "auto", height: "100%" }}>
			<Character onChange={props.onChange} />
			<Grid item xs={7}>
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
					<TopItems onChange={props.onChange} refreshAll={() => refreshAll()} />
					<Grid item xs={6}></Grid>
					<Grid item xs={3}></Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Profil;
