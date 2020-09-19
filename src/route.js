import React from 'react';
import { Top } from './Top/index';
import { Route, Switch } from 'react-router';
import { Registration } from './Registration';

function Routes() {

 return(
     <Route>
        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return <Top />
                }}
            />
            <Route
                exact
                path="/registration"
                render={() => {
                    return <Registration />
                }}
            />
        </Switch>
     </Route>
 )

}

export {Routes};
