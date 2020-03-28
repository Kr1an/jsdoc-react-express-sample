import { createReducer } from 'redux-act'
import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import * as binActions from './actions'

/** @returns {import('./typings').Reducers.BinsStore} */
const getDefaultState = () => ({
    single: null,
    latest: [],
    loading: false
})

const reducer = createReducer({}, getDefaultState())

reducer.on(binActions.fetchLatest, state => ({ ...state, latest: [], loading: true }))
reducer.on(binActions.fetchSingle, state => ({ ...state, single: null, loading: true }))
reducer.on(binActions.setLatest, (state, payload) => ({ ...state, latest: payload, loading: false }))
reducer.on(binActions.setSingle, (state, payload) => ({ ...state, single: payload, loading: false }))

export default history => combineReducers({
    bins: reducer,
    router: connectRouter(history)
})