import React, { useState } from 'react';

function AddPost({ onAdd }) {
    const [postData, setPostData] = useState({
        title: '',
        category: '',
        winner_name: '',
        song_album_name: '',
        record_label: '',
        award_date: '',
        image_url: '',
        content: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await onAdd(postData)) {
            setPostData({
                title: '',
                category: '',
                winner_name: '',
                song_album_name: '',
                record_label: '',
                award_date: '',
                image_url: '',
                content: ''
            });
        } else {
            alert('Error adding post');
        }
    };

    return (
        <div>
            <h2>Add Post</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" type="text" placeholder="Título" value={postData.title} onChange={handleChange} />
                <input name="category" type="text" placeholder="Categoría" value={postData.category} onChange={handleChange} />
                <input name="winner_name" type="text" placeholder="Nombre del Ganador" value={postData.winner_name} onChange={handleChange} />
                <input name="song_album_name" type="text" placeholder="Nombre del Álbum" value={postData.song_album_name} onChange={handleChange} />
                <input name="record_label" type="text" placeholder="Discográfica" value={postData.record_label} onChange={handleChange} />
                <input name="award_date" type="date" placeholder="Fecha de Premiación" value={postData.award_date} onChange={handleChange} />
                <input name="image_url" type="text" placeholder="URL de la Imagen" value={postData.image_url} onChange={handleChange} />
                <textarea name="content" placeholder="Contenido" value={postData.content} onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddPost;