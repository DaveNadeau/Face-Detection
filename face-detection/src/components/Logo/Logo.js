import React from 'react';
import Tilt from 'react-tilt';
import noFace from './icons8-profile-face-80.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className='Tilt shadow-2 ' options={{ max: 25 }} style={{ height: 100, width: 100}}>
        <div className='Tilt-inner pa3'>
          <img style={{paddingTop: '.25rem'}} alt='logo' src={noFace}/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;
