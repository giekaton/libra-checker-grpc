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

  // Check the id of the latest txn stored in the local db
  clientPg.query('SELECT * FROM transactions ORDER BY id DESC LIMIT 1')
  .then((res) => {
    if(typeof(res.rows[0]) != 'undefined') {
      console.log('increase')
      nextTxnId = Number(res.rows[0].id) + 1;
    }
    console.log('nextTxnId:', nextTxnId);
    
    // Start the cycle
    asyncRun(nextTxnId);
  })
  .catch(e => console.error(e.stack))


  async function asyncRun(nextTxnId) {
    try {
      let txns = await fetchTxnData(nextTxnId);
      // console.log(txns);
      
      pythonLCS(txns, nextTxnId);
    }
    catch(error) {
      console.log(error.message);
    } 
  }


  // Fetch transactions from the Libra blockchain
  async function fetchTxnData(nextTxnId) {

    // nextTxnId = 1260;
    let start_version = nextTxnId;
    let limit = 10;

    let txns = client.getTxnByRangePython100(start_version, limit, true);

    return(txns);

  }


  async function pythonLCS(txns, nextTxnId) {
  
    let txnsObj = {};

    if (txns == 'wait') {
      console.log('NO NEW TRANSACTIONS')
      console.log('2 sec pause before trying again');
      setTimeout(function () {
        run();
      }, 2000);
    }

    else {

      txns.forEach (txn => {
        // console.log(txn)
        txnsObj[nextTxnId] = txn;
        nextTxnId++;
      })

      // console.log(txnsObj);
      // return;

      txnsObjDes = {}

      txnsObjLength = Object.keys(txnsObj).length;

      console.log('STARTING LCS LOOP');

      i = 1;
      for (const id in txnsObj) {
        let txnId = id;
        let signed_txn_base64 = txnsObj[id];

        // console.log(txnId, signed_txn_base64);

        if (signed_txn_base64 == 'wait') {
          return(console.log('wait'));
        }

        // Python setup
        const myPythonScript = "transaction.py";

        const pgExec = lcAuth.pythonExecutable();
        const scriptExecution = spawn(pgExec, [myPythonScript]);

        // 1. Passing serialized txn to Python LCS
        scriptExecution.stdin.write(signed_txn_base64);
        scriptExecution.stdin.end();

        // 2. Output from Python: Deserialized txn
        scriptExecution.stdout.on('data', (data) => {

          // convert an Uint8Array to a string
          let txnString = String.fromCharCode.apply(null, data);

          // console.log(txnString);

          txnString = JSON.parse(txnString.replace(/'/g,'"'))
          txnString = txnString.UserTransaction;

          // add to transactions array for later db update
          txnsObjDes[txnId] = txnString;

          if (i++ == txnsObjLength) {
            // console.log(txnsObjDes);
            console.log('FINISHED LCS LOOP');
            updateDB(txnsObjDes);
          }

        });

      }

    }
  
  }


  async function updateDB(txnsObjDes) {
    // let txnsArray = txnsObjDes;
    // console.log(txnsObjDes);

    txnsObjDesLength = Object.keys(txnsObjDes).length;

    console.log('STARTING updateDB LOOP');

    i = 1;
    for (const id in txnsObjDes) {
      let txnId = id;
      let tx = txnsObjDes[id];
      let txnPrep = {}

      txnPrep.last = false;
      if (txnsObjDesLength == i++) {
        console.log('LAST TXN');
        txnPrep.last = true;
      }

      // set default status
      txnPrep.status = 'success';
      
      // SETTING VALUES
      // Genesis (0th) transaction
      if (txnId == 0) {
        txnPrep.sender = tx.raw_txn.sender;
        txnPrep.sequence_number = tx.raw_txn.sequence_number;
        txnPrep.receiver = 0;
        txnPrep.value = 0;
        txnPrep.max_gas_amount = 0;
        txnPrep.public_key = tx.public_key;
        txnPrep.signature = tx.signature;
        txnPrep.type = 'genesis'

        console.log(txnPrep);

        finishRunGetReady(txnId, txnPrep);

      }
      // Not Genesis txn
      else {
        console.log( tx );
        txnPrep.type = tx.type;
        txnPrep.sender = tx.raw_txn.sender;
        txnPrep.sequence_number = tx.raw_txn.sequence_number;
        if (txnPrep.type == 'Rotate Authentication Key') {
          txnPrep.receiver = tx.raw_txn.payload.Script.args[0].ByteArray;
          txnPrep.value = 0;
        }
        else {
          txnPrep.receiver = tx.raw_txn.payload.Script.args[0].Address;
          txnPrep.value = tx.raw_txn.payload.Script.args[1].U64;
        }
        txnPrep.max_gas_amount = tx.raw_txn.max_gas_amount;
        txnPrep.gas_unit_price = tx.raw_txn.gas_unit_price;
        txnPrep.expiration_time = tx.raw_txn.expiration_time;
        txnPrep.public_key = tx.public_key;
        txnPrep.signature = tx.signature;

        console.log(txnPrep);
        // return;

        // Specific txn types

        // Txn type: Mint
        if (txnPrep.type == 'Mint Libra Coins') {
          if (txnPrep.value > 1000000000000000) {
            txnPrep.status = 'failed';
            finishRunGetReady(txnId, txnPrep);
          }
          else {

            // 1. update minter's balance
            let text = 'INSERT INTO balances AS t (address, balance) VALUES($1, $2) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance)';
            let valueMinter = txnPrep.value * -1;
            let values = [txnPrep.sender, valueMinter];

            clientPg.query(text, values)
            .then(res => {
              console.log(res.rows[0])
            })
            .catch(e => console.error(e.stack))

            // 2. update receiver's balance
            let text2 = 'INSERT INTO balances AS t (address, balance) VALUES($1, $2) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance)';
            let values2 = [txnPrep.receiver, txnPrep.value];

            clientPg.query(text2, values2)
            .then(res => {
              console.log(res.rows[0])
            })
            .catch(e => console.error(e.stack))

            finishRunGetReady(txnId, txnPrep);

          }
        }

        // Txn type: Peer-to-Peer transaction
        else {

          let queryBalanceSender = {
            name: 'get-balance-sender',
            text: 'SELECT * FROM balances WHERE address = $1',
            values: [txnPrep.sender],
          }

          clientPg.query(queryBalanceSender)
          .then(res => {
            let currentBalanceSender = res.rows[0].balance;

            if (txnPrep.value > currentBalanceSender) {
              txnPrep.status = 'failed';
              finishRunGetReady(txnId, txnPrep);
            }
            else {
              let newBalanceSender = currentBalanceSender - txnPrep.value;
              // console.log(newBalanceSender);

              // 1. update sender's balance
              let updateBalanceSender = {
                name: 'update-balance-sender',
                text: 'UPDATE balances SET balance = $1 WHERE address = $2',
                values: [newBalanceSender, txnPrep.sender],
              }

              clientPg.query(updateBalanceSender)
              .then(res => {
                // console.log(res.rows[0]);
                console.log('sender balance updated')
              })
              .catch(e => console.error(e.stack))

              // 2. insert/update receiver's balance
              let text2 = 'INSERT INTO balances AS t (address, balance) VALUES($1, $2) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance)';
              let values2 = [txnPrep.receiver, txnPrep.value];

              clientPg.query(text2, values2)
              .then(res => {
                console.log(res.rows[0])
              })
              .catch(e => console.error(e.stack))
              finishRunGetReady(txnId, txnPrep);

            }
          })
          .catch(e => console.error(e.stack))

        }

      }

      function finishRunGetReady(txnId, txnPrep) {
        finishRun(txnId, txnPrep);
      }

    }


  }


  // ADD TO POSTGRESQL
  async function finishRun(txnId, tx) {

    console.log(txnId, tx);
    // return;

    const text = 'INSERT INTO transactions(id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key, type, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'

    let values = [txnId, tx.sender, tx.sequence_number, tx.value, tx.receiver, tx.max_gas_amount, tx.gas_unit_price, tx.expiration_time, tx.signature, tx.public_key, tx.type, tx.status]

    // callback
    let result = clientPg.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)

        values = [txnId, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        
        clientPg.query(text, values, (err, res) => {
          if (err) {
            console.log('2nd error');
          }
          else {
            console.log('txn '+txnId+' inserted');

            if (tx.last) {
              setTimeout(function () {
                console.log('2 sec pause before trying again');
                run();
              }, 2000);
            }

          }
        });

      } else {
        console.log('txn '+txnId+' inserted');
        // console.log(txnId);

        if (tx.last) {
          console.log('2 sec pause before trying again');
          setTimeout(function () {
            run();
          }, 2000);
        }
      }

    })

  }


}

run();
