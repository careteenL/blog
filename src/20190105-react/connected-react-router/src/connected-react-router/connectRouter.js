import { LOCATION_CHANGE } from './types';
export default function (history) {
    let initialState = {
        action: history.action,
        location: history.location
    }
    return function (state = initialState, action) {
        switch (action.type) {
            case LOCATION_CHANGE:
                return action.payload;
            default:
                return state;
        }
    }
}