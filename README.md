**About**

Node.js gRPC client for [Libra Checker](https://librachecker.com) to fetch transactions from the blockchain and deserialize them using Libra Canonical Serialization library written in Python (running as a Node.js child process). Deserialized transactions are returned back to Node.js and then stored in PostgreSQL database.
<br/>
<br/>
<br/>
**Quick Start**

1. Install [/yuan-xy/libra-client](https://github.com/yuan-xy/libra-client).

2. Create PostgreSQL database tables (see png files for the structure).

3. Edit and rename the example auth file to `lcAuth.js`.

4. Install dependencies with `parcel index.html` command, ignore errors if any. Plus, you may need to run 'npm install'.

<br/>
<br/>
Done! You can now query transactions by running: `node lcPython2.js`
<br/>
<br/>
<br/>
**Notes**

The first release of `libra-checker-grpc` was based on [bonustrack/libra-grpc](https://github.com/bonustrack/libra-grpc). The current release is based on [/kulapio/libra-core](https://github.com/kulapio/libra-core), which is based on [/perfectmak/libra-core](https://github.com/perfectmak/libra-core).

Thanks to Kulap and Apemon for the [JavaScript LCS](https://github.com/kulapio/libra-core/releases/tag/v2.0.2). Not yet implemented in this client, since structs have changed and need update. Attempts to use Apemon's JavaScript LCS to deserialize a transaction (querying by range) are in `lc.js`, run ir with `node lc.js` command.

Currently, Python LCS from Canoser is being used as a Node.js child process. It works great. Thanks to [Yuan Xy](https://github.com/yuan-xy/) for his open source contributions and help.

@todo:
- deserialize transaction with JavaScript LCS
- ~~deserialize multiple transactions at once~~
- ~~fix genesis txn bug~~
- ~~failed txn when not enough LBR~~
