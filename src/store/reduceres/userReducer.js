import { FETCH_USER, DELETE_USER, FILTER_USER } from '../actions/type';

const userReducer = (state={}, {type, payload}) =>{
	switch(type){
		case FETCH_USER:
			return payload;
		case DELETE_USER:
		    return payload;
		case FILTER_USER:
		    return payload;
		default:
			return state;	
	}
}

export default userReducer;