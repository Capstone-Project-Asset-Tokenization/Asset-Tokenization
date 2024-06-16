export const UserContractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "banUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "depromoteAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "promoteToAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "unbanUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "promotedBy",
                "type": "address"
            }
        ],
        "name": "UserPromoted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isAdmin",
                "type": "bool"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "promotedBy",
                "type": "address"
            }
        ],
        "name": "UserRegistered",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getAdminsWithPromoterDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "isAdmin",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isBanned",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "promotedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct UserManagement.User[]",
                "name": "",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "isAdmin",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isBanned",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "promotedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct UserManagement.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllUserAddresses",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBannedUsers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "isAdmin",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isBanned",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "promotedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct UserManagement.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRegisteredUsers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "isAdmin",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isBanned",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "promotedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct UserManagement.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isAdmin",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isBanned",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "promotedBy",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "usersAddressList",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];