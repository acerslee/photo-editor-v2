import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage.js';

const ProgressBar = ({ image, setImage }) => {

  console.log(image);
  const { url, progress } = useStorage(image);
  console.log(progress, url);

  useEffect(() => {
    if (url) setImage(null);
  },[url, setImage])

  return(
    <div
      className = 'progress-bar'
      style = {{
        width: progress + '%',
        height: '1vw',
        backgroundColor: 'blue'
      }}
    >
    </div>
  )
}

export default ProgressBar;