import React from 'react';
import { withRouter } from '../react-router-dom';
function NavHeader(props) {
    return (
        <div className="navbar-heading">
            <div
                onClick={() => props.history.push('/')}
                className="navbar-brand">{props.title}</div>
        </div>
    )
}
export default withRouter(NavHeader);