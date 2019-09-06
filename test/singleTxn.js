const libra = require('../dist/libra.cjs');

const client = new libra.Client('ac.testnet.libra.org:8000');

const test = async () => {

  /** Get transactions */
  params = {
    start_version: 905,
    limit: 1,
    fetch_events: true,
  };
  client.request('get_transactions', params).then(transactions => {

    // // console.log(transactions.txn_list_with_proof.transactions[0].raw_txn_bytes);
    // let decoded = libra.utils.deserializeRawTxnBytes(transactions.txn_list_with_proof.transactions[0].raw_txn_bytes);

    // let decoded = libra.utils.decodeGetTransactionsResult(transactions);

    let decoded = libra.utils.decodeRawTx(transactions.txn_list_with_proof.transactions[0].raw_txn_bytes);

    // console.log('Transactions', decoded);
  });
};

test();