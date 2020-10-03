import React, { Fragment } from 'react';
import { Top } from './page/Top/index';
import { Route, Switch } from 'react-router';
import { Registration } from './page/Registration';
import { TagRegistration } from './page/TagRegistration';
import { Modal } from './_layout/Modal/index';

function Routes() {

 return(
    <Fragment>
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
        <Modal />
    </Fragment>

 )

}

export {Routes};
