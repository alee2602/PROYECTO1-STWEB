
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import logo from './assets/logo.png'

// Components
function Header(props) {
  return(
      <header>
      <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <hr className="vertical-line" />
          <h1>GRAMMYS BLOG</h1>
      </div>
  </header>
  )
}

function Footer(props) {
return(
  <footer className="footer">
      <p>Grammys Blog | Mónica Salvatierra &copy; {new Date().getFullYear()}</p>
  </footer>
  )
}

function LoadingComponent(props){
  return(
      <div className="loading">Loading...</div>
  )
}

function Post({ post }) {
return (
    <div className="post">
        <div className="postImageContainer">
            <img src={post.image_url} alt={post.song_album_name} className="postImage" />
            <div className="timeStamp">{new Date(post.created_at).toLocaleString()}</div>
        </div>
        <div className="postContent">
            <h2 className="postTitle">{post.title}</h2>
            <p>{post.content}</p>
            <p>
                <FontAwesomeIcon icon={faMusic} />
                <strong> Category:</strong> {post.category}
            </p>
            <p>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <strong> Award Date:</strong> {new Date(post.award_date).toLocaleDateString()}
            </p>
        </div>
    </div>
);
};

// Define los prop types para el componente 'Post' para validar los props
Post.propTypes = {
  post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      winner_name: PropTypes.string,
      song_album_name: PropTypes.string.isRequired,
      record_label: PropTypes.string,
      award_date: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired
  }).isRequired
};

function App (props)  {
  // State hooks para los posts, estado de carga y mensaje de error
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true); //True mientras espera la obtención de datos
  const [error, setError] = React.useState(null); 
  
  // Obtener los posts de la api
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
  // UseEffect para ejecutar la función fetchPosts cuando se monta el componente
  React.useEffect(() => {
      fetchPosts();
  }, []);
  
  return (
      <div id="root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ flex: '1' }}>
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
          <Footer />
      </div>
      );
  };
export default App