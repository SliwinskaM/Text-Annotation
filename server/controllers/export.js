const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dbName = 'testDB';
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology:true });
import express from 'express';


const router = express.Router();



export const getCollections = async (req, res) => {
    print("dupa");
}

/*export const getCollenctions = async(req, res) => {
        client.connect(function(err) {
        //assert.equal(null, err);
        console.log('Connected successfully to server');
        const db = client.db(dbName);
    
        getCollection(db, function(docs) {
        
            console.log('Closing connection.');
            client.close();
            
            // Write to file
            try {
                fs.writeFileSync('out_file.json', JSON.stringify(docs));
                console.log('Done writing to file.');
            }
            catch(err) {
                console.log('Error writing to file', err)
            }
        });
    })

    try {
        const labels = await Label.find();

        res.status(200).json(labels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    console.log("dupa");
}*/

const getCollection = function(db, callback) {
    const query = { };  // this is your query criteria
    db.collection("inCollection")
      .find(query)
      .toArray(function(err, result) { 
          if (err) throw err; 
          callback(result); 
    }); 
};

export default router;