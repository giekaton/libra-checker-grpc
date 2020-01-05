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


function run() {
  console.log('START')

  // default
  let nextTxnId = 0;

  // Check the id of the latest txn stored in the local db
  clientPg.query('SELECT * FROM transactions ORDER BY id DESC LIMIT 1')
  .then((res) => {
    if(typeof(res.rows[0]) != 'undefined') {
      // console.log('increase')
      nextTxnId = Number(res.rows[0].id) + 1;
    }
    // Start the cycle
    // nextTxnId = 68942
    console.log('Next txn:', nextTxnId)
    asyncRun(nextTxnId);
  })
  .catch(e => console.error(e.stack))

  async function asyncRun(nextTxnId) {
    try {
      pythonLCS(nextTxnId);
    }
    catch (error) {
      console.log(error.message);
    } 
  }

  async function pythonLCS(nextTxnId) {
  
    // Python setup
    const myPythonScript = "transaction.py";

    const pgExec = lcAuth.pythonExecutable();
    const scriptExecution = spawn(pgExec, [myPythonScript]);
    // console.log(nextTxnId)

    console.log("Starting Python LCS...")

    // 1. Passing next txn ID (version)
    scriptExecution.stdin.write(nextTxnId+"");
    scriptExecution.stdin.end();

    let isDone = false;

    // 2. Output from Python
    scriptExecution.stdout.on('data', (data) => {
      // console.log(data);
      // convert an Uint8Array to a string
      const string = String.fromCharCode.apply(null, data).trim();

      if (string=='done') {
        isDone = true
        console.log('LCS done, 2sec timeout...')
        setTimeout(() => { run() }, 2000)
      }
      else {
        console.log("Error:", string)
      }

    });
    
    function autoRestart() {
      setTimeout(function() {
        if(!isDone) {
          console.log('No resp from grpc, restarting')
          run()
        }
      }, 600000)
    }
    autoRestart();

  }

}

run();