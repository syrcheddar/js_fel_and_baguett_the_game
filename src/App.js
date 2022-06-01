import React from "react";
import "./App.css";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Components/Sidebar/SideBar";
import CreateAccount from "./Components/login/CreateAccount";
import SetName from "./Components/login/SetName";
import Zkouskove from "./Components/pages/Zkouskove";
import Profil from "./Components/pages/Profil";
import Prednasky from "./Components/pages/Prednasky";
import Papirnictvi from "./Components/pages/Papirnictvi";
import Cviceni from "./Components/pages/Cviceni";
import Bufet from "./Components/pages/Bufet";
import NotFound from "./Components/pages/Notfound";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	let userLoggedName = localStorage.getItem("username");
	const [logged, setLogin] = useState(userLoggedName);
	const [change, setChange] = useState(false);
	const updateSidebar = () => {
		change ? setChange(false) : setChange(true);
	};
	return logged ? (
		<DndProvider backend={HTML5Backend}>
			<Router>
				<Grid container>
					<Grid item xs={2}>
						<SideBar
							logged={logged}
							onLoggedChange={setLogin}
							change={change}
						/>
					</Grid>
					<Grid item xs={10}>
						<Routes>
							<Route
								path="/zkouskove"
								element={<Zkouskove onChange={updateSidebar} />}
							/>
							<Route
								path="/bufet"
								element={<Bufet onChange={updateSidebar} />}
							/>
							<Route
								path="/cviceni"
								element={<Cviceni onChange={updateSidebar} />}
							/>
							<Route
								path="/papirnictvi"
								element={<Papirnictvi onChange={updateSidebar} />}
							/>
							<Route
								path="/prednasky"
								element={<Prednasky onChange={updateSidebar} />}
							/>
							<Route
								path="/profil"
								element={<Profil onChange={updateSidebar} />}
							/>
							<Route path="*" element={<NotFound />} />
							<Route
								exact
								path="/"
								element={<Profil onChange={updateSidebar} />}
							/>
						</Routes>
					</Grid>
				</Grid>
			</Router>
		</DndProvider>
	) : (
		<Router>
			<Routes>
				<Route exact path="/" element={<CreateAccount />} />
				<Route
					exact
					path="/setname"
					element={<SetName logged={logged} onLoggedChange={setLogin} />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
