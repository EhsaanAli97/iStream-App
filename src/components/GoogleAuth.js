import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
	//When this is called, our component is already rendered to the screen
	componentDidMount() {
		//Arrow function (CALLBACK FUNCTION) will only be called after auth2 library has succesfully loaded up in gapi
		window.gapi.load('client:auth2', () => {
			//THIS JUST INITIALIZES THE LIBRARY
			//Pass in an object which has the client id and the scope
			//When we call client.init that executes an asynchronous operation to google api server to initialise our client
			window.gapi.client
				.init({
					clientId:
						'488825068034-e3s2lqsbilc31dgmtpqsqm3e0lfeg5ak.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					/*After finishing intialising the library, we are going to assign the auth instans to "this.auth" and then
					immediately update our auth state and then sit around and wait for the auth status to change in the future  */
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn === true) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	handleSignIn = () => {
		this.auth.signIn();
	};

	handleSignOut = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button
					style={{ marginTop: '1.6rem' }}
					className="ui red google button"
					onClick={this.handleSignOut}
				>
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button
					style={{ marginTop: '1.6rem' }}
					className="ui red google button"
					onClick={this.handleSignIn}
				>
					<i className="google icon" />
					Sign in
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
