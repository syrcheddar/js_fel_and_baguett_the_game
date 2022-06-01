import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import InventoryPlace from "../other/Items/InventoryPlace";
import OwnedItem from "../other/Items/OwnedItem";
import { useState } from "react";
import itemsPaper from "../other/itemsPaperStore.json";
import itemsBufet from "../other/itemsBuffet.json";

function TopItems(props) {
	let sound = new Audio();
	sound.src = process.env.PUBLIC_URL + "/sounds/drop.wav";
	const [stats, setStats] = useState(JSON.parse(localStorage.getItem("stats")));
	const [gear, setGear] = useState(JSON.parse(localStorage.getItem("gear")));
	const [inventory, setInventory] = useState(
		JSON.parse(localStorage.getItem("inventory"))
	);
	const [paperShop, setPaperShop] = useState(
		JSON.parse(localStorage.getItem("paperShop"))
	);
	const [bufet, setBufet] = useState(
		JSON.parse(localStorage.getItem("paperShop"))
	);
	const buyItem = (item, invSlot, shopSlot) => {
		sound.play();
		if (+localStorage.getItem("dollary") - item.price >= 0) {
			let buyShop = null;
			if (props.shopNumber === 1) {
				buyShop = JSON.parse(localStorage.getItem("paperShop"));
			} else {
				buyShop = JSON.parse(localStorage.getItem("bufet"));
			}
			let tempInv = JSON.parse(localStorage.getItem("inventory"));
			localStorage.setItem(
				"dollary",
				+localStorage.getItem("dollary") - item.price
			);
			tempInv[invSlot] = buyShop[shopSlot];
			tempInv[invSlot].invSlot = invSlot;
			tempInv[invSlot].price = tempInv[invSlot].price / 2;
			let newShopItem = null;
			if (props.shopNumber === 1) {
				newShopItem = itemsPaper[Math.floor(Math.random() * itemsPaper.length)];
			} else {
				newShopItem = itemsBufet[Math.floor(Math.random() * itemsBufet.length)];
			}
			let lvl = localStorage.getItem("level");
			newShopItem.stats = [
				Math.floor(Math.random() * +lvl * 10),
				Math.floor(Math.random() * +lvl * 10),
				Math.floor(Math.random() * +lvl * 10),
				Math.floor(Math.random() * +lvl * 10),
				Math.floor(Math.random() * +lvl * 10),
				Math.floor(Math.random() * +lvl),
			];
			if (newShopItem.itemType === "zbran") {
				newShopItem.minDmg = Math.floor(Math.random() * +lvl * 10);
				newShopItem.maxDmg =
					newShopItem.minDmg + Math.floor(Math.random() * 2 * +lvl);
			}
			newShopItem.price = Math.floor(Math.random() * +lvl * 10);
			buyShop[shopSlot] = newShopItem;
			localStorage.setItem("inventory", JSON.stringify(tempInv));
			if (props.shopNumber === 1) {
				localStorage.setItem("paperShop", JSON.stringify(buyShop));
			} else {
				localStorage.setItem("bufet", JSON.stringify(buyShop));
			}
		}
		if (props.shopNumber === 1) {
			setPaperShop(JSON.parse(localStorage.getItem("paperShop")));
		} else {
			setBufet(JSON.parse(localStorage.getItem("bufet")));
		}
		setInventory(JSON.parse(localStorage.getItem("inventory")));
		props.refreshAll();
		props.onChange();
	};
	const putOff = (item, invSlot, gearSlot) => {
		sound.play();
		const newStats = JSON.parse(localStorage.getItem("stats"));
		newStats[0] -= item.stats[0];
		newStats[1] -= item.stats[1];
		newStats[2] -= item.stats[2];
		newStats[3] -= item.stats[3];
		newStats[4] -= item.stats[4];
		newStats[5] -= item.stats[5];
		localStorage.setItem("stats", JSON.stringify(newStats));
		setStats(newStats);
		const newGear = JSON.parse(localStorage.getItem("gear"));
		newGear[gearSlot] = null;
		localStorage.setItem("gear", JSON.stringify(newGear));
		setGear(newGear);
		item.invSlot = invSlot;
		const newInv = JSON.parse(localStorage.getItem("inventory"));
		newInv[invSlot] = item;
		localStorage.setItem("inventory", JSON.stringify(newInv));
		setInventory(newInv);
		refresh();
		props.refreshAll();
	};
	const moveItem = (startIndex, endIndex) => {
		sound.play();
		const newInv = JSON.parse(localStorage.getItem("inventory"));
		let tempItem = newInv[endIndex];
		if (tempItem !== null) tempItem.invSlot = startIndex;
		newInv[endIndex] = newInv[startIndex];
		newInv[endIndex].invSlot = endIndex;
		newInv[startIndex] = tempItem;
		localStorage.setItem("inventory", JSON.stringify(newInv));
		setInventory(newInv);
		props.refreshAll();
	};
	const refresh = () => {
		setGear(JSON.parse(localStorage.getItem("gear")));
		setInventory(JSON.parse(localStorage.getItem("inventory")));
		setPaperShop(JSON.parse(localStorage.getItem("paperShop")));
		setBufet(JSON.parse(localStorage.getItem("bufet")));
	};
	useEffect(() => {
		refresh();
	}, [props.change]);

	useEffect(() => {
		reload();
	}, [gear, inventory, paperShop, bufet]);

	const reload = () => {
		return (
			<Grid item xs={2}>
				<Grid
					container
					columns={15}
					style={{ width: "auto", height: "100%" }}
					className="item-box"
				>
					<Grid item xs={3} className="item">
						{inventory[0] !== null ? (
							<OwnedItem item={inventory[0]} />
						) : (
							<InventoryPlace
								buyItem={(i, shopSlot) => buyItem(i, 0, shopSlot)}
								putOff={(i, gearSlot) => putOff(i, 0, gearSlot)}
								moveItem={(startIndex) => moveItem(startIndex, 0)}
							/>
						)}
					</Grid>
					<Grid item xs={3} className="item">
						{inventory[1] !== null ? (
							<OwnedItem item={inventory[1]} />
						) : (
							<InventoryPlace
								buyItem={(i, shopSlot) => buyItem(i, 1, shopSlot)}
								putOff={(i, gearSlot) => putOff(i, 1, gearSlot)}
								moveItem={(startIndex) => moveItem(startIndex, 1)}
							/>
						)}
					</Grid>
					<Grid item xs={3} className="item">
						{inventory[2] !== null ? (
							<OwnedItem item={inventory[2]} />
						) : (
							<InventoryPlace
								buyItem={(i, shopSlot) => buyItem(i, 2, shopSlot)}
								putOff={(i, gearSlot) => putOff(i, 2, gearSlot)}
								moveItem={(startIndex) => moveItem(startIndex, 2)}
							/>
						)}
					</Grid>
					<Grid item xs={3} className="item">
						{inventory[3] !== null ? (
							<OwnedItem item={inventory[3]} />
						) : (
							<InventoryPlace
								buyItem={(i, shopSlot) => buyItem(i, 3, shopSlot)}
								putOff={(i, gearSlot) => putOff(i, 3, gearSlot)}
								moveItem={(startIndex) => moveItem(startIndex, 3)}
							/>
						)}
					</Grid>
					<Grid item xs={3} className="item">
						{inventory[4] !== null ? (
							<OwnedItem item={inventory[4]} />
						) : (
							<InventoryPlace
								buyItem={(i, shopSlot) => buyItem(i, 4, shopSlot)}
								putOff={(i, gearSlot) => putOff(i, 4, gearSlot)}
								moveItem={(startIndex) => moveItem(startIndex, 4)}
							/>
						)}
					</Grid>
				</Grid>
			</Grid>
		);
	};
	return reload();
}

export default TopItems;
