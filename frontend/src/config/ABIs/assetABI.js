export let AssetContractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_userManagementAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_transactionRecordsAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenPrice",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "AssetCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum AssetTokenizationPlatform.AssetCategory",
        name: "category",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "images",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "supportingDocuments",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "updater",
        type: "address",
      },
    ],
    name: "AssetUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "verifier",
        type: "address",
      },
    ],
    name: "AssetVerificationDeclined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum AssetTokenizationPlatform.VerificationStatus",
        name: "status",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "verifier",
        type: "address",
      },
    ],
    name: "AssetVerified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentRecived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "locked",
        type: "bool",
      },
    ],
    name: "TokensLocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenHolder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "unlocked",
        type: "bool",
      },
    ],
    name: "TokensUnlocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferTo",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assetCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "assetVerifiers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "assets",
    outputs: [
      {
        internalType: "uint256",
        name: "ID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenPrice",
        type: "uint256",
      },
      {
        internalType: "enum AssetTokenizationPlatform.VerificationStatus",
        name: "verificationStatus",
        type: "uint8",
      },
      {
        internalType: "enum AssetTokenizationPlatform.AssetCategory",
        name: "category",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
    ],
    name: "availableTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "availableTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenPrice",
        type: "uint256",
      },
      {
        internalType: "enum AssetTokenizationPlatform.AssetCategory",
        name: "category",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "images",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "supportingDocuments",
        type: "string[]",
      },
    ],
    name: "createAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
    ],
    name: "declineAssetVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
    ],
    name: "getAsset",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ID",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "decimals",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenPrice",
            type: "uint256",
          },
          {
            internalType: "enum AssetTokenizationPlatform.VerificationStatus",
            name: "verificationStatus",
            type: "uint8",
          },
          {
            internalType: "enum AssetTokenizationPlatform.AssetCategory",
            name: "category",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "images",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "supportingDocuments",
            type: "string[]",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
        ],
        internalType: "struct AssetTokenizationPlatform.Asset",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum AssetTokenizationPlatform.VerificationStatus",
        name: "filter",
        type: "uint8",
      },
    ],
    name: "getAssetsByFilter",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ID",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "decimals",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenPrice",
            type: "uint256",
          },
          {
            internalType: "enum AssetTokenizationPlatform.VerificationStatus",
            name: "verificationStatus",
            type: "uint8",
          },
          {
            internalType: "enum AssetTokenizationPlatform.AssetCategory",
            name: "category",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "images",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "supportingDocuments",
            type: "string[]",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "availableToken",
            type: "uint256",
          },
        ],
        internalType: "struct AssetTokenizationPlatform.AssetDetailResponse[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "enum AssetTokenizationPlatform.VerificationStatus",
        name: "filter",
        type: "uint8",
      },
    ],
    name: "getUserAssetsByFilter",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "ID",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "decimals",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenPrice",
            type: "uint256",
          },
          {
            internalType: "enum AssetTokenizationPlatform.VerificationStatus",
            name: "verificationStatus",
            type: "uint8",
          },
          {
            internalType: "enum AssetTokenizationPlatform.AssetCategory",
            name: "category",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "images",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "supportingDocuments",
            type: "string[]",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "availableToken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ownedTokens",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "assetLocked",
            type: "bool",
          },
        ],
        internalType:
          "struct AssetTokenizationPlatform.UserAssetDetailResponse[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
    ],
    name: "lockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "locked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
    ],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "transactionRecords",
    outputs: [
      {
        internalType: "contract TransactionRecords",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
    ],
    name: "unlockTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetID",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenPrice",
            type: "uint256",
          },
          {
            internalType: "enum AssetTokenizationPlatform.AssetCategory",
            name: "category",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "images",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "supportingDocuments",
            type: "string[]",
          },
        ],
        internalType: "struct AssetTokenizationPlatform.AssetUpdateData",
        name: "data",
        type: "tuple",
      },
    ],
    name: "updateAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "userManagement",
    outputs: [
      {
        internalType: "contract UserManagement",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assetId",
        type: "uint256",
      },
      {
        internalType: "enum AssetTokenizationPlatform.VerificationStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "verifyAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
