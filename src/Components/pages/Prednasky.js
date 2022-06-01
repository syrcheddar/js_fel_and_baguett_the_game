import { Button, Grid, Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Prednaska from "./Prednaska";

function Prednasky(props) {
	const [inProgress, setInProgress] = useState(
		localStorage.getItem("prednaska") == null ? false : true
	);
	const [menu, setMenu] = useState(false);
	const [taskNumber, setTaskNumber] = useState(0);
	const tasks = [
		{
			name: "Lineární Algebra",
			info: "Není to žádná sranda, ale naučíš se dost",
			xp: 1200,
			money: 27,
			duration: 300,
		},
		{
			name: "Základy Podnikání",
			info: "Hezky se prospíš a ještě vyděláš",
			xp: 50,
			money: 380,
			duration: 300,
		},
		{
			name: "Enterprise Architektury",
			info: "Je to na chvíli... Aspoň zjistiě jak to na vejšce chodí",
			xp: 10,
			money: 10,
			duration: 10,
		},
	];
	const finish = () => {
		setInProgress(false);
		props.onChange();
	};
	const startLesson = () => {
		const time = new Date().getTime();
		const prednaska = {};
		prednaska.startTime = time;
		prednaska.data = tasks[taskNumber];
		localStorage.setItem("prednaska", JSON.stringify(prednaska));
		setInProgress(true);
	};
	const refresh = () => {
		return inProgress ? (
			<Prednaska
				prednaska={JSON.parse(localStorage.getItem("prednaska"))}
				onFinish={() => {
					finish();
				}}
			/>
		) : (
			<>
				<div
					style={{
						height: "100%",
						width: "100%",
						backgroundImage: "url('pictures/locations/prednaska.jpeg')",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<img
						src={process.env.PUBLIC_URL + "pictures/chars/cvut.png"}
						alt=" "
						style={{
							height: "20vh",
							cursor: "pointer",
							position: "absolute",
							left: "80vw",
						}}
						className="cvut"
						onClick={() => {
							setMenu(true);
						}}
					/>
					{menu ? (
						<div
							style={{
								position: "absolute",
								height: "50vh",
								width: "50vw",
								left: "0",
								right: "0",
								marginLeft: "auto",
								marginRight: "auto",
								top: "0",
								bottom: "0",
								marginTop: "auto",
								marginBottom: "auto",
								backgroundColor: "rgb(94, 94, 94, 0.9)",
							}}
						>
							<Grid
								container
								direction="column"
								style={{ width: "auto", height: "100%" }}
							>
								<Grid
									item
									xs={2.5}
									style={{
										display: "flex",
										justifyContent: "flex-end",
										textAlign: "left",
									}}
								>
									<h1 style={{ width: "100%", paddingLeft: "1vw" }}>
										{tasks[taskNumber].name}
									</h1>
									<CloseIcon
										className="close"
										fontSize="large"
										style={{
											marginTop: "2vh",
											marginRight: "1vw",
											cursor: "pointer",
										}}
										onClick={() => {
											setMenu(false);
										}}
									/>
								</Grid>
								<Grid
									item
									xs={1}
									style={{ display: "flex", justifyContent: "space-evenly" }}
								>
									<Button
										variant="contained"
										onClick={() => {
											setTaskNumber(0);
										}}
										className={taskNumber==0 ? "bttnselected" :""}
									>
										{" "}
										Task 1
									</Button>
									<Button
										variant="contained"
										onClick={() => {
											setTaskNumber(1);
										}}
										className={taskNumber==1 ? "bttnselected" :""}
									>
										{" "}
										Task 2
									</Button>
									<Button
										variant="contained"
										onClick={() => {
											setTaskNumber(2);
										}}
										className={taskNumber==2 ? "bttnselected" :""}
									>
										{" "}
										Task 3
									</Button>
								</Grid>
								<Grid
									item
									xs={7}
									style={{ display: "flex", justifyContent: "flex-end" }}
								>
									<Grid
										container
										style={{ display: "flex", flexDirection: "column" }}
									>
										<p style={{ marginLeft: "2vw", marginTop: "3vh" }}>
											{tasks[taskNumber].info} <br />
											Zkušenosti: {tasks[taskNumber].xp} <br />
											Dollary: {tasks[taskNumber].money} <br /> Délka přednášky:{" "}
											{Math.floor(tasks[taskNumber].duration / 60)} minut{" "}
											{tasks[taskNumber].duration % 60 > 0
												? "a " + (tasks[taskNumber].duration % 60) + " vteřin"
												: ""}
										</p>
									</Grid>
								</Grid>
								<Grid
									item
									xs={1.5}
									style={{ display: "flex", justifyContent: "flex-end" }}
								>
									<Grid container className="start">
										<Button
											variant="contained"
											onClick={() => {
												startLesson();
											}}
										>
											Začít přednášku
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</div>
					) : (
						<></>
					)}
				</div>
			</>
		);
	};
	useEffect(() => {
		refresh();
	}, [inProgress]);
	return refresh();
}

export default Prednasky;
