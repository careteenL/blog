import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/home';
//props.go('/counter?id=1')
//  <button onClick={() => props.go({ pathname: '/counter', query: { id: 1 }, state: { from: '/' } })} >跳到/counter</button>
function Home(props) {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => props.go('/counter?id=100')} >跳到/counter</button>
        </div>
    )
}
export default connect(
    state => state,
    actions
)(Home);