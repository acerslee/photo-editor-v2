import React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import useFirestore from '../hooks/useFirestore';

const ImageGrid = ({ updateEditImage }) => {

  const {images} = useFirestore('images');

  const getImageData = (id, url) => {
    updateEditImage(id, url);
  };

  return(
    <div
      className = 'image-grid-container'
      style = {{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1 className = 'image-grid-caption'>My Collection</h1>
      <ImageList sx = {{width: 800, height: 500}} cols = {3} rowHeight = {160}>
      {images.map(image => (
        <ImageListItem key = {image.id}>
          <img
            src = {image.url}
            alt = 'something'
            loading = 'lazy'
            onClick = {() => getImageData(image.id, image.url)}
          />
        </ImageListItem>
      ))}
      </ImageList>
    </div>
  )
};

export default ImageGrid;