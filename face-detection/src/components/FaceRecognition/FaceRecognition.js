import React from 'react';
// import './ImageLinkForm.css'

const FaceRecognition = ({ imageURL }) => {
  return (
    <div className='center'>
      <img alt='selected' src={imageURL} />
    </div>
  )
}

export default FaceRecognition;
