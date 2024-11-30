import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticleList = () => {
	const [articles, setArticles] = useState([]); // Makale listesi
	const [loading, setLoading] = useState(true); // Yüklenme durumu

	useEffect(() => {
		fetch("http://localhost:5000/api/articles")
			.then((response) => response.json())
			.then((data) => {
				setArticles(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Hata:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <p>Yükleniyor...</p>;
	}

	return (
		<div className='p-6 bg-gray-100 min-h-screen'>
			<h1 className='text-3xl font-bold text-center mb-6'>Makaleler</h1>
			{/* Yeni makale ekleme linki */}
			<div className='mb-6 text-center'>
				<Link
					to='/create-article'
					className='text-white bg-blue-500 px-4 py-2 rounded'>
					Yeni Makale Ekle
				</Link>
			</div>
			{articles.length > 0 ? (
				<ul className='space-y-4'>
					{articles.map((article) => (
						<li
							key={article.id}
							className='p-4 bg-white rounded shadow hover:bg-gray-50'>
							<Link
								to={`/article/${article.id}`}
								className='text-xl font-semibold text-blue-500'>
								{article.title}
							</Link>
							<p className='text-gray-700'>
								{article.content.slice(0, 100)}...
							</p>
						</li>
					))}
				</ul>
			) : (
				<p className='text-center'>Henüz makale bulunmamaktadır.</p>
			)}
		</div>
	);
};

export default ArticleList;
