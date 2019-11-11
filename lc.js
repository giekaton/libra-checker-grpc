// Database password
const lcAuth = require('./lcAuth.js');

const { Client } = require('pg');

const clientPg = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: lcAuth.passPostgres(),
  port: 5432,
})

clientPg.connect()


lc = require('./index.js');

// address = 'ad67eeb1f1dc22bb1b3f49e9785e1027c9e37a91da449cd1a20367a6364534d6';

function run() {

  // const client = new lc.LibraClient({ network: 'ac.testnet.libra.org' })

  nextTxnId = 1;

  clientPg.query('SELECT * FROM transactions ORDER BY id DESC LIMIT 1')
  .then((res) => {
      console.log('increase')
      nextTxnId = Number(res.rows[0].id) + 1;

      msg();
    }
  )
  .catch(e => console.error(e.stack))


  function getData() {
    return new Promise(resolve => {
      const client = new lc.LibraClient({ network: 'ac.testnet.libra.org' })

      // const accountAddress = '854563c50d20788fb6c11fac1010b553d722edb0c02f87c2edbdd3923726d13f';
      // const accountState = client.getAccountState(accountAddress);

      // address = 'ad67eeb1f1dc22bb1b3f49e9785e1027c9e37a91da449cd1a20367a6364534d6';
      // sequenceNumber = 1;
      // accTxn = client.getAccountTransaction(address, sequenceNumber);

      // const accountAddress = 'ad67eeb1f1dc22bb1b3f49e9785e1027c9e37a91da449cd1a20367a6364534d6';
      // const sequenceNumber = 10; //can also use a string for really large sequence numbers;
      // const transaction = client.getAccountTransaction(accountAddress, sequenceNumber, true);

      let start_version = 2;
      // let start_version = nextTxnId;
      let limit = 1;


      let transaction = client.getTxnByRange(start_version, limit, true);

      resolve(transaction);
      
      // let transaction = client.getTxnByRange(start_version, limit, true);
      // let transaction = '';
      
      
    });
  }

  async function msg() {
    const msg = await getData();

    console.log('Result:', msg.UserTransaction);

    // ADD TO POSTGRESQL

    // const text = 'INSERT INTO transactions(id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'

    // let values = [nextTxnId, msg.UserTransaction.sender, 0, msg.UserTransaction.value, msg.UserTransaction.receiver.value, 0, 0, 0, 'signature', 'public_key']

    // // callback
    // let result = clientPg.query(text, values, (err, res) => {
    //   if (err) {
    //     console.log(err.stack)
    //   } else {
    //     console.log('txn inserted');
    //     setTimeout(function () {
    //       console.log('0.8 sec pause before trying again');
    //       run();
    //     }, 800);
    //   }
    // })
  }

}

run();

// msg();