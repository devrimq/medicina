import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Parametreyi almak için kullanılır
import { FaThumbsUp } from "react-icons/fa"; // Like ikonu

const ArticleDetail = () => {
	const { id } = useParams(); // URL'deki makale ID'sini alıyoruz
	const [article, setArticle] = useState(null); // Makale verisi
	const [loading, setLoading] = useState(true);
	const [comment, setComment] = useState(""); // Yorum inputu
	const [comments, setComments] = useState([]); // Yorumlar
	const [likes, setLikes] = useState(0); // Beğeni sayısı

	useEffect(() => {
		// Makale detayını çekme
		fetch(`http://localhost:5000/api/articles/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setArticle(data);
				setLikes(data.likes || 0); // Makale verisinden beğeni sayısını al
				setLoading(false);
			})
			.catch((error) => {
				console.error("Hata:", error);
				setLoading(false);
			});

		// Yorumları çekme
		fetch(`http://localhost:5000/api/articles/${id}/comments`)
			.then((response) => response.json())
			.then((data) => {
				setComments(data);
			})
			.catch((error) => {
				console.error("Hata:", error);
			});
	}, [id]);

	const handleLike = () => {
		fetch(`http://localhost:5000/api/articles/${id}/like`, {
			method: "POST",
		})
			.then((response) => response.json())
			.then((data) => {
				setLikes(likes + 1); // Beğeni sayısını artır
			})
			.catch((error) => {
				console.error("Hata:", error);
			});
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		if (comment.trim()) {
			// Yorum gönderme işlemi (Backend'e POST isteği yapılabilir)
			fetch(`http://localhost:5000/api/articles/${id}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ comment }),
			})
				.then((response) => response.json())
				.then((data) => {
					setComments([...comments, data]);
					setComment(""); // Inputu sıfırlama
				})
				.catch((error) => {
					console.error("Hata:", error);
				});
		}
	};

	if (loading) {
		return <p>Yükleniyor...</p>;
	}

	if (!article) {
		return <p>Makale bulunamadı.</p>;
	}

	return (
		<div className='p-6 bg-gray-100 min-h-screen'>
			<h1 className='text-3xl font-bold text-center mb-6'>{article.title}</h1>
			<p className='text-gray-700'>{article.content}</p>

			{/* Like butonu ve beğeni sayısı */}
			<div className='mt-4 flex items-center space-x-4'>
				<button
					onClick={handleLike}
					className='px-4 py-2 bg-blue-500 text-white rounded flex items-center space-x-2'>
					<FaThumbsUp />
					<span>Beğen</span>
				</button>
				<span>{likes} Beğeni</span>
			</div>

			{/* Yorumlar */}
			<div className='mt-8'>
				<h2 className='text-2xl font-semibold mb-4'>Yorumlar</h2>
				<form onSubmit={handleCommentSubmit} className='mb-4'>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						rows='4'
						className='w-full p-2 border rounded mb-2'
						placeholder='Yorumunuzu buraya yazın'
					/>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded'>
						Yorum Yap
					</button>
				</form>

				<ul className='space-y-4'>
					{comments.map((comment, index) => (
						<li key={index} className='p-4 bg-white rounded shadow'>
							<p>{comment}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ArticleDetail;
