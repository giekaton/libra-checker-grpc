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

  // default
  nextTxnId = 0;

  // Check the id of the latest txn stored in the local db
  clientPg.query('SELECT * FROM transactions ORDER BY id DESC LIMIT 1')
  .then((res) => {
    if(typeof(res.rows[0]) != 'undefined') {
      console.log('increase')
      nextTxnId = Number(res.rows[0].id) + 1;
    }
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
    
    // nextTxnId = 1;
    // nextTxnId = 382;

    console.log('nextTxnId:', nextTxnId);

    let start_version = nextTxnId;
    let limit = 50;
    if (nextTxnId == 0) {
      limit = 1;
    }

    let txns = client.getTxnByRangePython100(start_version, limit, true);

    if (txns == "error") {
      run();
    }
    
    return(txns);

  }

  const base64abc = (() => {
    let abc = [],
      A = "A".charCodeAt(0),
      a = "a".charCodeAt(0),
      n = "0".charCodeAt(0);
    for (let i = 0; i < 26; ++i) {
      abc.push(String.fromCharCode(A + i));
    }
    for (let i = 0; i < 26; ++i) {
      abc.push(String.fromCharCode(a + i));
    }
    for (let i = 0; i < 10; ++i) {
      abc.push(String.fromCharCode(n + i));
    }
    abc.push("+");
    abc.push("/");
    return abc;
  })();
  
  function bytesToBase64(bytes) {
    let result = '', i, l = bytes.length;
    for (i = 2; i < l; i += 3) {
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
      result += base64abc[bytes[i] & 0x3F];
    }
    if (i === l + 1) { // 1 octet missing
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[(bytes[i - 2] & 0x03) << 4];
      result += "==";
    }
    if (i === l) { // 2 octets missing
      result += base64abc[bytes[i - 2] >> 2];
      result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += base64abc[(bytes[i - 1] & 0x0F) << 2];
      result += "=";
    }
    return result;
  }
  
  const utf8encoder = new TextEncoder();
  
  // All solutions at MDN only provide a way to encode a native JS string to UTF-16 base64 string.
  // Here, you can apply any encoding supported by TextEncoder.
  function base64utf8encode(str) {
    return bytesToBase64(utf8encoder.encode(str));
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
      console.log(txnsObj.length)
      
      if (Object.entries(txnsObj).length === 0 && txnsObj.constructor === Object) {
        console.log('Empty, starting again...');
        setTimeout(() => {run()}, 1000)
      }

      i = 1;
      for (const id in txnsObj) {
        let txnId = id;
        console.log(txnId);

        let signed_txn_base64 = txnsObj[id];
        signed_txn_base64 = bytesToBase64(signed_txn_base64.array[0]);

        // console.log(txnId, signed_txn_base64);

        if (signed_txn_base64 == 'wait') {
          return(console.log('wait'));
        }

        // Python setup
        const myPythonScript = "transaction2.py";

        const pgExec = lcAuth.pythonExecutable();
        const scriptExecution = spawn(pgExec, [myPythonScript]);

        // 1. Passing serialized txn to Python LCS
        scriptExecution.stdin.write(signed_txn_base64);
        scriptExecution.stdin.end();

        // 2. Output from Python: Deserialized txn
        scriptExecution.stdout.on('data', (data) => {

          // convert an Uint8Array to a string
          let txnString = String.fromCharCode.apply(null, data);

          txnString = JSON.parse(txnString.replace(/'/g,'"'))

          if (txnString.type == "Block Metadata") {
            txnString = txnString.BlockMetadata;
            txnString.type = "Block Metadata";
          }
          else {
            let type = txnString.type; 
            txnString = txnString.UserTransaction;
            txnString.type = type;
          }

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
    console.log('STARTING updateDB');
    // let txnsArray = txnsObjDes;
    // console.log(txnsObjDes);
    // return;

    txnsObjDesLength = Object.keys(txnsObjDes).length;
    txnsPrepForDB = {};

    console.log('STARTING updateDB LOOP');


    i = 1;
    for (const id in txnsObjDes) {
      console.log('Updating Txn:', id);
      
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

      console.log(tx);

      if (tx.type == "Block Metadata") {
        console.log("Block Metadata", tx, txnId);

        txnPrep.sender = tx.proposer;
        txnPrep.type = 'Block Metadata';
        txnPrep.status = 'success';
        txnPrep.receiver = tx.id;
        txnPrep.value = 0;
        txnPrep.expiration_time = Math.floor(new Date() / 1000);

        finishRunGetReady(txnId, txnPrep);
      }

      // SETTING VALUES
      // Genesis (0th) transaction
      else if (txnId == 0) {
        txnPrep.sender = tx.raw_txn.sender;
        txnPrep.sequence_number = tx.raw_txn.sequence_number;
        txnPrep.receiver = 'undefined';
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
            try {
              let text = 'INSERT INTO balances AS t (address, balance) VALUES($1, $2) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance)';
              let valueMinter = txnPrep.value * -1;
              let values = [txnPrep.sender, valueMinter];
              const res = await clientPg.query(text, values);

              console.log(res.rows[0])
            } catch (err) {
              console.log(err.stack)
            }
            
            // 2. update receiver's balance
            try {
              let text2 = 'INSERT INTO balances AS t (address, balance) VALUES($1, $2) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance)';
              let values2 = [txnPrep.receiver, txnPrep.value];
              const res = await clientPg.query(text2, values2);

              console.log(res.rows[0])
            } catch (err) {
              console.log(err.stack)
            }

            finishRunGetReady(txnId, txnPrep);

          }
        }

        // Txn type: Peer-to-Peer transaction
        else if (txnPrep.type == 'Transfer Libra Coins') {

          let queryBalanceSender = {
            name: 'get-balance-sender',
            text: 'SELECT * FROM balances WHERE address = $1',
            values: [txnPrep.sender],
          }

          try {
            const res = await clientPg.query(queryBalanceSender);

          //   console.log(res.rows[0])
          // } catch (err) {
          //   console.log(err.stack)
          // }

          // clientPg.query(queryBalanceSender)
          // .then(res => {
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

              try {
                const res = await clientPg.query(updateBalanceSender)
                // console.log(res.rows[0]);
                console.log('sender balance updated')
              } catch (err) {
                console.log(err.stack)
              }


              // 2. insert/update receiver's balance
              let text2 = 'INSERT INTO balances AS t (address, balance) VALUES($1, $2) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance)';
              let values2 = [txnPrep.receiver, txnPrep.value];

              try {
                const res = await clientPg.query(text2, values2)

                console.log(res.rows[0])
                finishRunGetReady(txnId, txnPrep);
              } catch (err) {
                console.log(err.stack)
              }

            }
          // })
          }
          // .catch(e => console.error(e.stack))
          catch (err) {
            console.log('EEEEEEEEEEEE', err);
          }

        }

      }

      async function finishRunGetReady(txnId, txnPrep) {

        try {
          finishRun(txnId, txnPrep);
        }
        catch(error) {
          console.log(error.message);
        } 
       
        // finishRun(txnId, txnPrep);
      }

    }

  }


  // ADD TO POSTGRESQL
  async function finishRun(txnId, tx) {

    console.log(txnId, tx);
    // return;

    const text = 'INSERT INTO transactions(id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key, type, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'

    let values = [txnId, tx.sender, tx.sequence_number, tx.value, tx.receiver, tx.max_gas_amount, tx.gas_unit_price, tx.expiration_time, tx.signature, tx.public_key, tx.type, tx.status]

    try {
      const res = await clientPg.query(text, values);

      console.log('txn '+txnId+' inserted');
      // console.log(txnId);

      if (tx.last) {
        console.log('0.5 sec pause before trying again');
        setTimeout(function () {
          run();
        }, 500);
      }
    }
    catch (err) {

      console.log(err.stack)

      values = [txnId, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      
      try {
        const res = await clientPg.query(text, values);

        console.log('txn '+txnId+' inserted');

        if (tx.last) {
          setTimeout(function () {
            console.log('2 sec pause before trying again');
            run();
          }, 2000);
        }
      }
      catch (err) {
        console.log('2nd error:', err);
      }
    }


  }


}

run();
