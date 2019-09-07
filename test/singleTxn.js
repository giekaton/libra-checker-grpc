const libra = require('../dist/libra.cjs');

const client = new libra.Client('ac.testnet.libra.org:8000');

const test = async () => {

  /** Get transactions */
  params = {
    start_version: 3248,
    limit: 1,
    fetch_events: true,
  };
  client.request('get_transactions', params).then(transactions => {

    // // console.log(transactions.txn_list_with_proof.transactions[0].raw_txn_bytes);
    // let decoded = libra.utils.deserializeRawTxnBytes(transactions.txn_list_with_proof.transactions[0].raw_txn_bytes);

    // let decoded = libra.utils.decodeGetTransactionsResult(transactions);

    let decoded = libra.utils.decodeRawTx(transactions.txn_list_with_proof.transactions[0].raw_txn_bytes);

    decoded.gasUsed = libra.utils.second(transactions.txn_list_with_proof.infos[0].gas_used);

    // @todo: decode
    decoded.senderPublicKey = transactions.txn_list_with_proof.transactions[0].sender_public_key;
    decoded.senderSignature = transactions.txn_list_with_proof.transactions[0].sender_signature;
    decoded.signedTxnHash = transactions.txn_list_with_proof.infos[0].signed_transaction_hash;
    decoded.stateRootHash = transactions.txn_list_with_proof.infos[0].state_root_hash;
    decoded.eventRootHash = transactions.txn_list_with_proof.infos[0].event_root_hash;
    decoded.rawTxnBytes = transactions.txn_list_with_proof.transactions[0].raw_txn_bytes;

    console.log(decoded);
  });
};

test();