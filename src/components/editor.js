import React, { useState } from 'react';
import filterOptions from '../data/filterdata.js';
import FilterItem from './filterItem.js';
import Slider from './slider.js';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Button from '@material-ui/core/Button';
import useFirestore from '../hooks/useFirestore.js';

// const imageVariable = document.getElementById('edit-image');

const Editor = ({clickedImage, boolean}) => {
  const { images } = useFirestore('images');

  const [filters, setFilters] = useState(filterOptions)
  const [selectedIndex, setSelectedIndex] = useState(0);

  var renderedImage;
  if (images.length > 0) {
    renderedImage = images[0].url;
  }

  if (boolean) {
    renderedImage = clickedImage;
  }

  const selectedFilter = filters[selectedIndex];

  const filterSlider = event => {
    setFilters(prevOptions => {
      return prevOptions.map((filter, index) => {
        if (index !== selectedIndex) return filter

        return { ...filter, value: event.target.value}
      })
    });
  };

  const setImageFilters = () => {
    const styles = filters.map(filter => {
      return `${filter.property}(${filter.value}${filter.unit})`
    })

    return { filter: styles.join(' ') };
  };



  // uploadFile.addEventListener('change', () => {
  //   // const file = document.getElementById('upload-file').files[0]
  //   const reader = new FileReader();
  //   console.log('dcheckpoint 1?')
  //   if (renderedImage) {
  //     fileName = renderedImage.url;
  //     reader.readAsDataURL(renderedImage)
  //   }
  //   console.log('dcheckpoint 2?')
  //   reader.addEventListener('load', () => {
  //     console.log('dcheckpoint 3?')
  //     img = new Image();
  //     img.src = reader.result;
  //     img.onload = function() {
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

  //       console.log('did it rach?')
  //     };
  //   }, false);
  // })


  // var canvas = document.getElementById('canvas');

  // if (imageVariable !== null) {
  //   imageVariable.addEventListener('load', () => {
  //     var img = new Image();
  //     console.log('canvas',canvas);
  //     var ctx = canvas.getContext('2d');

  //     img.onload = function() {
  //       ctx.drawImage(img, 0, 0, 500, 500);
  //     };
  //     img.src = '../../images/pineapples.jpg';
  //   });
  // }


  // function download(canvas, filename) {
  //   let event;

  //   const link = document.createElement('a');

  //   link.download = filename;
  //   link.href = canvas.toDataURL('image/jpeg',0.8);
  //   event = new MouseEvent('click');
  //   link.dispatchEvent(event);
  // }

  // const downloadFile = () => {
  //   const fileURL = renderedImage.substring(0, renderedImage.indexOf('?'));
  //   const lastIndexSlash = fileURL.lastIndexOf('/') + 1;
  //   const newfileURL = fileURL.substring(lastIndexSlash, fileURL.length);

  //   const fileExtension = newfileURL.slice(-4);

  //   let newFilename;
  //   if (fileExtension === '.jpg' || fileExtension === '.JPG' || fileExtension === '.png' || fileExtension === '.PNG'){
  //     newFilename = newfileURL.substring(0, newfileURL.length - 4) + '-edited.jpg';
  //   }

  //   download(canvas, newFilename);
  // }

  return(
    <div
      id = 'photo-editor'
      style = {{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw'
      }}
    >


      <TransformWrapper
        defaultScale = {1}
        defaultPositionX = {200}
        defaultPositionY = {100}
      >
      {({ zoomIn, zoomOut, resetTransform, ...rest}) => (
        <React.Fragment>
          <div className = 'tools'>
            <Button variant = 'contained' onClick={zoomIn}>+</Button>
            <Button variant = 'contained' onClick={zoomOut}>-</Button>
            <Button variant = 'contained' onClick={resetTransform}>Reset</Button>
            <Button variant = 'contained' id = 'download-button'>Download file here
            </Button>
          </div>
          <TransformComponent>
            {/* <canvas id = 'canvas'></canvas> */}
              <img
                id = 'edit-image'
                src = {renderedImage}
                alt = 'something'
                style = {setImageFilters()}
              />
          </TransformComponent>
        </React.Fragment>
      )}
      </TransformWrapper>
      <div
        className = 'filters'
        style = {{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div className = 'filter-container'>
          {filters.map((filter, index) => (
            <FilterItem
              key = {index}
              name = {filter.name}
              active = {index === selectedIndex}
              handleClick = {() => setSelectedIndex(index)}
            />
          ))}
        </div>
        <Slider
          min = {selectedFilter.range.min}
          max = {selectedFilter.range.max}
          value = {selectedFilter.value}
          filterSlider = {filterSlider}
        />
      </div>
    </div>
  )
};

export default Editor;