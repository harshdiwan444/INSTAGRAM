import React from 'react';
import PropTypes from 'prop-types';
import './styles/InstagramPost.css'; // Style for Instagram post

const InstagramPost = ({ post, onClick }) => {
  const handleClick = () => {
    onClick(post);
  };

  return (
    <div className="instagram-post" onClick={handleClick}>
      {post.media_type === 'IMAGE' && (
        <img src={post.media_url} alt="Instagram post" />
      )}
      {post.media_type === 'VIDEO' && (
        <video controls>
          <source src={post.media_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="overlay">
        <a href={post.permalink} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

InstagramPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    media_type: PropTypes.oneOf(['IMAGE', 'VIDEO']).isRequired,
    media_url: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default InstagramPost;