import React from 'react';
import { useState, useEffect } from 'react';
import Post from '../components/Post'; 
import LoadingComponent from '../components/LoadingComponent'

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchPosts() {
        try{
            const response = await fetch('http://localhost:22249/posts');
            if (!response.ok){
                throw new Error(`Error! status: ${response.status}`);
            }
            let data = await response.json();
            data = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setPosts(data);
            setLoading(false);
        } catch (error){
            console.error("Error fetching posts:", error);
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
        {loading ? (
            <LoadingComponent />
        ) : error ? (
            <div className="error">{error}</div>
        ) : posts.length > 0 ? (
            <div className="container">
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
            </div>
        ) : (
            <div className="emptyState">No posts available.</div>
        )}
        </div>
    );
}

export default Home;