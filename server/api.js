const express = require('express')
const bodyParser = require('body-parser')

const data = require('./data')

const app = express()

app.use(bodyParser.json())

app.get('/', (_, res) => res.json({ ok: true }))

app.post(
    '/bins',
    /**
     * @param {import('./typings').API.Request<import('./typings').Core.Bin>} req
     */
    async (req, res, next) => {
        try {
            return res.json(await data.createBin(req.body))
        } catch (e) {
            return next(e)
        }
    }
)

app.get(
    '/bins',
    async (req, res, next) => {
        try {
            return res.json(await data.listLatestBins())
        } catch (e) {
            return next(e)
        }
    }
)

app.get(
    '/bins/:id',
    async (req, res, next) => {
        try {
            return res.json(await data.getBinById(req.params.id))
        } catch (e) {
            return next(e)
        }
    }
)




app.use(
    /** 
     * @param {Error} err
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    (err, req, res, next) => {
        if (!err) return next
        const message = /** @type {import('./typings').Data.Error} */(err.message)
        const status =
            message === 'bad_value' ? 404 :
            message === 'not_found' ? 400 : 500
        return res.status(status).json({ message })
    }
)

const port = process.env.API_PORT
app.listen(port, () => console.log('on port', port))