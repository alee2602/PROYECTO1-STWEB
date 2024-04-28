import '../App.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

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

    export default Post
    
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
    
