// package: types
// file: validator_change.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as events_pb from "./events_pb";
import * as ledger_info_pb from "./ledger_info_pb";

export class ValidatorChangeEventWithProof extends jspb.Message { 
    clearLedgerInfoWithSigsList(): void;
    getLedgerInfoWithSigsList(): Array<ledger_info_pb.LedgerInfoWithSignatures>;
    setLedgerInfoWithSigsList(value: Array<ledger_info_pb.LedgerInfoWithSignatures>): void;
    addLedgerInfoWithSigs(value?: ledger_info_pb.LedgerInfoWithSignatures, index?: number): ledger_info_pb.LedgerInfoWithSignatures;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorChangeEventWithProof.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorChangeEventWithProof): ValidatorChangeEventWithProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorChangeEventWithProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorChangeEventWithProof;
    static deserializeBinaryFromReader(message: ValidatorChangeEventWithProof, reader: jspb.BinaryReader): ValidatorChangeEventWithProof;
}

export namespace ValidatorChangeEventWithProof {
    export type AsObject = {
        ledgerInfoWithSigsList: Array<ledger_info_pb.LedgerInfoWithSignatures.AsObject>,
    }
}
