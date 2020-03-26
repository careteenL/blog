import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/counter';
function Second(props) {
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={props.stop}>停掉</button>
        </div>
    )
}
export default connect(
    state => state.counter,
    actions
)(Second);