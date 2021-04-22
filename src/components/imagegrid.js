import React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import useFirestore from '../hooks/useFirestore';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ImageCaption = styled.h1`
  font-family: Arial;
`

const ImageGrid = ({ updateEditImage }) => {

  const {images} = useFirestore('images');

  const getImageData = (id, url) => {
    updateEditImage(id, url);
  };

  return(
    <ImageContainer>
      <ImageCaption>My Collection</ImageCaption>
      <ImageList sx = {{width: 800, height: 500}} cols = {3} rowHeight = {160}>
      {images.map(image => (
        <ImageListItem key = {image.id}>
          <img
            src = {image.url}
            alt = 'some photos'
            loading = 'lazy'
            onClick = {() => getImageData(image.id, image.url)}
          />
        </ImageListItem>
      ))}
      </ImageList>
    </ImageContainer>
  )
};

export default ImageGrid;