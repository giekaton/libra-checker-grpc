import pdb
from canoser import *
from datetime import datetime
import base64
import struct
import json
from hasher import HashValue

ADDRESS_LENGTH = 32
ED25519_PUBLIC_KEY_LENGTH = 32
ED25519_SIGNATURE_LENGTH = 64

class BlockMetadata(Struct):
    _fields = [
        ('id', HashValue),
        ('timestamp_usec', Uint64),
        #('previous_block_votes', {Address, [Uint8, ED25519_SIGNATURE_LENGTH]}),
        ('previous_block_votes', {}),
        ('proposer', [Uint8, ADDRESS_LENGTH, False])
    ]

class TransactionArgument(RustEnum):
    _enums = [
        ('U64', Uint64),
        ('Address', [Uint8, ADDRESS_LENGTH, False]),
        ('String', str),
        ('ByteArray', [Uint8])
    ]

class WriteOp(RustEnum):
    _enums = [
        ('Deletion', None),
        ('Value', [Uint8])
    ]

class AccessPath(Struct):
    _fields = [
        ('address', [Uint8, ADDRESS_LENGTH, False]),
        ('path', [Uint8])
    ]


class Program(Struct):
    _fields = [
        ('code', [Uint8]),
        ('args', [TransactionArgument]),
        ('modules', [[Uint8]])
    ]


# `WriteSet` contains all access paths that one transaction modifies. Each of them is a `WriteOp`
# where `Value(val)` means that serialized representation should be updated to `val`, and
# `Deletion` means that we are going to delete this access path.
class WriteSet(Struct):
    _fields = [
        ('write_set', [(AccessPath, WriteOp)])
    ]


class Module(Struct):
    _fields = [
        ('code', [Uint8])
    ]


class Script(Struct):
    _fields = [
        ('code', [Uint8]),
        ('args', [TransactionArgument])
    ]

class TransactionPayload(RustEnum):
    _enums = [
        ('Program', Program),
        ('WriteSet', WriteSet),
        ('Script', Script),
        ('Module', Module)
    ]

class RawTransaction(Struct):
    _fields = [
        ('sender', [Uint8, ADDRESS_LENGTH, False]),
        ('sequence_number', Uint64),
        ('payload', TransactionPayload),
        ('max_gas_amount', Uint64),
        ('gas_unit_price', Uint64),
        ('expiration_time', Uint64)
    ]

    @classmethod
    def new_write_set(cls, sender_address, sequence_number, write_set):
        return RawTransaction(
            sender_address, sequence_number,
            TransactionPayload('WriteSet', write_set),
            # Since write-set transactions bypass the VM, these fields aren't relevant.
            0, 0,
            # Write-set transactions are special and important and shouldn't expire.
            Uint64.max_value
        )

    @classmethod
    def gen_transfer_transaction(cls, sender_address, sequence_number, receiver_address,
        micro_libra, max_gas_amount=140_000, gas_unit_price=0, txn_expiration=100):
        if isinstance(sender_address, bytes):
            sender_address = bytes_to_int_list(sender_address)
        if isinstance(sender_address, str):
            sender_address = hex_to_int_list(sender_address)
        if isinstance(receiver_address, bytes):
            receiver_address = bytes_to_int_list(receiver_address)
        if isinstance(receiver_address, str):
            receiver_address = hex_to_int_list(receiver_address)
        code = cls.get_script_bytecode("peer_to_peer_transfer")
        script = Script(
            code,
            [
                TransactionArgument('Address', receiver_address),
                TransactionArgument('U64', micro_libra)
            ]
        )
        return RawTransaction(
            sender_address,
            sequence_number,
            TransactionPayload('Script', script),
            max_gas_amount,
            gas_unit_price,
            int(datetime.utcnow().timestamp()) + txn_expiration
        )


    @classmethod
    def gen_mint_transaction(cls, receiver, micro_libra):
        pass
        #TODO:

    @staticmethod
    def get_script_bytecode(script_name):
        return bytecode[script_name]

    @staticmethod
    def get_script_bytecode_deprecated(script_file):
        with open(script_file) as f:
            data = f.read()
            amap = eval(data)
            return amap['code']


class SignedTransaction(Struct):
    _fields = [
        ('raw_txn', RawTransaction),
        ('public_key', [Uint8, ED25519_PUBLIC_KEY_LENGTH]),
        ('signature', [Uint8, ED25519_SIGNATURE_LENGTH])
#        ('transaction_length', Uint64)
    ]


    def to_json_serializable(self):
        amap = super().to_json_serializable()
        if hasattr(self, 'transaction_info'):
            amap["transaction_info"] = self.transaction_info.to_json_serializable()
        if hasattr(self, 'events'):
            amap["events"] = [x.to_json_serializable() for x in self.events]
        if hasattr(self, 'version'):
            amap["version"] = self.version
        return amap

    @classmethod
    def gen_from_raw_txn(cls, raw_tx, sender_account):
        tx_hash = raw_tx.hash()
        signature = sender_account.sign(tx_hash)[:64]
        return SignedTransaction(raw_tx,
                bytes_to_int_list(sender_account.public_key),
                bytes_to_int_list(signature)
            )

    def hash(self):
        shazer = gen_hasher(b"SignedTransaction")
        shazer.update(self.serialize())
        return shazer.digest()

    @classmethod
    def from_proto(cls, proto):
        return cls.deserialize(proto.txn_bytes)

    def check_signature(self):
        message = self.raw_txn.hash()
        vkey = VerifyKey(bytes(self.public_key))
        vkey.verify(message, bytes(self.signature))

    @property
    def sender(self):
        return self.raw_txn.sender

    @property
    def sequence_number(self):
        return self.raw_txn.sequence_number

    @property
    def payload(self):
        return self.raw_txn.payload

    @property
    def max_gas_amount(self):
        return self.raw_txn.max_gas_amount

    @property
    def gas_unit_price(self):
        return self.raw_txn.gas_unit_price

    @property
    def expiration_time(self):
        return self.raw_txn.expiration_time


class Transaction(RustEnum):
    _enums = [
        ('UserTransaction', SignedTransaction),
        ('WriteSet', WriteSet),
        ('BlockMetadata', BlockMetadata)
    ]




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


# signed_txn_from_grpc = "200000003A24A61E05D129CACE9E0EFC8BC9E33831FEC9A9BE66F50FD352A2638A49B9EE200000000000000000000000040000006D6F766502000000020000000900000043414645204430304402000000090000006361666520643030640300000001000000CA02000000FED0010000000D1027000000000000204E0000000000008051010000000000"
# signed_txn_from_grpc = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKVQwYAgAAAAAAAAACAAAAxAAAAExJQlJBVk0KAQAHAUoAAAAGAAAAA1AAAAAGAAAADVYAAAAGAAAADlwAAAAGAAAABWIAAAAzAAAABJUAAAAgAAAACLUAAAAPAAAAAAAAAQACAAMAAQQAAgACBAIAAwIEAgMABjxTRUxGPgxMaWJyYUFjY291bnQJTGlicmFDb2luBG1haW4PbWludF90b19hZGRyZXNzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAQADAAMARMBAQICAAAAAQAAAGUhhsda9oqMgmPTlGVkUg6hxTisoGccqUjkM0youcJZAAAAAADKmjsAAAAA4CICAAAAAAAAAAAAAAAAAGo6ul0AAAAAIAAAAGZPbo826ssXcPqHnYbCwdD6/qFF6E+n1nGregEaVNUJQAAAAA7QGoT0bU2CI1LK0pTEaB4RZJrbsEO09HQWy5VTmL37T2cYs6euqIzLRwdbo47IoSCrIbof8B/jmsQMngJ5EgI="

# signed_txn_from_grpc_lc = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKVQwYAgAAAAAAAAACAAAAxAAAAExJQlJBVk0KAQAHAUoAAAAGAAAAA1AAAAAGAAAADVYAAAAGAAAADlwAAAAGAAAABWIAAAAzAAAABJUAAAAgAAAACLUAAAAPAAAAAAAAAQACAAMAAQQAAgACBAIAAwIEAgMABjxTRUxGPgxMaWJyYUFjY291bnQJTGlicmFDb2luBG1haW4PbWludF90b19hZGRyZXNzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAQADAAMARMBAQICAAAAAQAAAGUhhsda9oqMgmPTlGVkUg6hxTisoGccqUjkM0youcJZAAAAAADKmjsAAAAA4CICAAAAAAAAAAAAAAAAAGo6ul0AAAAAIAAAAGZPbo826ssXcPqHnYbCwdD6/qFF6E+n1nGregEaVNUJQAAAAA7QGoT0bU2CI1LK0pTEaB4RZJrbsEO09HQWy5VTmL37T2cYs6euqIzLRwdbo47IoSCrIbof8B/jmsQMngJ5EgI="
# signed_txn_from_grpc_lc = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKVQwYtQUAAAAAAAACAAAAxAAAAExJQlJBVk0KAQAHAUoAAAAGAAAAA1AAAAAGAAAADVYAAAAGAAAADlwAAAAGAAAABWIAAAAzAAAABJUAAAAgAAAACLUAAAAPAAAAAAAAAQACAAMAAQQAAgACBAIAAwIEAgMABjxTRUxGPgxMaWJyYUFjY291bnQJTGlicmFDb2luBG1haW4PbWludF90b19hZGRyZXNzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAQADAAMARMBAQICAAAAAQAAAKnGSNwCgszQzZ1jBBFdCTVjFwL7T1LO/93+RfWFlYReAAAAAAB1GQMAAAAA4CICAAAAAAAAAAAAAAAAADxSvl0AAAAAIAAAAGZPbo826ssXcPqHnYbCwdD6/qFF6E+n1nGregEaVNUJQAAAAA7uCdbXt6S5lNU8FjwWhnzdPnow5OoSTB2lcQDYlO1nmp2Dhe0qGBP9zrarJI++DKznzIejIYc4GNAOnyWxcgI="

# payloadCode = "4c49425241564d0a010007014a000000060000000350000000060000000d56000000060000000e5c0000000600000005620000003300000004950000002000000008b50000000f000000000000010002000300010400020002040200030204020300063c53454c463e0c4c696272614163636f756e74094c69627261436f696e046d61696e0f6d696e745f746f5f616464726573730000000000000000000000000000000000000000000000000000000000000000000100020004000c000c0113010102"

# signed_txn_bytes = bytes.fromhex(signed_txn_from_grpc_lc)


signed_txn_bytes = base64.b64decode(signed_txn_from_grpc)


# print (signed_txn_from_grpc)
# print (signed_txn_bytes)


tx = Transaction.deserialize(signed_txn_bytes)

tx = tx.to_json_serializable()
payload = tx['UserTransaction']['raw_txn']['payload']

from libra.bytecode import bytecodes

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

tx['UserTransaction']['type'] = type

print(tx)




###########

# print(int_list_to_hex(tx.value.raw_txn.sender))

# print({
#   'sender': int_list_to_hex(tx.value.raw_txn.sender),
#   'seq': tx.value.raw_txn.sequence_number,
#   'value': tx.value.raw_txn.sender,
#   'receiver': receiver,
#   'gas_max': tx.value.raw_txn.max_gas_amount,
#   'gas_price': tx.value.raw_txn.gas_unit_price,
#   'time': tx.value.raw_txn.expiration_time,
#   'public_key': int_list_to_hex(des.public_key),
#   'signature': int_list_to_hex(des.signature),
# })

# des = SignedTransaction.deserialize(signed_txn_bytes)
