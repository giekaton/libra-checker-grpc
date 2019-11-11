// For Node.js Python child process
const spawn = require('child_process').spawn;

// Database password
const lcAuth = require('./lcAuth.js');


// Node.js Postgres
const { Client } = require('pg');

const clientPg = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: lcAuth.passPostgres(),
  port: 5432,
})

clientPg.connect()


// Libra
lc = require('./index.js');

const client = new lc.LibraClient({ network: 'ac.testnet.libra.org' })

function run() {

  nextTxnId = 0;

  clientPg.query('SELECT * FROM transactions ORDER BY id DESC LIMIT 1')
  .then((res) => {
      if(typeof(res.rows[0]) != 'undefined') {
        console.log('increase')
        nextTxnId = Number(res.rows[0].id) + 1;
      }

      msg();
    }
  )
  .catch(e => console.error(e.stack))


  function getData() {
    return new Promise(resolve => {

      // nextTxnId = 1259;
      let start_version = nextTxnId;
      let limit = 1;

      let transaction = client.getTxnByRangePython(start_version, limit, true);

      resolve(transaction);
      
    });
  }

  async function msg() {
    const msg = await getData();

    signed_txn_base64 = msg;

    if(signed_txn_base64 == 'wait') {
      console.log('wait');

      setTimeout(function () {
        console.log('2 sec pause before trying again');
        run();
      }, 2000);
    }

    // The path to your python script
    let myPythonScript = "transaction.py";
    
    // Function to convert an Uint8Array to a string
    let uint8arrayToString = function(data){
      return String.fromCharCode.apply(null, data);
    };
    
    let pgExec = lcAuth.pythonExecutable();
    const scriptExecution = spawn(pgExec, [myPythonScript]);
  
    scriptExecution.stdin.write(signed_txn_base64);
    scriptExecution.stdin.end();
    
    // Handle normal output
    scriptExecution.stdout.on('data', (data) => {
      // let string = uint8arrayToString(data).substr(17);

      let string = uint8arrayToString(data)

      string = JSON.parse(string.replace(/'/g,'"'))
      // return console.log(string.UserTransaction);
      const tx = string.UserTransaction;

      console.log(tx, nextTxnId)

      if (nextTxnId == 0) {
        // genesis txn
        var sender = tx.raw_txn.sender;
        var sequence_number = tx.raw_txn.sequence_number;
        var receiver = 0;
        var value = 0;
        var max_gas_amount = 0;
        var public_key = tx.public_key;
        var signature = tx.signature;
        var type = 'genesis'
        console.log(sender, sequence_number, receiver, value, max_gas_amount, gas_unit_price, expiration_time, public_key, signature, type );
        // return;
      }
      else {
        var type = tx.type;
        var sender = tx.raw_txn.sender;
        var sequence_number = tx.raw_txn.sequence_number;
        if (type == 'rotate_authentication_key') {
          var receiver = tx.raw_txn.payload.Script.args[0].ByteArray;
          var value = 0;
        }
        else {
          var receiver = tx.raw_txn.payload.Script.args[0].Address;
          var value = tx.raw_txn.payload.Script.args[1].U64;
        }
        var max_gas_amount = tx.raw_txn.max_gas_amount;
        var gas_unit_price = tx.raw_txn.gas_unit_price;
        var expiration_time = tx.raw_txn.expiration_time;
        var public_key = tx.public_key;
        var signature = tx.signature;

        console.log(sender, sequence_number, receiver, value, max_gas_amount, gas_unit_price, expiration_time, public_key, signature, type );
        // return;
      }
      
      let status = 'success';

      if (type == 'Mint Libra Coins') {
        if (value > 1000000000000000) {
          status = 'failed';
        }
      }

      // ADD TO POSTGRESQL

      const text = 'INSERT INTO transactions(id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key, type, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'

      let values = [nextTxnId, sender, sequence_number, value, receiver, max_gas_amount, gas_unit_price, expiration_time, signature, public_key, type, status]

      // callback
      let result = clientPg.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)

          values = [nextTxnId, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          
          clientPg.query(text, values, (err, res) => {
            if (err) {
              console.log('2nd error');
            }
            else {
              console.log('txn inserted');
              setTimeout(function () {
                console.log('2 sec pause before trying again');
                run();
              }, 2000);
            }
          });

        } else {
          console.log('txn inserted');
          setTimeout(function () {
            console.log('0.2 sec pause before trying again');
            run();
          }, 200);
        }

      })

    });
  }
}

run();