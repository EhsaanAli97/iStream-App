import {
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	CREATE_STREAM,
} from '../actions/types';

import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		//Anytime we get an action with type "FETCH_STREAM" we take the state object above, take all the key value pairs out of it adding it to the new object
		//[action.payload.id]: action.payload - Dynamically adds new key value pair on the fly. The stream id is the key and the value is the stream itself.
		case FETCH_STREAMS:
			//Creates a new object, adding all current records inside state object.
			//Then calls mapKeys, taking hte list of streams recieved from the api, making an object out of it using mapKeys. The keys inside that object are going to
			//be the id of the streams themselves.
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
