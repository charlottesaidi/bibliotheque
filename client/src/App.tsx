import React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom";
import Router from "@config/router/Router";

function App() {

	return (
		<div className="App min-h-screen bg-[radial-gradient(circle_at_bottom_right,#3c9add,#191452)]">
			<RouterProvider router={Router} />
		</div>
	);
}

export default App;
