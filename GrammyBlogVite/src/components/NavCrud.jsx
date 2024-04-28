import React from 'react';
import '@styles/Admin.css';
import useNavigate from '@hooks/useNavigate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const NavCrud = () => {
    const { navigate } = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div className="admin-dashboard">
            <div className="card" onClick={() => handleCardClick('/add-post')}>
            <FontAwesomeIcon icon={faPlus} className="fa-icon" />
                <h3>Add New Post</h3>
            </div>
            <div className="card" onClick={() => handleCardClick('/update-post')}>
            <FontAwesomeIcon icon={faPenToSquare} className="fa-icon"  />
                <h3>Update Post</h3>
            </div>
            <div className="card" onClick={() => handleCardClick('/delete-post')}>
            <FontAwesomeIcon icon={faTrashCan} className="fa-icon" />
                <h3>Delete Post</h3>
            </div>
        </div>
    );
};

export default NavCrud;