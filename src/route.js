import React from 'react';
import { Top } from './page/Top/index';
import { Route, Switch } from 'react-router';
import { Registration } from './page/Registration';
import { TagRegistration } from './page/TagRegistration';

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
            <Route
                exact
                path="/tagRegistration"
                render={() => {
                    return <TagRegistration />
                }}
            />
        </Switch>
     </Route>
 )

}

export {Routes};
