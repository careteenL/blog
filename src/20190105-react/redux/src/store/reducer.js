import * as TYPES from './action-types';
let initialState = { number: 0 };
export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.ADD:
            return { number: state.number + 1 };
        case TYPES.MINUS:
            return { number: state.number - 1 };
        default:
            return state;
    }
}