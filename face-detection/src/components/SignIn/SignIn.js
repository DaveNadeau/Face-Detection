import React from 'react';
    ////CHANGING THE BELOW TO A SMART COMPONENT WITH STATE////
// const SignIn = ({onRouteChange}) => {
//   return (
//     <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
//       <main className="pa4 black-80">
//         <div className="measure">
//           <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//             <legend className="f1 fw6 ph0 mh0">Sign In</legend>
//             <div className="mt3">
//               <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//               <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
//             </div>
//             <div className="mv3">
//               <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//               <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
//             </div>
//           </fieldset>
//           <div className="">
//             <input onClick={()=>onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
//           </div>
//           <div className="lh-copy mt3">
//             <p onClick={()=>onRouteChange('register')}href="#0" className="f6 link dim black db pointer">Register</p>
//           </div>
//         </div>
//       </main>
//     </article>
//   )
// }

    ////SMART COMPONENT VERSION WITH STATE////
class SignIn extends React.Component{
  //adding state to component.  note the passing of "props" to constructor and super
  constructor(props) {
    super(props); // super not needed is hooks, but here it is standard
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  //adding a listener for the onChange events
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  //adding event listener for sign in form submission
  onSubmitSignIn = () => {
    //console.log(this.state);  //this was to test that the information was passed
    //fetch below actually sends the information to the backend node/express server for verification
    fetch('http://localhost:4000/signin', {
      method: 'post',  //changes fetch's default get function to a post
      headers: {'Content-type': 'application/json'}, //defines the type of info in the body
      body: JSON.stringify({ //must use stringify to make the call human readable
        email: this.state.signInEmail, //looks up the state of the signInEmail (changed in the onChange in the render functin below)
        password: this.state.signInPassword //same as email above
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id){  //boolean test response is in server.js in app.post('/signin', (req, res)...) function
          this.props.loadUser(user); //function to provide user entered credentials to the database
          this.props.onRouteChange('home'); //this replaces the this.props.onRouteChange in the JSX below
                                            //and in the above non-smart component example
        }
      })

  }

  render() {
      const {onRouteChange} = this.props;
      return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange} //this is what links this part of the form to the state, otherwise the information would not pass
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange} //this is what links this part of the form to the state, otherwise the information would not pass
                  />
                </div>
              </fieldset>
              <div className="">
              {/*note that this.props.onRouteChange changed to this.onSubmitSignIn/onSubmitRegister in this smart component version*/}
                <input onClick={()=>this.onSubmitSignIn()}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className="lh-copy mt3">
                <p onClick={()=>onRouteChange('register')}href="#0" className="f6 link dim black db pointer">Register</p>
              </div>
            </div>
          </main>
        </article>
      );
  }
}

export default SignIn;
