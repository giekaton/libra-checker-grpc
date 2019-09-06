[![npm](https://img.shields.io/npm/v/libra-grpc.svg)](https://www.npmjs.com/package/libra-grpc)
[![Join the chat](https://img.shields.io/discord/590507340399116288.svg)](https://discord.gg/XyS25F6)

# Libra gRPC

A lightweight JavaScript library for Libra

#### Node.js
To install Libra gRPC on Node.js, open your terminal and run:
```
npm install libra-grpc --save
```

### Usage
```js
var libra = require('libra-grpc');

// Init gRPC client
var client = new libra.Client('ac.testnet.libra.org:8000');

// Get account state
var params = {
  address: Buffer.from('435fc8fc85510cf38a5b0cd6595cbb8fbb10aa7bb3fe9ad9820913ba867f79d4', 'hex')
};
client.request('get_account_state', params, function(err, result) {
  console.log(err, result);
});

// If a callback is not provided, a Promise is returned
client.request('get_account_state', params).then(function(result) {
  console.log(result);
});
```
[See more examples](/test/test.js)

### API

#### Get account state
Get the latest state for an account.

```js
var params = {
  address: Buffer.from('435fc8fc85510cf38a5b0cd6595cbb8fbb10aa7bb3fe9ad9820913ba867f79d4', 'hex')
};
client.request('get_account_state', params, function(err, result) {
  console.log(err, result);
});
```

#### Get account transaction
Get the committed transaction by account and sequence number.

```js
var params = {
  account: Buffer.from('435fc8fc85510cf38a5b0cd6595cbb8fbb10aa7bb3fe9ad9820913ba867f79d4', 'hex'),
  sequence_number: 1,
  fetch_events: true
};
client.request('get_account_transaction_by_sequence_number', params, function(err, result) {
  console.log(err, result);
});
```

#### Get events
Get event by account and path.

```js
var params = {
  access_path: {
    address: Buffer.from('435fc8fc85510cf38a5b0cd6595cbb8fbb10aa7bb3fe9ad9820913ba867f79d4', 'hex')
  },
  start_event_seq_num: 2,
  ascending: true,
  limit: 10
};
client.request('get_events_by_event_access_path', params, function(err, result) {
  console.log(err, result);
});
```

#### Get transactions
Get the committed transaction by range

```js
var params = {
  start_version: 1,
  limit: 10,
  fetch_events: true
};
client.request('get_transactions', params, function(err, result) {
  console.log(err, result);
});
```

### Utils

#### Deserialize raw txn bytes
Deserialize the raw bytes into a raw transaction object

```js
var rawTxnBytes = 'CiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACiQTjj/zqDoBRr0AQq/AUxJQlJBVk0KAQAHAUoAAAAGAAAAA1AAAAAGAAAADFYAAAAFAAAADVsAAAAEAAAABV8AAAAzAAAABJIAAAAgAAAAB7IAAAANAAAAAAAAAQACAAMAAQQAAgACBAIDAgQCBjxTRUxGPgxMaWJyYUFjY291bnQJTGlicmFDb2luBG1haW4PbWludF90b19hZGRyZXNzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIABAAMAAwBEQECEiQIARIgGw7O7WUWHZkVsSi1zRwRzkktcCs7ls26I/IZpt1t7qYSChIIAOH1BQAAAAA=';
var rawTx = libra.utils.deserializeRawTxnBytes(rawTxnBytes);
console.log('Raw transaction', rawTx);
```

### Getting help

If you believe you're experiencing a bug with or want to report incorrect documentation, open an issue on our issue tracker. For a more real-time avenue of communication, check out the Discord or Telegram servers. There you'll find community members who can help answer about development questions.

* [Join us on Telegram](https://t.me/joinchat/DAQb4RSNpqEok3p-QdmaKQ)
* [Join us on Discord](https://discord.gg/XyS25F6)

## License

[MIT](LICENSE).
