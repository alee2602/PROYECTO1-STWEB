import React, { useState } from 'react';
import useNavigate from '@hooks/useNavigate'; 
import '@styles/AddPost.css'; 

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
            const response = await fetch('http://localhost:22249/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            const data = await response.json();
            console.log(data); 

            navigate('/'); 
            window.location.replace('#/');
            return true; 
        } catch (error) {
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
                <input name="title" type="text" placeholder="Title" value={postData.title} onChange={handleChange} />
                <input name="category" type="text" placeholder="Category" value={postData.category} onChange={handleChange} />
                <input name="winner_name" type="text" placeholder="Winner's Name" value={postData.winner_name} onChange={handleChange} />
                <input name="song_album_name" type="text" placeholder="Album's Name" value={postData.song_album_name} onChange={handleChange} />
                <input name="record_label" type="text" placeholder="Record Label" value={postData.record_label} onChange={handleChange} />
                <input name="award_date" type="date" placeholder="Award Date" value={postData.award_date} onChange={handleChange} />
                <input name="image_url" type="text" placeholder="Image Url" value={postData.image_url} onChange={handleChange} />
                <textarea name="content" placeholder="Content" value={postData.content} onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddPost;