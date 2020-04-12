import React from 'react';
import Img from 'react-image'
import { createCanvas, loadImage } from 'canvas'
import { ARController } from 'artoolkit5-js';
import './App.css';

loadImage('data/img.jpg').then((image) => {

  const canvas = createCanvas(image.width, image.height)

  console.log('Canvas created with Width: ' + image.width + ', Height: ' + image.height)

  const options = { canvas: canvas, orientation: 'landscape' }

  console.log('Image loaded: ', image)
  ARController.initWithImage(image, './data/camera_para.dat', options).then( (arController) => {
     return arController.loadMarker('./data/hiro.patt').then((markerId) => {
       console.log('Marker loaded with id: ', markerId)
     })
  })
  .then((arController) => {
    arController.process(image)
  })
  .catch(err => {
    console.log('Something went wrong', err)
  })

})




function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          A simple app with React and artoolkit5-js
        </p>
        <Img src={'data/img.jpg'}/>
      </header>
    </div>
  );
}

export default App;
