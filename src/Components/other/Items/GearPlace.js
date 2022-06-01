import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

/**
 * Drag'n drop component
 */
export default function GearPlace(props) {
	let x = null;
	const [{ canDrop }, drop] = useDrop(() => ({
		accept: ItemTypes.OWNED_ITEM,
		drop: (item, monitor) => {
			if (item.itemType === props.itemType) {
				props.putOn(item, item.invSlot);
			}
		},
		canDrop(item) {
			if (item.itemType === props.itemType) {
				return true;
			}
			return false;
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
				display: "flex",
				alignItems: "center",
			}}
		>
			{props.children}
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
					}}
				/>
			)}
		</div>
	);
}
