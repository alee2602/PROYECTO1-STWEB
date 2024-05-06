import React, { useState, useEffect } from 'react';
import useNavigate from '@hooks/useNavigate';
import '@styles/PostDetails.css'; 
import { fetchWithAuth } from '@utils/api.js';

function PostDetails() {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await fetch('http://localhost:22249/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAllPosts();
    }, []);

    return (
        <div className="details-container">
            <div className="title-post-details">
                    <h2>Available Posts</h2>
                </div>
            <div className="allposts-list">
                {posts.map(post => (
                    <div key={post.id} className={`postd-item ${selectedPostId === post.id ? 'active' : ''}`}>
                        <span className="postd-title">{post.title}</span>
                        <button onClick={() => setSelectedPostId(post.id)} className="view-button">View Details</button>
                    </div>
                ))}
            </div>
            {selectedPostId && <PostDetail postId={selectedPostId} />}
        </div>
    );
}

function PostDetail({ postId }) {
    const { navigate } = useNavigate();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetchWithAuth(`http://localhost:22249/posts/${postId}`, 'GET');
                setPostData(response);
            } catch (error) {
                if (error.message.includes('Token is expired :(')) {
                    // Si el token está expirado, redirigir al usuario a la página de login
                    alert('Your session has timed out, please log in! ');
                    navigate('/logout')
                    window.location.replace('#/logout')
                } else {
                    console.error('Error:', error);
                    alert('Failed to fetch post: ' + error.message);
                }
            }
        };

        fetchPostData();
    }, [postId, navigate]);

    if (!postData) {
        return <div>Loading...</div>;
    }

    const award_Date = postData.award_date ? new Date(postData.award_date).toISOString().split('T')[0] : 'No date';

    return (
        <div className="post-details-container">
            <h2>Post Details</h2>
            <div className="detail-group">
                <strong>Title:</strong> <span>{postData.title}</span>
            </div>
            <div className="detail-group">
                <strong>Category:</strong> <span>{postData.category}</span>
            </div>
            <div className="detail-group">
                <strong>Award Date:</strong> <span>{award_Date}</span>
            </div>
            <div className="detail-group">
                <strong>Image:</strong> <img src={postData.image_url} alt="Post" />
            </div>
            <div className="detail-group">
                <strong>Content:</strong> <p>{postData.content}</p>
            </div>
        </div>
    );
}

export default PostDetails;
