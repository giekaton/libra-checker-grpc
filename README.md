**About**

gRPC client for [Libra Checker](https://librachecker.com) to fetch transactions from the blockchain and deserialize them with Libra Canonical Serialization (LCS) library written in Python. Deserialized transactions are then stored in PostgreSQL database.

It runs as a background pm2 process that spawns the Python gRPC client.
<br/>
<br/>

**Quick Start**

1. Install [/yuan-xy/libra-client](https://github.com/yuan-xy/libra-client).

2. Create PostgreSQL database tables (see png files for the structure).

3. Edit and rename the example auth files to `lcAuth.js` and `lcAuth.py`.

4. Install dependencies with `npm install`.

<br/>

You can now fetch Libra transactions by running: `node lcPython.js`

To run it in the background: `pm2 start lcPython.js`

<br/>

Thanks to [Yuan Xy](https://github.com/yuan-xy/) for his open source contributions and help.
