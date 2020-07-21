import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className='ma center'>
      <div className='absolute mt2'>
        <img id='inputImage' alt='selected' src={imageURL} width='500rem' height='auto'/>
        <div className='bounding-box' style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  )
}

export default FaceRecognition;
