import React, { useState } from "react";

const ArticleForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		// Backend'e POST isteği gönder
		fetch("http://localhost:5000/api/articles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				content: content,
				category_id: category, // Veritabanında kategori ID'si ile eşleşmeli
				author_id: 1, // Şimdilik sabit bir yazar ID'si (admin kullanıcı)
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message) {
					setMessage("Makale başarıyla eklendi!");
					setTitle("");
					setContent("");
					setCategory("");
				}
			})
			.catch((error) => {
				console.error("Hata:", error);
				setMessage("Bir hata oluştu, tekrar deneyin.");
			});
	};

	return (
		<div className='p-6 bg-gray-100 min-h-screen flex justify-center items-center'>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-6 rounded shadow-md w-full max-w-md space-y-4'>
				<h1 className='text-2xl font-bold text-center'>Yeni Makale Ekle</h1>
				{message && <p className='text-center text-green-600'>{message}</p>}
				<div>
					<label className='block mb-2 text-sm font-medium'>Başlık</label>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='w-full p-2 border rounded'
						placeholder='Makale başlığı'
						required
					/>
				</div>
				<div>
					<label className='block mb-2 text-sm font-medium'>İçerik</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className='w-full p-2 border rounded'
						placeholder='Makale içeriği'
						required
					/>
				</div>
				<div>
					<label className='block mb-2 text-sm font-medium'>Kategori ID</label>
					<input
						type='number'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className='w-full p-2 border rounded'
						placeholder="Kategori ID'si"
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'>
					Kaydet
				</button>
			</form>
		</div>
	);
};

export default ArticleForm;
