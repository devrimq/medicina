import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate kullanıyoruz

const CreateArticle = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category_id, setCategoryId] = useState(""); // Kategori için id
	const [author_id, setAuthorId] = useState(""); // Yazar id'si

	const navigate = useNavigate(); // Sayfa yönlendirmesi için useNavigate kullanıyoruz

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newArticle = { title, content, category_id, author_id };

		try {
			const response = await fetch("http://localhost:5000/api/articles", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newArticle),
			});

			if (response.ok) {
				alert("Makale başarıyla eklendi!");
				navigate("/"); // Makale başarıyla eklendikten sonra ana sayfaya dön
			} else {
				alert("Bir hata oluştu!");
			}
		} catch (error) {
			console.error("Hata:", error);
		}
	};

	return (
		<div className='p-6 bg-gray-100 min-h-screen'>
			<h1 className='text-3xl font-bold text-center mb-6'>
				Yeni Makale Oluştur
			</h1>
			<form
				onSubmit={handleSubmit}
				className='max-w-lg mx-auto bg-white p-6 rounded shadow-md'>
				<div className='mb-4'>
					<label htmlFor='title' className='block text-gray-700'>
						Başlık
					</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className='w-full p-2 border border-gray-300 rounded mt-2'
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='content' className='block text-gray-700'>
						İçerik
					</label>
					<textarea
						id='content'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
						className='w-full p-2 border border-gray-300 rounded mt-2'></textarea>
				</div>
				<div className='mb-4'>
					<label htmlFor='category_id' className='block text-gray-700'>
						Kategori ID
					</label>
					<input
						type='text'
						id='category_id'
						value={category_id}
						onChange={(e) => setCategoryId(e.target.value)}
						required
						className='w-full p-2 border border-gray-300 rounded mt-2'
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='author_id' className='block text-gray-700'>
						Yazar ID
					</label>
					<input
						type='text'
						id='author_id'
						value={author_id}
						onChange={(e) => setAuthorId(e.target.value)}
						required
						className='w-full p-2 border border-gray-300 rounded mt-2'
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white p-2 rounded mt-4'>
					Makale Ekle
				</button>
			</form>
		</div>
	);
};

export default CreateArticle;
