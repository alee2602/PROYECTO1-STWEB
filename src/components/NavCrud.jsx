import React from 'react';
import '@styles/Admin.css';
import useNavigate from '@hooks/useNavigate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const NavCrud = () => {
    const { navigate } = useNavigate();

    const handleCardClick = (path, e) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div className="admin-dashboard">
            <div className="card" onClick={(e) => handleCardClick('/add-post', e)}>
            <FontAwesomeIcon icon={faPlus} className="fa-icon" />
                <h3>Add New Post</h3>
            </div>
            <div className="card" onClick={(e) => handleCardClick('/update-post', e)}>
            <FontAwesomeIcon icon={faPenToSquare} className="fa-icon"  />
                <h3>Update Post</h3>
            </div>
            <div className="card" onClick={(e) => handleCardClick('/delete-post', e)}>
            <FontAwesomeIcon icon={faTrashCan} className="fa-icon" />
                <h3>Delete Post</h3>
            </div>
        </div>
    );
};

export default NavCrud;