import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank'
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import "tachyons";
import './App.css';

const app = new Clarifai.App({
  apiKey: ''
});

const particleOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


// function App()
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});

    app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
                />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    );
  }

}

export default App;
