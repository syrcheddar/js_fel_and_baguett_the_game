import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShopItem from "../other/Items/ShopItem";
import Character from "./Character";
import SellItem from "./SellItem";
import TopItems from "./TopItems";

function Papirnictvi(props) {
	let sound = new Audio();
	sound.src = process.env.PUBLIC_URL + "/sounds/sell.wav";
	const [change, setChange] = useState(false);
	const [inventory, setInventory] = useState(
		JSON.parse(localStorage.getItem("inventory"))
	);
	const [shop, setShop] = useState(
		JSON.parse(localStorage.getItem("paperShop"))
	);

	const refreshAll = () => {
		change ? setChange(false) : setChange(true);
	};
	const sellItem = (item, invSlot) => {
		sound.play();
		if (JSON.parse(localStorage.getItem("inventory"))[invSlot] != null) {
			localStorage.setItem(
				"dollary",
				+localStorage.getItem("dollary") + item.price
			);
			const newInv = JSON.parse(localStorage.getItem("inventory"));
			newInv[invSlot] = null;
			localStorage.setItem("inventory", JSON.stringify(newInv));
			setInventory(newInv);
		}
	};
	useEffect(() => {
		setShop(JSON.parse(localStorage.getItem("paperShop")));
		setInventory(JSON.parse(localStorage.getItem("inventory")));
		reload();
	}, [change]);
	useEffect(() => {
		refreshAll();
		reload();
	}, [shop, inventory]);
	const reload = () => {
		return (
			<Grid
				container
				style={{ width: "auto", maxHeight: "100vh", height: "100%" }}
			>
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
						style={{ height: "100%", flexWrap: "nowrap" }}
					>
						<TopItems
							onChange={props.onChange}
							change={change}
							refreshAll={() => {
								refreshAll();
							}}
							shopNumber={1}
							style={{
								maxHeight: "16.6667%",
							}}
						/>
						<Grid item xs={7} style={{ overflow: "hidden" }}>
							<SellItem
								sellItem={(item, number) => sellItem(item, number)}
								src="/pictures/locations/papirnictvi.jpg"
							/>
						</Grid>
						<Grid item xs={3} style={{ display: "flex" }}>
							<Grid container style={{ height: "100%" }}>
								<Grid item xs={12}>
									<Grid
										container
										direction="column"
										style={{ height: "100%", justifyContent: "center" }}
									>
										<Grid item xs={12}>
											<Grid
												container
												className="item-box"
												style={{ height: "100%" }}
											>
												<Grid item xs={3} className="item">
													<ShopItem item={shop[0]} shopNumber="0" />
												</Grid>
												<Grid item xs={3} className="item">
													<ShopItem item={shop[1]} shopNumber="1" />
												</Grid>
												<Grid item xs={3} className="item">
													<ShopItem item={shop[2]} shopNumber="2" />
												</Grid>
												<Grid item xs={3} className="item">
													<ShopItem item={shop[3]} shopNumber="3" />
												</Grid>
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
	return reload();
}

export default Papirnictvi;
