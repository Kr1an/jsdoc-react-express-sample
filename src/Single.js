import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, lifecycle } from 'recompose'

import * as binActions from './actions'

/** @param {import('./typings').Single.PropTypes} props */
const Comp = (props) => (
    <section className="hl single">
        <p style={{ cursor: 'default'}}>{props.bin.content}</p>
        <i style={{ alignSelf: 'flex-end', marginRight: '15px' }}>Share this bin by url: <b style={{ textDecoration: 'underline' }}>{process.env.REACT_APP_CLIENT_URL}/{props.bin._id}</b></i>
    </section>
)

export default compose(
    connect(
        /**
         * @param {import('./typings').Reducers.Root} state
         * @returns {import('./typings').Single.PropTypes}
         */
        state => ({
            bin: state.bins.single,
        })
    ),
    // lifecycle({
    //     componentDidMount() {
    //         
    //     }
    // }),
    branch(
        /** @param {import('./typings').Single.PropTypes} props */
        props => !props.bin,
        renderNothing,
    ),
)(Comp)