import React, { useState } from "react";

const LikeButton = ({ id, initialLikes }) => {
	const [likes, setLikes] = useState(initialLikes || 0); // Başlangıçta verilen likes değerini kullanıyoruz

	const handleLike = () => {
		// Beğenme işlemini backend'e gönderebiliriz
		fetch(`http://localhost:5000/api/articles/${id}/like`, {
			method: "POST",
		})
			.then((response) => response.json())
			.then((data) => {
				// Callback kullanarak doğru state güncellemesi
				setLikes((prevLikes) => prevLikes + 1); // Beğeni sayısını arttırma
			})
			.catch((error) => {
				console.error("Hata:", error);
			});
	};

	return (
		<div>
			<button
				onClick={handleLike}
				className='px-4 py-2 bg-blue-500 text-white rounded'>
				Beğen ({likes})
			</button>
		</div>
	);
};

export default LikeButton;
