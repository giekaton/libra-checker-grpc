const libra = require('..');

const client = new libra.Client('ac.testnet.libra.org:8000');

const test = async () => {
  /** Get account state */
  let params = {
    address: Buffer.from('435fc8fc85510cf38a5b0cd6595cbb8fbb10aa7bb3fe9ad9820913ba867f79d4', 'hex'),
  };
  const accountState = await client.request('get_account_state', params);
  console.log('Account state', accountState);

  /** Get account transaction */
  params = {
    account: Buffer.from('435fc8fc85510cf38a5b0cd6595cbb8fbb10aa7bb3fe9ad9820913ba867f79d4', 'hex'),
    sequence_number: 1,
    fetch_events: true,
  };
  const transaction = await client.request('get_account_transaction_by_sequence_number', params);
  console.log('Transaction', transaction);

  /** Get events */
  params = {
    access_path: {
      address: Buffer.from('435fc8fc85510cf38a5b0cd6595cbb8fbb10aa7bb3fe9ad9820913ba867f79d4', 'hex'),
    },
    start_event_seq_num: 2,
    ascending: true,
    limit: 10,
  };
  const events = await client.request('get_events_by_event_access_path', params);
  console.log('Events', events);

  /** Get transactions */
  params = {
    start_version: 1,
    limit: 10,
    fetch_events: true,
  };
  client.request('get_transactions', params).then(transactions => {
    console.log('Transactions', transactions);
  });
};

test();