import * as TYPES from '../action-types';
let initialState = { number: 0 };
export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.ADD2:
            return { number: state.number + 1 };
        case TYPES.MINUS2:
            return { number: state.number - 1 };
        default:
            return state;
    }
}