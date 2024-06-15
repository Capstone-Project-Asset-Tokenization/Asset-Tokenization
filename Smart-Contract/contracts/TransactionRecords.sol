// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionRecords {
    struct TransactionRecord {
        uint256 assetId;
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    TransactionRecord[] public transactions;

    event TransactionLogged(uint256 indexed assetId, address indexed from, address indexed to, uint256 amount, uint256 timestamp);

    function logTransaction(uint256 _assetId, address _from, address _to, uint256 _amount) external {
        transactions.push(TransactionRecord({
            assetId: _assetId,
            from: _from,
            to: _to,
            amount: _amount,
            timestamp: block.timestamp
        }));
        emit TransactionLogged(_assetId, _from, _to, _amount, block.timestamp);
    }

    function getTransactionsFiltered(address sender, address recipient, uint256 startTimestamp, uint256 endTimestamp) public view returns (TransactionRecord[] memory) {
        bool filterSender = sender != address(0);
        bool filterRecipient = recipient != address(0);
        bool filterTimestamp = (startTimestamp != 0 || endTimestamp != 0);

        uint256 count = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            bool senderMatch = (filterSender && transactions[i].from == sender) || !filterSender;
            bool recipientMatch = (filterRecipient && transactions[i].to == recipient) || !filterRecipient;
            bool timestampMatch = (filterTimestamp && transactions[i].timestamp >= startTimestamp && transactions[i].timestamp <= endTimestamp) || !filterTimestamp;

            if (senderMatch && recipientMatch && timestampMatch) {
                count++;
            }
        }

        TransactionRecord[] memory results = new TransactionRecord[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            bool senderMatch = (filterSender && transactions[i].from == sender) || !filterSender;
            bool recipientMatch = (filterRecipient && transactions[i].to == recipient) || !filterRecipient;
            bool timestampMatch = (filterTimestamp && transactions[i].timestamp >= startTimestamp && transactions[i].timestamp <= endTimestamp) || !filterTimestamp;

            if (senderMatch && recipientMatch && timestampMatch) {
                results[j] = transactions[i];
                j++;
            }
        }
        return results;
    }

    function getRecentTransactions(uint256 count) public view returns (TransactionRecord[] memory) {
        uint256 resultCount = count < transactions.length ? count : transactions.length;
        TransactionRecord[] memory results = new TransactionRecord[](resultCount);
        for (uint256 i = 0; i < resultCount; i++) {
            results[i] = transactions[transactions.length - 1 - i]; // Assuming newer transactions are pushed to the end
        }
        return results;
    }

    function getTotalTransactionVolume() public view returns (uint256) {
        uint256 totalVolume = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            totalVolume += transactions[i].amount;
        }
        return totalVolume;
    }

}