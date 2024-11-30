// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import CreateArticle from "./components/CreateArticle";
import ArticleDetail from "./components/ArticleDetail";
import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			{/* Navbar burada tüm sayfalarda gösterilecek */}
			<Navbar />
			<Routes>
				<Route path='/' element={<ArticleList />} />
				<Route path='/article/:id' element={<ArticleDetail />} />
				<Route path='/create-article' element={<CreateArticle />} />
			</Routes>
		</Router>
	);
}

export default App;
