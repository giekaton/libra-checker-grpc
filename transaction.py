import libra

from libra.cli.command import *

import struct
import time

from libra.transaction import SignedTransaction, Transaction
import base64

def int_list_to_hex(ints):
    return struct.pack("<{}B".format(len(ints)), *ints).hex()

def bytes_to_int_list(bytes_str):
    tp = struct.unpack("<{}B".format(len(bytes_str)), bytes_str)
    return list(tp)

def hex_to_int_list(hex_str):
    return bytes_to_int_list(bytes.fromhex(hex_str))


import sys

for line in sys.stdin:
  nextTxnId = int(line)


c = libra.Client("testnet")


# mint txn and blockmetadata
# nextTxnId = 62880
# nextTxnId = 384945

# mint
# nextTxnId = 68943

# p2p
# nextTxnId = 234834
# nextTxnId = 242402

# nextTxnId = 8209738
# nextTxnId = 8230240


txns = c.get_transactions(nextTxnId, 1000)


txnsArray = []
txnId = nextTxnId

for tx in txns:
  tx = tx.to_json_serializable()

  # get txn type
  if 'timestamp_usec' in tx:
    type = "Block Metadata"
  else:
    # print(tx)
    from libra.bytecode import bytecodes
    # print(tx['UserTransaction'])
    payload = tx['raw_txn']['payload']
    
    def get_tx_abbreviation_name(payload, version):
      if version == 0:
          return "Genesis"
      try:
          payload['Script'] = payload.pop('Program')
      except KeyError:
          pass
      if list(payload)[0] != "Script":
          return list(payload)[0]
      code = hex_to_int_list(payload['Script']['code'])
      if code == bytecodes["mint"]:
          return "Mint Libra Coins"
      if code == bytecodes["peer_to_peer_transfer"]:
          return "Transfer Libra Coins"
      if code == bytecodes["create_account"]:
          return "Create Account"
      if code == bytecodes["rotate_authentication_key"]:
          return "Rotate Authentication Key"
      return "script"

    type = get_tx_abbreviation_name(payload, txnId)
    print(type)

  tx['type'] = type
  tx['txnId'] = txnId
  tx['last'] = 0

  txnId = txnId + 1
  if txnId == nextTxnId + 3:
    tx['last'] = 1

  txnsArray.append(tx)


# current unix timestamp
time = time.time()

import psycopg2
from lcAuth import passPostgres

connection = psycopg2.connect(
  user="postgres",
  password=passPostgres,
  host="localhost",
  port="5432",
  database="postgres"
)
cursor = connection.cursor()

# print(txnsArray)

for txn in txnsArray:
  txnPrep = {}
  txnPrep['id'] = txn['txnId']
  txnPrep['type'] = txn['type']
  # print(txnPrep)

  if txn['type'] == "Genesis":
    # print(txn)
    txnPrep['sender'] = txn['raw_txn']['sender']
    txnPrep['receiver'] = '0'
    # txnPrep['time'] = txn['raw_txn']['expiration_time']
    txnPrep['seq'] = txn['raw_txn']['sequence_number']
    # txnPrep['time'] = txn['raw_txn']['expiration_time']
    # print(txnPrep['seq'], txnPrep['time'])

    try:
      postgres_insert_query = """ INSERT INTO transactions (id, type, status, sender, receiver, seq) VALUES (%s,%s,%s,%s,%s,%s)"""
      record_to_insert = (txnPrep['id'], txnPrep['type'], 'success', txnPrep['sender'], txnPrep['receiver'], txnPrep['seq'] )
      cursor.execute(postgres_insert_query, record_to_insert)

      connection.commit()
      count = cursor.rowcount
    except (Exception, psycopg2.Error) as error :
      if(connection):
        print('error', error)

  elif txn['type'] == "Block Metadata":
    txnPrep['sender'] = txn['proposer']
    txnPrep['receiver'] = txn['id']

    try:
      postgres_insert_query = """ INSERT INTO transactions (id, type, status, sender, receiver, time) VALUES (%s,%s,%s,%s,%s,%s)"""
      record_to_insert = (txnPrep['id'], txnPrep['type'], 'success', txnPrep['sender'], txnPrep['receiver'], time)
      cursor.execute(postgres_insert_query, record_to_insert)

      connection.commit()
      count = cursor.rowcount
    except (Exception, psycopg2.Error) as error :
      if(connection):
        print('error')

  elif txn['type'] == "Create Account":
    txnPrep['sender'] = txn['raw_txn']['sender']
    txnPrep['sequence_number'] = txn['raw_txn']['sequence_number']
    txnPrep['max_gas_amount'] = txn['raw_txn']['max_gas_amount']
    txnPrep['gas_unit_price'] = txn['raw_txn']['gas_unit_price']
    txnPrep['expiration_time'] = txn['raw_txn']['expiration_time']
    txnPrep['public_key'] = txn['public_key']
    txnPrep['signature'] = txn['signature']
    txnPrep['receiver'] = txn['raw_txn']['payload']['Script']['args'][0]['Address']
    txnPrep['value'] = txn['raw_txn']['payload']['Script']['args'][1]['U64']
    txnPrep['status'] = 'success'

    #insert txn
    try:
      postgres_insert_query = """ INSERT INTO transactions (id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key, type, status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
      record_to_insert = (txnPrep['id'], txnPrep['sender'], txnPrep['sequence_number'], txnPrep['value'], txnPrep['receiver'], txnPrep['max_gas_amount'], txnPrep['gas_unit_price'], txnPrep['expiration_time'], txnPrep['signature'], txnPrep['public_key'], txnPrep['type'], txnPrep['status'])
      cursor.execute(postgres_insert_query, record_to_insert)

      connection.commit()
      count = cursor.rowcount
    except (Exception, psycopg2.Error) as error :
      if(connection):
        print('error', error)

  elif txn["type"] == "Mint Libra Coins":
    txnPrep['sender'] = txn['raw_txn']['sender']
    txnPrep['sequence_number'] = txn['raw_txn']['sequence_number']
    txnPrep['max_gas_amount'] = txn['raw_txn']['max_gas_amount']
    txnPrep['gas_unit_price'] = txn['raw_txn']['gas_unit_price']
    txnPrep['expiration_time'] = txn['raw_txn']['expiration_time']
    txnPrep['public_key'] = txn['public_key']
    txnPrep['signature'] = txn['signature']
    txnPrep['receiver'] = txn['raw_txn']['payload']['Script']['args'][0]['Address']
    txnPrep['value'] = txn['raw_txn']['payload']['Script']['args'][1]['U64']
    txnPrep['status'] = 'success'

    if txnPrep['value'] > 1000000000000000:
      txnPrep['status'] = 'failed'
    else:
      # print("update minter's balance")
      try:
        postgres_insert_query = """ INSERT INTO balances AS t (address, balance) VALUES(%s,%s) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance) """
        value_minter = txnPrep['value'] * -1
        address = txnPrep['sender']

        values = (address, value_minter)
        cursor.execute(postgres_insert_query, values)

        connection.commit()
        count = cursor.rowcount
      except (Exception, psycopg2.Error) as error:
        print('ERROR:', error)
      
      # print("update receiver's balance")
      try:
        postgres_insert_query = """ INSERT INTO balances AS t (address, balance) VALUES(%s,%s) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance) """
        value = txnPrep['value']
        address = txnPrep['receiver']

        values = (address, value)
        cursor.execute(postgres_insert_query, values)

        connection.commit()
        count = cursor.rowcount
      except (Exception, psycopg2.Error) as error:
        print('ERROR:', error)


    #insert txn
    try:
      postgres_insert_query = """ INSERT INTO transactions (id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key, type, status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
      record_to_insert = (txnPrep['id'], txnPrep['sender'], txnPrep['sequence_number'], txnPrep['value'], txnPrep['receiver'], txnPrep['max_gas_amount'], txnPrep['gas_unit_price'], txnPrep['expiration_time'], txnPrep['signature'], txnPrep['public_key'], txnPrep['type'], txnPrep['status'])
      cursor.execute(postgres_insert_query, record_to_insert)

      connection.commit()
      count = cursor.rowcount
    except (Exception, psycopg2.Error) as error :
      if(connection):
        print('error', error)

    # print(txnPrep)
    # print("___mint")
    # exit()


  elif txn["type"] == "Transfer Libra Coins":
    txnPrep['sender'] = txn['raw_txn']['sender']
    txnPrep['sequence_number'] = txn['raw_txn']['sequence_number']
    txnPrep['max_gas_amount'] = txn['raw_txn']['max_gas_amount']
    txnPrep['gas_unit_price'] = txn['raw_txn']['gas_unit_price']
    txnPrep['expiration_time'] = txn['raw_txn']['expiration_time']
    txnPrep['public_key'] = txn['public_key']
    txnPrep['signature'] = txn['signature']
    txnPrep['receiver'] = txn['raw_txn']['payload']['Script']['args'][0]['Address']
    txnPrep['value'] = txn['raw_txn']['payload']['Script']['args'][1]['U64']
    txnPrep['status'] = 'success'

    # get sender's balance from db
    postgreSQL_select_Query = "SELECT * FROM balances WHERE address = %s"

    cursor.execute(postgreSQL_select_Query, (txnPrep['sender'],))
    result = cursor.fetchall()
    for row in result:
      currentBalanceSender = row[1]

    if (txnPrep['value'] > currentBalanceSender):
      txnPrep['status'] = 'failed'
    else:
      # print("Update sender's balance")
      newBalanceSender = currentBalanceSender - txnPrep['value']
      
      try:
        postgres_query = """ UPDATE balances SET balance = %s WHERE address = %s """

        values = (newBalanceSender, txnPrep['sender'])
        cursor.execute(postgres_query, values)

        connection.commit()
        count = cursor.rowcount
      except (Exception, psycopg2.Error) as error:
        print('ERROR:', error)

      # print("Update receiver's balance")
      try:
        postgres_query = """ INSERT INTO balances AS t (address, balance) VALUES(%s, %s) ON CONFLICT (address) DO UPDATE SET balance = (t.balance + EXCLUDED.balance) """

        values = (txnPrep['receiver'], txnPrep['value'])
        cursor.execute(postgres_query, values)

        connection.commit()
        count = cursor.rowcount
      except (Exception, psycopg2.Error) as error:
        print('ERROR:', error)

    # print("Update txn")
    try:
      postgres_insert_query = """ INSERT INTO transactions (id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key, type, status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
      record_to_insert = (txnPrep['id'], txnPrep['sender'], txnPrep['sequence_number'], txnPrep['value'], txnPrep['receiver'], txnPrep['max_gas_amount'], txnPrep['gas_unit_price'], txnPrep['expiration_time'], txnPrep['signature'], txnPrep['public_key'], txnPrep['type'], txnPrep['status'])
      cursor.execute(postgres_insert_query, record_to_insert)

      connection.commit()
      count = cursor.rowcount
    except (Exception, psycopg2.Error) as error :
      if(connection):
        print('error', error)

    # print(txnPrep)
    # print("___transfer")
    # exit()

  elif txn["type"] == "Rotate Authentication Key":
    txnPrep['sender'] = txn['raw_txn']['sender']
    txnPrep['sequence_number'] = txn['raw_txn']['sequence_number']
    txnPrep['max_gas_amount'] = txn['raw_txn']['max_gas_amount']
    txnPrep['gas_unit_price'] = txn['raw_txn']['gas_unit_price']
    txnPrep['expiration_time'] = txn['raw_txn']['expiration_time']
    txnPrep['public_key'] = txn['public_key']
    txnPrep['signature'] = txn['signature']
    txnPrep['receiver'] = txn['raw_txn']['payload']['Script']['args'][0]['ByteArray']
    txnPrep['value'] = 0

    #insert txn
    try:
      postgres_insert_query = """ INSERT INTO transactions (id, sender, seq, value, receiver, gas_max, gas_price, time, signature, public_key, type, status) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
      record_to_insert = (txnPrep['id'], txnPrep['sender'], txnPrep['sequence_number'], txnPrep['value'], txnPrep['receiver'], txnPrep['max_gas_amount'], txnPrep['gas_unit_price'], txnPrep['expiration_time'], txnPrep['signature'], txnPrep['public_key'], txnPrep['type'], 'success')
      cursor.execute(postgres_insert_query, record_to_insert)

      connection.commit()
      count = cursor.rowcount
    except (Exception, psycopg2.Error) as error :
      if(connection):
        print('error', error)

    # print(txnPrep)
    # print("___rotate")
    # exit()

  else:
    print('unknown txn type:', txn['txnId'], txn['type'])

print('done')