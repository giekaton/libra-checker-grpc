import libra

import struct

from libra.transaction import SignedTransaction, Transaction
import base64

# Create a new random wallet
# wallet = libra.WalletLibrary.new()

# print(wallet)

# # Create a new wallet from mnemonic words
# wallet = libra.WalletLibrary.new_from_mnemonic(mnemonic, child_count)

# # Recover wallet from a offical Libra CLI backup file
# wallet = libra.WalletLibrary.recover(filename)



# c = libra.Client("testnet")
# # signed_txn = c.get_transaction(381859)
# # print(signed_txn)

# signed_txn = c.get_transaction(0, 10)
# print(signed_txn.to_json())

# c.get_transactions(50, 10)



def int_list_to_hex(ints):
    return struct.pack("<{}B".format(len(ints)), *ints).hex()

def bytes_to_int_list(bytes_str):
    tp = struct.unpack("<{}B".format(len(bytes_str)), bytes_str)
    return list(tp)

def hex_to_int_list(hex_str):
    return bytes_to_int_list(bytes.fromhex(hex_str))



import sys

for line in sys.stdin:
    signed_txn_from_grpc = line


# signed_txn_from_grpc = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKVQwY+wMAAAAAAAACAAAAxAAAAExJQlJBVk0KAQAHAUoAAAAGAAAAA1AAAAAGAAAADVYAAAAGAAAADlwAAAAGAAAABWIAAAAzAAAABJUAAAAgAAAACLUAAAAPAAAAAAAAAQACAAMAAQQAAgACBAIAAwIEAgMABjxTRUxGPgxMaWJyYUFjY291bnQJTGlicmFDb2luBG1haW4PbWludF90b19hZGRyZXNzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAQADAAMARMBAQICAAAAAQAAAFTMnBdEGljMAVmlnxGCU03eJXbarbWZ0NAZYk3KGvtyAAAAAIACdQMAAAAA4CICAAAAAAAAAAAAAAAAAFz+8V0AAAAAIAAAAGBb4sdiAL+EGGdVVAZQlqD9c3Waymh554vbPL3tlUYrQAAAAOoJEv9IFCE0Y0sSiDwFBj45M8d3hM1uYq0K+bfySg8q4Ybe7aHGy/BsREQO3YefNd5zz8kLCPsnLW2oGpbobAI="

# # blockmetadata
# signed_txn_from_grpc = "AgAAACAAAABSN3KLrJWi6Iwfl+xBS4T6uBSUMIAfj+FUytwttu4zS0Z3NSNkmQUAAAAAAAK55WZWxbRpU2cQDYvPNPMJSZrNYgldYfdnY3gAb4Ax"

# signed_txn_bytes = bytes.fromhex(signed_txn_from_grpc_lc)

# print(signed_txn_from_grpc)
signed_txn_bytes = base64.b64decode(signed_txn_from_grpc)


# print (signed_txn_from_grpc)
# print (signed_txn_bytes)


tx = Transaction.deserialize(signed_txn_bytes)

tx = tx.to_json_serializable()

if 'BlockMetadata' in tx:
  type = "Block Metadata"
  tx['type'] = type
  print (tx)

else:
  from libra.bytecode import bytecodes
  # print(tx['UserTransaction'])
  payload = tx['UserTransaction']['raw_txn']['payload']
  

  def get_tx_abbreviation_name(payload, version):
      # if version == 0:
      #     return "Genesis"
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


  type = get_tx_abbreviation_name(payload, 1)

  tx['type'] = type

  print(tx)