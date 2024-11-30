import "./index.css"; // Tailwind'i buraya ekliyoruz
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Yeni root oluşturma
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
