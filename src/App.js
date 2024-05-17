import React from 'react';
import InstagramFeed from './components/feed';

const App = () => {
  return (
    <div className="App">
      <h1>My Instagram Feed</h1>
      <InstagramFeed 
        username="your_instagram_username"
        accessToken="your_instagram_access_token"
        count={10}
        layout="grid"
        onPostClick={post => console.log('Clicked post:', post)}
      />
    </div>
  );
}

export default App;