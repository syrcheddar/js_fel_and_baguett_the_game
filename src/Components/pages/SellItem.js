import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../other/ItemTypes";

export default function SellItem(props) {
	const [{ canDrop }, drop] = useDrop(() => ({
		accept: ItemTypes.OWNED_ITEM,
		drop: (item, monitor) => {
			switch (monitor.getItemType()) {
				case ItemTypes.OWNED_ITEM:
					props.sellItem(item, item.invSlot);
					break;
				default:
			}
		},
		collect: (monitor) => ({
			canDrop: !!monitor.canDrop(),
		}),
	}));
	return (
		<div
			ref={drop}
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
			}}
		>
			<img
				id="stores"
				src={process.env.PUBLIC_URL + props.src}
				alt="papirnictvi"
				style={{ width: "100%", padding: "0 0 0 0" }}
			/>
			{canDrop && (
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						height: "100%",
						width: "100%",
						zIndex: 1,
						opacity: 0.5,
						backgroundColor: "yellow",
						textAlign: "center",
					}}
				>
					<h1 style={{ margin: "20vh auto" }}>Drop here to sell</h1>
				</div>
			)}
		</div>
	);
}
