// package: debug
// file: node_debug_interface.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class GetNodeDetailsRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetNodeDetailsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetNodeDetailsRequest): GetNodeDetailsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetNodeDetailsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetNodeDetailsRequest;
    static deserializeBinaryFromReader(message: GetNodeDetailsRequest, reader: jspb.BinaryReader): GetNodeDetailsRequest;
}

export namespace GetNodeDetailsRequest {
    export type AsObject = {
    }
}

export class GetNodeDetailsResponse extends jspb.Message { 

    getStatsMap(): jspb.Map<string, string>;
    clearStatsMap(): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetNodeDetailsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetNodeDetailsResponse): GetNodeDetailsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetNodeDetailsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetNodeDetailsResponse;
    static deserializeBinaryFromReader(message: GetNodeDetailsResponse, reader: jspb.BinaryReader): GetNodeDetailsResponse;
}

export namespace GetNodeDetailsResponse {
    export type AsObject = {

        statsMap: Array<[string, string]>,
    }
}

export class GetEventsRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventsRequest): GetEventsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventsRequest;
    static deserializeBinaryFromReader(message: GetEventsRequest, reader: jspb.BinaryReader): GetEventsRequest;
}

export namespace GetEventsRequest {
    export type AsObject = {
    }
}

export class GetEventsResponse extends jspb.Message { 
    clearEventsList(): void;
    getEventsList(): Array<Event>;
    setEventsList(value: Array<Event>): void;
    addEvents(value?: Event, index?: number): Event;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventsResponse): GetEventsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventsResponse;
    static deserializeBinaryFromReader(message: GetEventsResponse, reader: jspb.BinaryReader): GetEventsResponse;
}

export namespace GetEventsResponse {
    export type AsObject = {
        eventsList: Array<Event.AsObject>,
    }
}

export class Event extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getTimestamp(): number;
    setTimestamp(value: number): void;

    getJson(): string;
    setJson(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Event.AsObject;
    static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Event;
    static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
    export type AsObject = {
        name: string,
        timestamp: number,
        json: string,
    }
}

export class DumpJemallocHeapProfileRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DumpJemallocHeapProfileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DumpJemallocHeapProfileRequest): DumpJemallocHeapProfileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DumpJemallocHeapProfileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DumpJemallocHeapProfileRequest;
    static deserializeBinaryFromReader(message: DumpJemallocHeapProfileRequest, reader: jspb.BinaryReader): DumpJemallocHeapProfileRequest;
}

export namespace DumpJemallocHeapProfileRequest {
    export type AsObject = {
    }
}

export class DumpJemallocHeapProfileResponse extends jspb.Message { 
    getStatusCode(): number;
    setStatusCode(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DumpJemallocHeapProfileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DumpJemallocHeapProfileResponse): DumpJemallocHeapProfileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DumpJemallocHeapProfileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DumpJemallocHeapProfileResponse;
    static deserializeBinaryFromReader(message: DumpJemallocHeapProfileResponse, reader: jspb.BinaryReader): DumpJemallocHeapProfileResponse;
}

export namespace DumpJemallocHeapProfileResponse {
    export type AsObject = {
        statusCode: number,
    }
}
