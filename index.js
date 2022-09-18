const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000;
app.use(cors());
app.use(express.json());

//trip-today
//uDSjIlpRsTFseQZS

//connecting mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ahltbit.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//getting data from database
async function run() {
    try {
      const destinationsCollection = client.db("trip-today");
      const destinations = destinationsCollection.collection("destinations");
      const signatureDestination=destinationsCollection.collection("signatureDestination")

        app.get('/destinations',async(req,res)=>{

            const cursor=destinations.find({});
            const result=await cursor.toArray();
            res.send(result);
        })
        app.get('/signature-destination',async(req,res)=>{
            const cursor=signatureDestination.find({});
            const result=await cursor.toArray();
            res.send(result);
        })
       
        app.post('/signature-destination',async(req,res)=>{
           const newData=req.body;
           const result=await signatureDestination.insertOne(newData);
           res.json(result);
         
        })
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Getting started with node in trip today')
});
app.listen(port, () => {
    console.log('listening to port ', port);
})