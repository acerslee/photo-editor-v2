import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Editor from './editor.js';
import ImageGrid from './imagegrid.js';
import ProgressBar from './progress.js';

const Homepage = () => {

  const [image, setImage] = useState(null);
  const [clickedImage, setClickedImage] = useState(null);
  const [error, setError] = useState(null);
  const [boolean, setBoolean] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = event => {
    event.preventDefault();
    let selectedFile = event.target.files[0];

    console.log('selectedfile', selectedFile)
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setError(null);
    } else {
      setImage(null);
      setError('Please select either a .jpeg or .png file');
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick = {handleClick}
        style = {{
          textAlign: 'center'
        }}
      >
        Menu
      </Button>
      <Menu
        id = 'menu'
        anchorEl = {anchorEl}
        keepMounted
        open = {Boolean(anchorEl)}
        onClose = {handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
          {/* <Link to = '/' style = {{textDecoration: 'none', color: 'black'}}>Logout</Link> */}
        </MenuItem>
      </Menu>

      <div className = 'output'>
        <input type = 'file' onChange = {handleChange} />
          <div className = 'output'>
            {error && <div className = 'error'>{error}</div>}
            {image && <div>{image.name}</div>}
            {image && <ProgressBar image = {image} setImage = {setImage} />}
        </div>
      </div>

      {renderEditor}
      <ImageGrid
        updateEditImage = {updateEditImage}
      />
    </div>
  );
};

export default Homepage;