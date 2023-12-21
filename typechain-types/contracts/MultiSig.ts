/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface MultiSigInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addTransaction"
      | "confirmTransaction"
      | "confirmations"
      | "executeTransaction"
      | "getConfirmationsCount"
      | "initialize"
      | "isConfirmed"
      | "owner"
      | "owners"
      | "renounceOwnership"
      | "required"
      | "submitTransaction"
      | "transactionCount"
      | "transactions"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Initialized" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addTransaction",
    values: [AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmTransaction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmations",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "executeTransaction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getConfirmationsCount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike[], BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isConfirmed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "owners",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "required", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "submitTransaction",
    values: [AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transactionCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transactions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getConfirmationsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isConfirmed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "required", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface MultiSig extends BaseContract {
  connect(runner?: ContractRunner | null): MultiSig;
  waitForDeployment(): Promise<this>;

  interface: MultiSigInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addTransaction: TypedContractMethod<
    [destination: AddressLike, value: BigNumberish, data: BytesLike],
    [bigint],
    "nonpayable"
  >;

  confirmTransaction: TypedContractMethod<
    [transactionId: BigNumberish],
    [void],
    "nonpayable"
  >;

  confirmations: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;

  executeTransaction: TypedContractMethod<
    [transactionId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getConfirmationsCount: TypedContractMethod<
    [transactionId: BigNumberish],
    [bigint],
    "view"
  >;

  initialize: TypedContractMethod<
    [_owners: AddressLike[], _confirmations: BigNumberish],
    [void],
    "nonpayable"
  >;

  isConfirmed: TypedContractMethod<
    [transactionId: BigNumberish],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  owners: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  required: TypedContractMethod<[], [bigint], "view">;

  submitTransaction: TypedContractMethod<
    [dest: AddressLike, value: BigNumberish, data: BytesLike],
    [void],
    "nonpayable"
  >;

  transactionCount: TypedContractMethod<[], [bigint], "view">;

  transactions: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean, string] & {
        destination: string;
        value: bigint;
        executed: boolean;
        data: string;
      }
    ],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addTransaction"
  ): TypedContractMethod<
    [destination: AddressLike, value: BigNumberish, data: BytesLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "confirmTransaction"
  ): TypedContractMethod<[transactionId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "confirmations"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "executeTransaction"
  ): TypedContractMethod<[transactionId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getConfirmationsCount"
  ): TypedContractMethod<[transactionId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [_owners: AddressLike[], _confirmations: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isConfirmed"
  ): TypedContractMethod<[transactionId: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owners"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "required"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "submitTransaction"
  ): TypedContractMethod<
    [dest: AddressLike, value: BigNumberish, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transactionCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transactions"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean, string] & {
        destination: string;
        value: bigint;
        executed: boolean;
        data: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
