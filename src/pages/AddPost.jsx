import React, { useState } from 'react';
import useNavigate from '@hooks/useNavigate'; 
import '@styles/AddPost.css'; 
import { fetchWithAuth } from '@utils/api.js';

function AddPost() {
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

    const { navigate } = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddPost = async () => {
        try {
            const response = await fetchWithAuth('http://22249.arpanetos.lol/posts', 'POST', postData) 

            alert('Post has been added succefully! ');
            navigate('/'); 
            window.location.replace('#/');
            return true; 
        } catch (error) {
            if (error.message.includes('Token is expired :(')) {
                // Si el token está expirado, redirigir al usuario a la página de login
                alert('Your session has timed out, please log in! ');
                navigate('/logout')
                window.location.replace('#/logout')
                return;
            }
            console.error('Error:', error);
            return false; 
        }
    
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAddPost(); 
    };

    return (
        <div className="add-post-container">
            <h2>Add Post</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-inputs">
                <label htmlFor="title">Title</label>
                <input name="title" type="text" placeholder="Title" value={postData.title} onChange={handleChange} />
            </div>
            <div className="form-inputs">
                <label htmlFor="category">Category</label>
                <input name="category" type="text" placeholder="Category" value={postData.category} onChange={handleChange} />
            </div>
            <div className="form-inputs">
                <label htmlFor="winner_name">Winner's Name</label>
                <input name="winner_name" type="text" placeholder="Winner's Name" value={postData.winner_name} onChange={handleChange} />
            </div>
            <div className="form-inputs">
                <label htmlFor="song_album_name">Album's Name</label>
                <input name="song_album_name" type="text" placeholder="Album's Name" value={postData.song_album_name} onChange={handleChange} />
            </div>
            <div className="form-inputs">
                <label htmlFor="record_label">Record Label</label>
                <input name="record_label" type="text" placeholder="Record Label" value={postData.record_label} onChange={handleChange} />
            </div>
            <div className="form-inputs">
                <label htmlFor="award_date">Award Date</label>
                <input name="award_date" type="date" placeholder="Award Date" value={postData.award_date} onChange={handleChange} />
            </div>
            <div className="form-inputs">
                <label htmlFor="image_url">Image Url</label>
                <input name="image_url" type="text" placeholder="Image Url" value={postData.image_url} onChange={handleChange} />
            </div>
            <div className="form-inputs">
                <label htmlFor="content">Content</label>
                <textarea className="add-post-textarea-field" name="content" placeholder="Content" value={postData.content} onChange={handleChange} />
            </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}


export default AddPost;