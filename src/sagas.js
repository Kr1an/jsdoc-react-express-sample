import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'
import { LOCATION_CHANGE, push } from 'connected-react-router'
import * as binActions from './actions'

function* fetchLatest() {
    try {

        /** @type {import('axios').AxiosResponse<Array<import('api/typings').Data.Output.Bin>>} */
        const listLatestReply = yield axios.get(process.env.REACT_APP_SERVER_URL + '/bins')
        yield put(binActions.setLatest(listLatestReply.data))
    } catch (e) {}
}

/** @param {import('redux-act').Action<string>} action */
function* fetchSingle(action) {
    try {
        /** @type {import('axios').AxiosResponse<import('api/typings').Data.Output.Bin>} */
        const getReply = yield axios.get(process.env.REACT_APP_SERVER_URL + '/bins/' + action.payload)
        yield put(binActions.setSingle(getReply.data))
    } catch (e) {}
}

/** @param {import('connected-react-router').LocationChangeAction} action */
function* locationChanged(action) {
    try {
        yield put(binActions.fetchSingle(action.payload.location.pathname.split('/')[1]))
    } catch (e) {}
}

/** @param {import('redux-act').Action<string>} action */
function* createBin(action) {
    try {
        /** @type {import('api/typings').Core.Bin} */
        const newBin = {
            content: action.payload
        }
        /** @type {import('axios').AxiosResponse<import('api/typings').Data.Output.Bin>} */
        const createBinReply = yield axios.post(process.env.REACT_APP_SERVER_URL + '/bins', newBin)
        yield put(push('/' + createBinReply.data._id))
        yield put(binActions.fetchLatest())
    } catch (e) {}
}


export default function* () {
    yield takeLatest(binActions.fetchLatest, fetchLatest)
    yield takeLatest(binActions.fetchSingle, fetchSingle)
    yield takeLatest(binActions.createBin, createBin)
    yield takeLatest(LOCATION_CHANGE, locationChanged)

    yield put(binActions.fetchLatest())

}