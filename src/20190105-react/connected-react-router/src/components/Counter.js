import React from 'react';
export default function (props) {
    console.log('counter', props);
    return (
        <div>
            <h1>Counter</h1>
            {/* <p>query-id:{props.location.query.id}</p>
            <p>state-from:{props.location.state.from}</p> */}
            <button onClick={() => props.history.go(-1)}>回退</button>
        </div>
    )
}