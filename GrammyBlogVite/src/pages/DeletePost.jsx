// components/DeletePost.js
import React from 'react';

function DeletePost ({ onDelete, postId })  {
    return (
        <div>
            <h2>Delete Post</h2>
            <button onClick={() => onDelete(postId)}>Borrar</button>
        </div>
    );
};

export default DeletePost;
