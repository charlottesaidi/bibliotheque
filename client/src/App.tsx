import React from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom";
import Router from "@config/router/Router";

function App() {

	return (
		<div className="App min-h-screen bg-slate-900">
			<RouterProvider router={Router} />
		</div>
	);
}

export default App;
