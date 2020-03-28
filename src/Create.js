import React from 'react'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import * as binActions from './actions'

/** @param {import('./typings').Create.PropTypes} props */
const Comp = (props) => (
    <div
        style={{margin: 10, marginBottom: 50}}
    >
        <h1 style={{ color: 'gray'}}>Create a new Bin</h1>
        <section>
            <textarea
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={"Start typing some text to add a new Bin"}
            />
            <button style={{ color: props.value.length > 4 && 'rgba(0,0,0,0.6)', cursor: 'pointer'}} onClick={() => {
                props.handleSubmit(props.value)
                props.onChange('')
            }}>Create a new Bin</button>
        </section>
        
    </div>
)

export default compose(
    withState('value', 'onChange', ''),
    connect(
        null,
        /** @returns {import('./typings').Create.HandlerTypes} */
        dispatch => ({
            handleSubmit: (value) => {
                dispatch(binActions.createBin(value))
            }
        })
    )
)(Comp)