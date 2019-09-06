var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("libra-local");
  dbo.collection("transactions").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");

    dbo.collection("addresses").drop(function(err, delOK) {

      if (err) throw err;
      if (delOK) console.log("Collection deleted");

      db.close();

    });
    
  });

});