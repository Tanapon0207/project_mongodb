const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World! Let\'s Working with NoSQL Databases')
})


const { MongoClient } = require("mongodb");
const uri = "mongodb://poom:1234@localhost:27017/?authMechanism=DEFAULT&authSource=data_n";
const connectDB = async() => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`MongoDB connected successfully.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB();


// Read All API
app.get('/complaints', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('data_n').collection('data_c')
        .find({}).sort({ "Date received": -1 }).limit(4378).toArray();

    await client.close();
    res.status(200).send(objects);
})

// Create API
app.post('/complaints/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('data_n').collection('data_c').insertOne({
        "Year": object.Year,
        "Month": object.Month,
        "Make": object.Make,
        "Quantity": object.Quantity,
        "Pct": object.Pct,
       
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object
    });
})

const { ObjectId } = require('mongodb')
app.put('/complaints/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('data_n').collection('data_c').updateOne({ '_id': ObjectId(id) }, {
        "$set": {
        "_id": ObjectId(id),
        "Year": object.Year,
        "Month": object.Month,
        "Make": object.Make,
        "Quantity": object.Quantity,
        "Pct": object.Pct,
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is updated",
        "object": object
    });
})


// Delete API
app.delete('/complaints/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('data_n').collection('data_c').deleteOne({ '_id': ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is deleted"
    });
})

// Read by id API
app.get('/complaints/:id', async(req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('data_n').collection('data_c').findOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Complaint with ID = " + id + " is deleted",
        "object": user
    });
})

// Read by id API
app.get('/complaints/findtext/:searchText', async(req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('data_n').collection('data_c').find({ $text: { $search: searchText } }).sort({ "FIELD": -1 }).limit(4378).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaints": objects
    });
})

// Query by filter API: Search text from Product Name
app.get('/complaints/Make/:searchText', async(req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('data_n').collection('data_c').find({ $text: { $search: searchText } }).sort({ "Date received": -1 }).limit(4378).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})