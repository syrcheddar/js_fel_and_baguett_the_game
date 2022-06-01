import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

/**
 * Drag'n drop component
 */
export default function InventoryPlace(props) {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: [ItemTypes.WEARED_ITEM, ItemTypes.BUY_ITEM, ItemTypes.OWNED_ITEM],
		drop: (item, monitor) => {
			switch (monitor.getItemType()) {
				case ItemTypes.BUY_ITEM:
					props.buyItem(item, item.shopNumber);
					break;
				case ItemTypes.OWNED_ITEM:
					props.moveItem(item.invSlot);
					break;
				case ItemTypes.WEARED_ITEM:
					props.putOff(item, item.gearSlot);
					break;
				default:
			}
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
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
			{props.children}
			{isOver && (
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
					}}
				/>
			)}
		</div>
	);
}
