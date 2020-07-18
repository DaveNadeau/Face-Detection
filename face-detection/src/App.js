import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import "tachyons";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      {/*<ImageLinkForm />
      <FaceRacognition />*/}
    </div>
  );
}

export default App;
