import React from 'react';
import { Top } from './page/Top/index';
import { Route, Switch } from 'react-router';
import { Registration } from './page/Registration';
import { TagRegistration } from './page/TagRegistration';

function Routes() {

 return(
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
 )

}

export {Routes};
