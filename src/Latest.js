import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import * as binActions from './actions'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { push } from 'connected-react-router'

/** @param {import('./typings').Latest.PropTypes} props */
const Comp = (props) => (
    <div style={{display: 'flex'}}>
        <div
            style={{
                margin: 10,
                flex: 0.8,
                paddingRight: 10,
                
            }}
        >
            <h1 style={{ opacity: 0.5,color: 'gray', }}>
                Latest Bins
            </h1>
            {
                props.items.map(x => (
                    <div
                        onClick={() => props.onOpenBinHandler(x._id)}
                        style={{
                            margin: 10,
                            padding: 5,
                            boxShadow: '-5px 0px grey',
                            background: 'rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            justifyContent: 'space-between'
                        }}
                        key={x._id}
                        ><p style={{margin:0, opacity: 0.5}}>{x.content.slice(0,20)}</p>
                        <FaExternalLinkAlt style={{marginLeft: 15, opacity: 0.1}}/>
                    </div>
                ))
            }
        </div>
        <div
            style={{
                margin: 10,
                flex: 0.8,
            }}
        >
            <h1 onClick={() => window.location.pathname = '/'} style={{ opacity: 0.5, textDecoration: 'underline', cursor: 'pointer' }}>
                Create Your own Bin
                <FaExternalLinkAlt style={{marginLeft: 15}}/>
            </h1>
            <p style={{ opacity: 0.5}}>Then you will be able to share it with others by url.</p>
        </div>
    </div>
)

export default compose(
    connect(
        /**
         * @param {import('./typings').Reducers.Root} state
         * @returns {import('./typings').Latest.ValuesTypes}
         */
        state => ({
            items: state.bins.latest,
        }),
        /** @returns {import('./typings').Latest.HandlersTypes} */
        dispatch => ({
            onRefreshBtnClick: () => dispatch(binActions.fetchLatest()),
            onOpenBinHandler: (id) => {
                window.location.pathname = '/' + id
            }
        })
    )
)(Comp)