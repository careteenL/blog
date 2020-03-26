import * as types from '../action-types';
export default {
    add() {
        return { type: types.ADD };
    },
    delayAdd(amount) {
        return { type: types.DELAY_ADD, payload: amount };
    },
    delayAdd2(amount) {
        return { type: types.DELAY_ADD2, payload: amount };
    },
    stop() {
        return { type: types.CANCEL_SECOND };
    }
}