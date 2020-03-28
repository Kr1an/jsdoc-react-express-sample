const mongodb = require('mongodb')

/** @type {import('mongodb').Db} */
let db


const getDB = async () => {
    if (!db) {
        const client = new mongodb.MongoClient(
            process.env.MONGODB_CONN_STR,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        db = client.db()
    }
    return db
}

/** @return {Promise<import('mongodb').Collection<import('./typings').Mongo.Bin>>} */
const getBinCollection = async () => (await getDB()).collection('bins')

/**
 * @param {import('./typings').Mongo.Bin} obj 
 * @returns {import('./typings').Data.Output.Bin}
 */
const mongoBinToOutputBin = (obj) => ({
    ...obj,
    _id: obj._id.toHexString()
})

/**
 * @param {import('./typings').Core.Bin} obj
 * @returns {import('./typings').Data.Error}
 */
const validateBinCreateObj = (obj) => {
    const keys = Object.keys(obj)
    if (keys.length !== 1 || !obj.content) return 'bad_value'
}

/**
 * @param {string} id
 * @returns {import('./typings').Data.Error}
 */
const validateStrId = id => {
    if (!mongodb.ObjectId.isValid(id))
        return 'bad_value'
}

/**
 * @param {import('./typings').Core.Bin} obj
 * @returns {Promise<import('./typings').Data.Output.Bin>}
 */
module.exports.createBin = async (obj) => {
    const notValid = validateBinCreateObj(obj)
    if (notValid) throw new Error(notValid)
    const collection = await getBinCollection()
    const { insertedId } = await collection.insertOne(obj)
    const insertedBin = await collection.findOne({ _id: insertedId })
    return mongoBinToOutputBin(insertedBin)
}

/**
 * @param {string} id
 * @returns {Promise<import('./typings').Data.Output.Bin>}
 */
module.exports.getBinById = async (id) => {
    const notValid = validateStrId(id)
    if (notValid) throw new Error(notValid)
    const collection = await getBinCollection()
    const bin = await collection.findOne({ _id: new mongodb.ObjectId(id) })
    if (!bin) {
        /** @type {import('./typings').Data.Error} */
        const error = 'not_found'
        throw new Error(error)
    }
    return mongoBinToOutputBin(bin)
}

/** @returns {Promise<Array<import('./typings').Data.Output.Bin>>} */
module.exports.listLatestBins = async () => {
    const collection = await getBinCollection()
    const list = await collection.find().sort({ _id: 1 }).limit(5).toArray()
    return list.map(mongoBinToOutputBin)
}
