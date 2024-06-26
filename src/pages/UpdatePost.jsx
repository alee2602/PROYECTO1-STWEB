import React, { useState, useEffect } from 'react';
import useNavigate from '@hooks/useNavigate';
import '@styles/UpdatePost.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { fetchWithAuth } from '@utils/api.js';


function UpdatePost() {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        const fetchAllPosts = async () => {
            const response = await fetch('http://22249.arpanetos.lol/posts');
            const data = await response.json();
            setPosts(data);
        };

        fetchAllPosts();
    }, []);

    return (
            <div className="update-container">
                <div className="edit-post-details">
                    <h2>Edit Post Details</h2>
                </div>
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className={`post-item ${selectedPostId === post.id ? 'active' : ''}`}>
                            <span className="post-title">{post.title}</span>
                            <button onClick={() => setSelectedPostId(post.id)} className="edit-button">Edit</button>
                        </div>
                    ))}
                </div>
                {selectedPostId && (
                    <UpdatePostForm
                        postId={selectedPostId}
                        onPostUpdated={() => setSelectedPostId(null)}
                        isActive={!!selectedPostId} 
                    />
                )}
            </div>
        );
    }

function UpdatePostForm({ postId, onPostUpdated, isActive }) {
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

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await fetch(`http://22249.arpanetos.lol/posts/${postId}`);
            const data = await response.json();
            setPostData(data);
        };

        fetchPostData();
    }, [postId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleBackClick = () => {
        onPostUpdated();
    };

    const handleUpdatePost = async () => {

        const updatedPostData = {
            ...postData,
            award_date: new Date(postData.award_date).toISOString().split('T')[0],
            created_at: new Date(postData.created_at).toISOString().split('T')[0],
        };

        try {
            const response = await fetchWithAuth(`http://22249.arpanetos.lol/posts/${postId}`, 'PUT', updatedPostData)

            onPostUpdated()
            alert('Post has been updated successfully ! ');
            navigate('/')
            window.location.replace('#/')

        } catch (error) {
                if (error.message.includes('Token is expired :(')) {
                    // Si el token está expirado, redirigir al usuario a la página de login
                    alert('Your session has timed out, please log in! ');
                    navigate('/logout')
                    window.location.replace('#/logout')
                    return;
                }
            console.error('Error:', error);
            alert('Failed to update post: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const wasSuccessful = await handleUpdatePost();
        if (wasSuccessful) {
            alert('Post updated successfully');
        }
    };


    return (
        <div className={`update-post-container ${isActive ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faArrowLeft} className="fa-back" onClick={handleBackClick} />
            <h2>Update Post</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" placeholder="Title" value={postData.title} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="category">Category</label>
            <input id="category" name="category" type="text" placeholder="Category" value={postData.category} onChange={handleChange}/>  
        </div>
        <div className="form-group">
            <label htmlFor="award_date">Award Date</label>
            <input id="award_date" name="award_date" type="date" placeholder="Award Date" value={postData.award_date} onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="image_url">Image URL</label>
            <input id="image_url" name="image_url" type="text" placeholder="Image Url" value={postData.image_url} onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea className="textarea-field" id="content" name="content" placeholder="Content" value={postData.content} onChange={handleChange} />
        </div>
            <button type="submit">Apply Changes</button>
        </form>
    </div>
    );
}

export default UpdatePost;
