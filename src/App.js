import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import './App.css'

const Comp = (props) => (
    <>
        <div>
            {props.test}
        </div>
        <div>{process.env.REACT_APP_SERVER_URL}</div>
    </>
)


export default compose(
    connect(
        state => state
    )
)(Comp)
