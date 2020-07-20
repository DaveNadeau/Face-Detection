import React from 'react';
// import './ImageLinkForm.css'

const FaceRecognition = ({ imageURL }) => {
  return (
    <div className='ma center'>
      <div className='absolute mt2'>
        <img alt='selected' src={imageURL} width='500rem' height='auto'/>
      </div>
    </div>
  )
}

export default FaceRecognition;
