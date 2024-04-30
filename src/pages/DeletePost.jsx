// components/DeletePost.js
import React, { useState, useEffect } from 'react'
import useNavigate from '@hooks/useNavigate'
import '@styles/DeletePost.css'

function DeletePost() {
    const [posts, setPosts] = useState([]);
    const { navigate } = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:22249/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {

        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const response = await fetch(`http://localhost:22249/posts/${postId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete the post');
                }
                setPosts(posts.filter(post => post.id !== postId));
                navigate('/')
                window.location.replace('#/');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
            <div className="delete-posts-container">
                <div className="delete-post-details">
                    <h2>Delete Post</h2>
                </div>
                <div className="delete-posts-list"> 
                    {posts.map(post => (
                        <div key={post.id} className="delete-post-item">
                            <h3 className="delete-post-title">{post.title}</h3>
                            <p className="delete-post-content">{post.content}</p>
                            <button onClick={() => handleDelete(post.id)} className="delete-button">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        );
}

export default DeletePost;

