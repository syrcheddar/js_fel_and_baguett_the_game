import React, { useEffect, useState } from "react";
import { List, Grid, Button, ButtonGroup } from "@mui/material";
import "./SideBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { height } from "@mui/system";

function SideBar(props) {
	const [dollary, setDollary] = useState(localStorage.getItem("dollary"));
	const [kredity, setKredity] = useState(localStorage.getItem("kredity"));
	const [level, setLevel] = useState(localStorage.getItem("level"));
	const navigate = useNavigate();
	const [picture, setPicture] = useState(() => {
		switch (localStorage.getItem("class")) {
			case "1":
				return process.env.PUBLIC_URL + "/pictures/chars/sit-small.png";
			case "2":
				return process.env.PUBLIC_URL + "/pictures/chars/oi-small.png";
			case "3":
				return process.env.PUBLIC_URL + "/pictures/chars/kyr-small.png";
			default:
				return "";
		}
	});
	const location = useLocation();
	const [showSidebar, setShowSidebar] = useState(false);
	function reset() {
		localStorage.clear();
		navigate("/");
		props.onLoggedChange(localStorage.getItem("username"));
	}
	function doesRouteExist() {
		switch (location.pathname) {
			case "/profil":
			case "/prednasky":
			case "/papirnictvi":
			case "/bufet":
			case "/zkouskove":
			case "/":
			case "/cviceni":
				setShowSidebar(true);
				break;
			default:
				setShowSidebar(false);
		}
	}
	useEffect(() => {
		doesRouteExist();
	});
	useEffect(() => {
		setDollary(localStorage.getItem("dollary"));
		setKredity(localStorage.getItem("kredity"));
		setLevel(localStorage.getItem("level"));
	}, [props.change]);
	return showSidebar ? (
		<Grid container direction="column" className="side-bar">
			<Grid item xs={2} className="photo">
				<Grid container className="top-bar">
					<Grid item xs={6} className="picture">
						<img
							id="charIco"
							src={picture}
							height="90%"
							alt=" "
							onClick={() => navigate("/profil")}
							style={{ cursor: "pointer" }}
						/>
					</Grid>
					<Grid item xs={6} className="coins">
						<Grid container direction="column" className="coinss">
							<Grid item xs={4}>
								Dollary: {dollary}
							</Grid>
							<Grid item xs={4}>
								Level: {level}
							</Grid>
							<Grid item xs={4}>
								Kredity: {kredity}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				item
				xs={8}
				className="menu"
				style={{
					height: "66.666667%",
				}}
			>
				<ButtonGroup
					disableElevation
					variant="contained"
					orientation="vertical"
					className="buttons"
					size="large"
				>
					<Button className="buttn" onClick={() => navigate("/prednasky")}>
						<h3> Přednáška</h3>
					</Button>
					<Button className="buttn" onClick={() => navigate("/cviceni")}>
						<h3>Cvičení</h3>
					</Button>
					<Button className="buttn" onClick={() => navigate("/papirnictvi")}>
						<h3>Papírnictví</h3>
					</Button>
					<Button className="buttn" onClick={() => navigate("/bufet")}>
						<h3>Bufet</h3>
					</Button>
					<Button className="buttn" onClick={() => navigate("/zkouskove")}>
						<h3>Zkouškové</h3>
					</Button>
				</ButtonGroup>
			</Grid>
			<Grid item xs={1} className="footer" style={{ maxHeigth: "8.333333vh" }}>
				<Button
					className="buttn buttn1"
					onClick={reset}
					variant="secondary"
					style={{
						width: "100%",
						height: "100%",
						backgroundColor: "#747478",
						maxHeight: "100%",
						maxWidth: "100%",
					}}
				>
					<h3> Restartovat hru</h3>
				</Button>
			</Grid>
			<Grid item xs={1} className="footer">
				<h3>Benjamin Rodr SIT FEL ČVUT</h3>
			</Grid>

			<List></List>
		</Grid>
	) : (
		""
	);
}
export default SideBar;
