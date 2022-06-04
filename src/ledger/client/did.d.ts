import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
export interface AccountBalanceArgs {
    'account': AccountIdentifier;
}
export declare type AccountIdentifier = Array<number>;
export interface Archive {
    'canister_id': Principal;
}
export interface Archives {
    'archives': Array<Archive>;
}
export interface Block {
    'transaction': Transaction;
    'timestamp': TimeStamp;
    'parent_hash': [] | [Array<number>];
}
export declare type BlockIndex = bigint;
export interface BlockRange {
    'blocks': Array<Block>;
}
export interface GetBlocksArgs {
    'start': BlockIndex;
    'length': bigint;
}
export declare type Memo = bigint;
export declare type Operation = {
    'Burn': {
        'from': AccountIdentifier;
        'amount': Tokens;
    };
} | {
    'Mint': {
        'to': AccountIdentifier;
        'amount': Tokens;
    };
} | {
    'Transfer': {
        'to': AccountIdentifier;
        'fee': Tokens;
        'from': AccountIdentifier;
        'amount': Tokens;
    };
};
export declare type QueryArchiveError = {
    'BadFirstBlockIndex': {
        'requested_index': BlockIndex;
        'first_valid_index': BlockIndex;
    };
} | {
    'Other': {
        'error_message': string;
        'error_code': bigint;
    };
};
export declare type QueryArchiveFn = ActorMethod<[GetBlocksArgs], QueryArchiveResult>;
export declare type QueryArchiveResult = {
    'Ok': BlockRange;
} | {
    'Err': QueryArchiveError;
};
export interface QueryBlocksResponse {
    'certificate': [] | [Array<number>];
    'blocks': Array<Block>;
    'chain_length': bigint;
    'first_block_index': BlockIndex;
    'archived_blocks': Array<{
        'callback': QueryArchiveFn;
        'start': BlockIndex;
        'length': bigint;
    }>;
}
export declare type SubAccount = Array<number>;
export interface TimeStamp {
    'timestamp_nanos': bigint;
}
export interface Tokens {
    'e8s': bigint;
}
export interface Transaction {
    'memo': Memo;
    'operation': [] | [Operation];
    'created_at_time': TimeStamp;
}
export interface TransferArgs {
    'to': AccountIdentifier;
    'fee': Tokens;
    'memo': Memo;
    'from_subaccount': [] | [SubAccount];
    'created_at_time': [] | [TimeStamp];
    'amount': Tokens;
}
export declare type TransferError = {
    'TxTooOld': {
        'allowed_window_nanos': bigint;
    };
} | {
    'BadFee': {
        'expected_fee': Tokens;
    };
} | {
    'TxDuplicate': {
        'duplicate_of': BlockIndex;
    };
} | {
    'TxCreatedInFuture': null;
} | {
    'InsufficientFunds': {
        'balance': Tokens;
    };
};
export interface TransferFee {
    'transfer_fee': Tokens;
}
export declare type TransferFeeArg = {};
export declare type TransferResult = {
    'Ok': BlockIndex;
} | {
    'Err': TransferError;
};
export interface _SERVICE {
    'account_balance': ActorMethod<[AccountBalanceArgs], Tokens>;
    'archives': ActorMethod<[], Archives>;
    'decimals': ActorMethod<[], {
        'decimals': number;
    }>;
    'name': ActorMethod<[], {
        'name': string;
    }>;
    'query_blocks': ActorMethod<[GetBlocksArgs], QueryBlocksResponse>;
    'symbol': ActorMethod<[], {
        'symbol': string;
    }>;
    'transfer': ActorMethod<[TransferArgs], TransferResult>;
    'transfer_fee': ActorMethod<[TransferFeeArg], TransferFee>;
}
