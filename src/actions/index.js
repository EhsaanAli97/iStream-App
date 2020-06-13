import streams from '../apis/streams';
import { history } from '../history';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
} from './types';

//ACTION, which has the type property for sign in
export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

//ACTION, which has the type property for sign out
export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

//This runs once, called via handleSubmitButton
export const createStream = (formValues) => async (disptach, getState) => {
	const { userId } = getState().auth;

	//POST request with axios
	//Attempt to make request over to our api server, creating a new stream.
	//Makes a post request to "./streams"
	//After creating our stream, the response we get back has the new stream with the new id.
	const response = await streams.post('/streams', { ...formValues, userId });

	//Action gets dispatched which has the payload of the data we got back from the response
	disptach({ type: CREATE_STREAM, payload: response.data });

	//Programmatically navigate the user around the site
	history.push('/');
};

export const fetchStreams = () => async (disptach) => {
	const response = await streams.get('/streams');

	disptach({
		type: FETCH_STREAMS,
		payload: response.data,
	});
};

export const fetchStream = (id) => async (dispatch) => {
	const response = await streams.get(`/streams/${id}`);

	dispatch({
		type: FETCH_STREAM,
		payload: response.data,
	});
};

export const editStream = (id, formValues) => async (dispatch) => {
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({
		type: EDIT_STREAM,
		payload: response.data,
	});
	history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
	await streams.delete(`/streams/${id}`);

	dispatch({
		type: DELETE_STREAM,
		payload: id,
	});

	history.push('/');
};
