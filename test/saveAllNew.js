const libra = require('../dist/libra.cjs');
const client = new libra.Client('ac.testnet.libra.org:8000');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

let nextTx = null;

const run = async () => {

  // const db = await MongoClient.connect(url);
  // const dbo = db.db("libra-local");

  try {
    // // get latest tx, if doesn't exist, start from 1st
    // const lastTx = await dbo.collection("transactions").find().sort({_id:-1}).limit(1);

    // let lastTxDecoded = await lastTx.toArray();
    // let length = lastTxDecoded.length;

    let length = 0;

    if (length != 0) {
        nextTx = lastTxDecoded[0]._id + 1;
    }
    else { nextTx = 1 }

    // get next 1000 transactions
    params = {
      start_version: nextTx,
      limit: 1000,
      fetch_events: true,
    };

    // define first tx's id
    let tx_id = params.start_version;
    let i = 0;

    let result = await client.request('get_transactions', params);

    console.log(result);
    
    // loop through txs
    // for (const tx of result.txn_list_with_proof.transactions) {
      
      // console.log(tx);
      
      // // decode tx
      // let decoded = libra.utils.decodeRawTx(tx.raw_txn_bytes);
      
      // // manually create tx's id
      // decoded._id = tx_id + i;

      // // insert tx into mongodb
      // try {
      //   console.log(decoded);
      //   // await dbo.collection("transactions").insertOne(decoded);
      //   console.log("Transaction inserted");
      // }
      // catch (err) {
      //   console.error(err);
      // }

      // PROCESS ADDRESSES

      
      // let dbAddress = await dbo.collection("addresses").find({_id: decoded.to}).limit(1);

      // let dbAddressDecoded = await dbAddress.toArray();
      // let dbAddressLength = dbAddressDecoded.length;

      // // Save/update _to_ address
      // if(dbAddressLength != 0){
      //   try {
      //     dbo.collection("addresses").update(
      //       { _id: decoded.to },
      //       { $addToSet: { received: decoded._id } }
      //     )
      //     console.log("Address _to_ updated");
      //   }
      //   catch (err) {
      //     console.error(err);
      //   }
      // }
      // else { 
      //   try {
      //     let toObj =  { _id: decoded.to }
      //     dbo.collection("addresses").save(toObj);
      //     console.log("Address _to_ saved");
      //   }
      //   catch (err) {
      //     console.error(err);
      //   }
      // }

      // dbAddress = await dbo.collection("addresses").find({_id: decoded.from}).limit(1);

      // dbAddressDecoded = await dbAddress.toArray();
      // dbAddressLength = dbAddressDecoded.length;

      // // Save/update _from_ address
      // if (dbAddressLength != 0) {
      //   try {
      //     dbo.collection("addresses").update(
      //       { _id: decoded.from },
      //       { $addToSet: { sent: decoded._id } }
      //     )
      //     console.log("Address _from_ updated");
      //   }
      //   catch (err) {
      //     console.error(err);
      //   }
      // }
      // else {
      //   try {
      //     let fromObj =  { _id: decoded.from }
      //     dbo.collection("addresses").save(fromObj);
      //     console.log("Address _from_ saved");
      //   }
      //   catch (err) {
      //     console.error(err);
      //   }
      // }
      
    //   i++;

    // }

  } 

  catch (err) {
    console.error(err);
  }

  finally {
    console.log("FINISHED");
    // db.close();

    setTimeout(function () {
        console.log('0.5 sec pause before trying again');
        run();
    }, 500);
  }

}

run();



