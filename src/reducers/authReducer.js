//Initialiser - holds the initial value for the state object
const INITIAL_STATE = {
	isSignedIn: null,
	userId: null,
};

//Function - gets called with some state object and an action property.
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SIGN_IN':
			/*Takes all the values out of the state argument and place it in 
            the new object, updating the isSignedIn property.*/
			return { ...state, isSignedIn: true, userId: action.payload };
		case 'SIGN_OUT':
			return { ...state, isSignedIn: false, userId: null };
		default:
			return state;
	}
};
