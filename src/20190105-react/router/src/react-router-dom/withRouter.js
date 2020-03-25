import React from 'react';
import { Route } from './';
export default function (OldComponent) {
    // props={title:"Careteen"}
    //routeProps={location,history,match}
    return props => (
        <Route render={
            routeProps => <OldComponent {...props} {...routeProps} />
        } />
    )
}