import * as types from '../action-types';
let initialState = { number: 0 };
export default function (state = initialState, action) {
    switch (action.type) {
        case types.ADD:
            return { number: state.number + (action.payload || 1) };
        default:
            return state;
    }
}