import { actionTypes } from '../constants/actionTypes';
let { GET_TOPIC_BYNAME_FETCHING, GET_TOPIC_BYNAME_COMPLETED } = actionTypes;

const defaultState = {
    isFetching: false,
    topic: null
};

export default function userReducer(state = defaultState, { type, result }) {
    switch (type) {
        case GET_TOPIC_BYNAME_FETCHING:
            return Object.assign({}, state, {
                isFetching: true
            });
        case GET_TOPIC_BYNAME_COMPLETED:
            return Object.assign({}, state, {
                isFetching: false,
                topic: result
            });
        default: return state;
    }
}