import React, { useState } from 'react';
import Editor from './editor.js';
import ImageGrid from './imagegrid.js';
import ProgressBar from './progress.js';
import '@fontsource/pacifico';
import styled from 'styled-components';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Copyright from './copyright.js';

const Header = styled.h1`
  font-family: pacifico;
  text-align: center;
  font-size: 10vh;
  @media(max-width: 700px){
    font-size: 4vh;
  }
`;

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Homepage = () => {

  const [image, setImage] = useState(null);
  const [clickedImage, setClickedImage] = useState(null);
  const [error, setError] = useState(null);
  const [boolean, setBoolean] = useState(false);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = event => {
    event.preventDefault();
    let selectedFile = event.target.files[0];

    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setError(null);
    } else {
      setImage(null);
      setError('Error: Please select either a .jpeg or .png file');
    }
  }

  const updateEditImage = (id, url) => {
    setClickedImage(url);
    setBoolean(true);
  }

  let renderEditor;
  if (clickedImage) {
    renderEditor = <Editor clickedImage = {clickedImage} boolean = {boolean} />
  }

  return(
    <div id = 'homepage'>
      <Header>Welcome to Photo Editor</Header>
      <OutputContainer>
        <label
          htmlFor = 'pic-upload'
          className = 'custom-pic-upload'
        >
          <FaCloudUploadAlt /> Upload Pic
        </label>
        <input id = 'pic-upload' type = 'file' onChange = {handleChange}/>
          {error && <div className = 'error' style = {{color: 'red'}}><strong>{error}</strong></div>}
          {image && <div>{image.name}</div>}
          {image && <ProgressBar image = {image} setImage = {setImage} />}
      </OutputContainer>

      {renderEditor}
      <ImageGrid
        updateEditImage = {updateEditImage}
      />
      <Copyright />
    </div>
  );
};

export default Homepage;