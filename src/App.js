import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import Latest from './Latest'
import Single from './Single'
import Create from './Create'

import * as binActions from './actions'

const Comp = (props) => (
    <>
        <Switch>
            <Route exact path="/:id" component={Single} />
            <Route exact path="/" component={Create} />
        </Switch>
        <Latest />
    </>
)


export default compose(
    connect(
        /** @param {any} state */
        state => state.bins
    )
)(Comp)
