import { createAction } from 'redux-act'

export const startLoading = createAction()
export const stopLoading = createAction()

export const fetchLatest = createAction()
/** @type {import('redux-act').ActionCreator<Array<import('api/typings').Data.Output.Bin>>} */
export const setLatest = createAction()

/** @type {import('redux-act').ActionCreator<string>} */
export const fetchSingle = createAction()
/** @type {import('redux-act').ActionCreator<import('api/typings').Data.Output.Bin>} */
export const setSingle = createAction()

/** @type {import('redux-act').ActionCreator<string>} */
export const createBin = createAction()