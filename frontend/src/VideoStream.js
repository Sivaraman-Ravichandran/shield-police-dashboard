import React, { useState } from 'react';
import './VideoStream.css'; // Import CSS for video stream styling

function VideoStream() {
  const [error, setError] = useState(null);

  return (
    <div className="video-stream-container">
      <h2>Gender Detection Live Stream</h2>
      {error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <img
          src="http://192.168.102.71:5000/video_feed"
          alt="Video Feed"
          className="video-stream"
          onError={() => setError('Failed to load video feed')}
        />
      )}
    </div>
  );
}

export default VideoStream;
