import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props); // super not needed in hooks, but here it is standard
    this.state = {
      emailRegistry: '',
      passwordRegistry: '',
      nameRegistry: ''
    }
  }
  //adding a listener for the onChange events
  onNameChange = (event) => {
    this.setState({nameRegistry: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({emailRegistry: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({passwordRegistry: event.target.value})
  }

  onSubmitSignIn = () => {
    //console.log(this.state);  //this was to test that the information was passed
    //fetch below actually sends the information to the backend node/express server for verification
    fetch('http://localhost:4000/register', {
      method: 'post',  //changes fetch's default get function to a post
      headers: {'Content-type': 'application/json'}, //defines the type of info in the body
      body: JSON.stringify({ //must use stringify to make the call human readable
        email: this.state.emailRegistry, //looks up the state of the signInEmail (changed in the onChange in the render functin below)
        password: this.state.passwordRegistry, //same as email above
        name: this.state.nameRegistry
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user){  //'succesfull match' response is in server.js in app.post('/signin', (req, res)...) function
          this.props.loadUser(user); //function to provide user entered credentials to the database
          this.props.onRouteChange('home'); //this replaces the this.props.onRouteChange in the JSX below
                                            //and in the above non-smart component example
        }
      })

  }


  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" type="submit" value="Register" />
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Register;
