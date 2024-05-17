import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InstagramPost from './post'; // Assume InstagramPost component is created separately
import './styles/InstagramFeed.css'; // Style for Instagram feed

const InstagramFeed = ({ username, accessToken, count, layout, onPostClick }) => {
  // Component logic...
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://graph.instagram.com/${username}/media?fields=id,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}&limit=${count}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();

    // Real-time updates: This requires implementing subscription to Instagram API updates, which is beyond the scope of this code snippet.

    return () => {
      // Cleanup (unsubscribe from real-time updates if applicable)
    };
  }, [username, accessToken, count]);

  return (
    <div className={`instagram-feed ${layout}`}>
      {error && <div className="error-message">{error}</div>}
      {posts.map(post => (
        <InstagramPost
          key={post.id}
          post={post}
          onClick={() => onPostClick(post)}
        />
      ))}
    </div>
  );
};


InstagramFeed.propTypes = {
  username: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  count: PropTypes.number,
  layout: PropTypes.oneOf(['grid', 'carousel']),
  onPostClick: PropTypes.func,
};

InstagramFeed.defaultProps = {
  count: 10,
  layout: 'grid',
  onPostClick: () => {},
};

export default InstagramFeed;