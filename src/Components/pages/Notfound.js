import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();
	return navigate("/");
}

export default NotFound;
