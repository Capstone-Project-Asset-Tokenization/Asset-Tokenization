// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";

import "./TransactionRecords.sol";

contract AssetTokenizationPlatform {
    enum VerificationStatus {
        Pending,
        Verified,
        Declined
    }
    enum AssetCategory {
        RealEstate,
        Artwork,
        IntellectualProperty,
        Other
    }

    struct AssetDetailResponse {
        uint256 ID;
        string name;
        string symbol;
        uint256 decimals;
        uint256 totalSupply;
        uint256 tokenPrice;
        VerificationStatus verificationStatus;
        AssetCategory category;
        string description;
        string[] images;
        string[] supportingDocuments;
        address creator;
        uint256 availableToken;
    }

    struct UserAssetDetailResponse {
        uint256 ID;
        string name;
        string symbol;
        uint256 decimals;
        uint256 totalSupply;
        uint256 tokenPrice;
        VerificationStatus verificationStatus;
        AssetCategory category;
        string description;
        string[] images;
        string[] supportingDocuments;
        address creator;
        uint256 availableToken;
        uint256 ownedTokens;
        bool assetLocked;
    }

    struct Asset {
        uint256 ID;
        string name;
        string symbol;
        uint256 decimals;
        uint256 totalSupply;
        uint256 tokenPrice;
        VerificationStatus verificationStatus;
        AssetCategory category;
        string description;
        string[] images;
        string[] supportingDocuments;
        address creator;
    }

    struct AssetUpdateData {
        string name;
        uint256 totalSupply;
        uint256 tokenPrice;
        AssetCategory category;
        string description;
        string[] images;
        string[] supportingDocuments;
    }

    mapping(uint256 => mapping(address => uint256)) public balances;
    mapping(uint256 => mapping(address => mapping(address => uint256)))
        public allowances;
    mapping(uint256 => mapping(address => bool)) public locked;

    mapping(uint256 => Asset) public assets;
    mapping(uint256 => uint256) public availableTokens;
    uint256 public assetCount;
    mapping(uint256 => address) public assetVerifiers;

    UserManagement public userManagement;
    TransactionRecords public transactionRecords;

    event AssetCreated(
        uint256 indexed assetId,
        string name,
        string symbol,
        uint256 totalSupply,
        uint256 tokenPrice,
        address indexed creator
    );
    event PaymentRecived(
        uint256 indexed assetId,
        address sender,
        uint256 amount
    );
    event Transfer(
        uint256 indexed assetId,
        address indexed from,
        address indexed to,
        uint256 value
    );
    event TransferTo(
        uint256 indexed assetId,
        address indexed to,
        uint256 value
    );
    event Approval(
        uint256 indexed assetId,
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event AssetVerified(
        uint256 indexed assetId,
        VerificationStatus status,
        address indexed verifier
    );
    event TokensLocked(
        uint256 indexed assetId,
        address indexed tokenHolder,
        bool locked
    );
    event TokensUnlocked(
        uint256 indexed assetId,
        address indexed tokenHolder,
        bool unlocked
    );
    event AssetVerificationDeclined(
        uint256 indexed assetId,
        address indexed verifier
    );
    event AssetUpdated(
        uint256 indexed assetID,
        string name,
        string symbol,
        uint256 decimals,
        uint256 totalSupply,
        uint256 tokenPrice,
        AssetCategory category,
        string description,
        string[] images,
        string[] supportingDocuments,
        address updater
    );

    modifier onlyAssetCreator(uint256 assetID) {
        require(
            msg.sender == assets[assetID].creator,
            "Only asset creator can update the asset"
        );
        _;
    }

    modifier assetExists(uint256 assetId) {
        require(assetId < assetCount, "Asset does not exist");
        _;
    }

    modifier onlyAdmin() {
        (bool isAdmin, bool isRegistered, bool isBanned, ) = userManagement
            .getUser(msg.sender);
        require(isAdmin, "Only admin allowed");
        require(!isBanned, "User banned");

        _;
    }

    modifier onlyRegisteredUser() {
        (bool isAdmin, bool isRegistered, bool isBanned, ) = userManagement
            .getUser(msg.sender);
        require(isRegistered, "User not registered");
        require(!isBanned, "User banned");

        _;
    }

    constructor(
        address _userManagementAddress,
        address _transactionRecordsAddress
    ) {
        userManagement = UserManagement(_userManagementAddress);
        transactionRecords = TransactionRecords(_transactionRecordsAddress);
    }

    function createAsset(
        string memory name,
        uint256 initialSupply,
        uint256 tokenPrice,
        AssetCategory category,
        string memory description,
        string[] memory images,
        string[] memory supportingDocuments
    ) external onlyRegisteredUser {
        uint8 decimals = 0;
        string memory symbol = "ETH";

        assets[assetCount] = Asset({
            ID: assetCount,
            name: name,
            symbol: symbol,
            decimals: decimals,
            totalSupply: initialSupply,
            tokenPrice: tokenPrice,
            verificationStatus: VerificationStatus.Pending,
            category: category,
            description: description,
            images: images,
            supportingDocuments: supportingDocuments,
            creator: msg.sender
        });
        balances[assetCount][msg.sender] = initialSupply;
        allowances[assetCount][msg.sender][msg.sender] = initialSupply;
        availableTokens[assetCount] = initialSupply;
        locked[assetCount][msg.sender] = false;
        emit AssetCreated(
            assetCount,
            name,
            symbol,
            initialSupply,
            tokenPrice,
            msg.sender
        );
        assetCount++;
    }

    function updateAsset(uint256 assetID, AssetUpdateData memory data)
        external
        onlyRegisteredUser
        onlyAssetCreator(assetID)
    {
        Asset storage asset = assets[assetID];

        asset.name = data.name;
        asset.totalSupply = data.totalSupply;
        asset.tokenPrice = data.tokenPrice;
        asset.category = data.category;
        asset.description = data.description;
        asset.images = data.images;
        asset.supportingDocuments = data.supportingDocuments;
        // update verification status to pending after updating asset
        asset.verificationStatus = VerificationStatus.Pending;
        

        emit AssetUpdated(
            assetID,
            data.name,
            asset.symbol,
            asset.decimals,
            data.totalSupply,
            data.tokenPrice,
            data.category,
            data.description,
            data.images,
            data.supportingDocuments,
            msg.sender
        );
    }

    function totalSupply(uint256 assetId)
        external
        view
        assetExists(assetId)
        returns (uint256)
    {
        return assets[assetId].totalSupply;
    }

    function balanceOf(uint256 assetId, address account)
        external
        view
        assetExists(assetId)
        returns (uint256)
    {
        return balances[assetId][account];
    }

    function transfer(
        uint256 assetId,
        address recipient,
        uint256 amount
    ) external payable assetExists(assetId) onlyRegisteredUser returns (bool) {
        require(
            msg.value == amount * assets[assetId].tokenPrice,
            "Incorrect payment amount"
        );
        require(
            availableTokens[assetId] >= amount,
            "Insufficient available tokens"
        );

        emit PaymentRecived(assetId,msg.sender,msg.value);
        // up until the required amount of tokens are transferred, keep transferring tokens from unlocked accounts
        address[] memory usersAddressList = userManagement
            .getAllUserAddresses();
        uint256 remainingAmount = amount;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (!locked[assetId][usersAddressList[i]]) {
                uint256 transferAmount = balances[assetId][usersAddressList[i]];
                if (transferAmount > remainingAmount) {
                    transferAmount = remainingAmount;
                }
                _transfer(
                    assetId,
                    usersAddressList[i],
                    recipient,
                    transferAmount
                );
                remainingAmount -= transferAmount;
                transactionRecords.logTransaction(
                    assetId,
                    usersAddressList[i],
                    recipient,
                    transferAmount
                );
                if (remainingAmount == 0) {
                    break;
                }
            }
        }

        emit TransferTo(assetId, recipient, amount);
        return true;
    }

    function transferFrom(
        uint256 assetId,
        address sender,
        address recipient,
        uint256 amount
    ) external payable assetExists(assetId) onlyRegisteredUser returns (bool) {
        require(
            msg.value == amount * assets[assetId].tokenPrice,
            "Incorrect payment amount"
        );
        _transferFrom(assetId, sender, recipient, amount);
        if (sender == assets[assetId].creator) {
            availableTokens[assetId] -= amount;
        }
        // make payment to sender
        (bool success, ) = sender.call{
            value: amount * assets[assetId].tokenPrice
        }("");
        require(success, "Payment failed");
        emit Transfer(assetId, sender, recipient, amount);
        return true;
    }

    function allowance(
        uint256 assetId,
        address owner,
        address spender
    ) external view assetExists(assetId) returns (uint256) {
        return allowances[assetId][owner][spender];
    }

    function verifyAsset(uint256 assetId, VerificationStatus status)
        external
        onlyAdmin
        assetExists(assetId)
    {
        assets[assetId].verificationStatus = status;
        assetVerifiers[assetId] = msg.sender;
        emit AssetVerified(assetId, status, msg.sender);
    }

    function declineAssetVerification(uint256 assetId)
        external
        onlyAdmin
        assetExists(assetId)
    {
        assets[assetId].verificationStatus = VerificationStatus.Declined;
        assetVerifiers[assetId] = msg.sender;
        emit AssetVerificationDeclined(assetId, msg.sender);
    }

    function lockTokens(uint256 assetId)
        external
        assetExists(assetId)
        onlyRegisteredUser
    {
        require(!locked[assetId][msg.sender], "Tokens already locked");

        _lockTokens(assetId, msg.sender);
        availableTokens[assetId] -= balances[assetId][msg.sender];
        emit TokensLocked(assetId, msg.sender, true);
    }

    function _lockTokens(uint256 assetId, address tokenHolder) internal {
        locked[assetId][tokenHolder] = true;
        emit TokensLocked(assetId, tokenHolder, true);
    }

    function unlockTokens(uint256 assetId)
        external
        assetExists(assetId)
        onlyRegisteredUser
    {
        require(locked[assetId][msg.sender], "Tokens already unlocked");
        _unlockTokens(assetId, msg.sender);
        availableTokens[assetId] += balances[assetId][msg.sender];
        emit TokensUnlocked(assetId, msg.sender, false);
    }

    function _unlockTokens(uint256 assetId, address tokenHolder) internal {
        locked[assetId][tokenHolder] = false;
        emit TokensUnlocked(assetId, tokenHolder, false);
    }

    function availableTokenBalance(uint256 assetId)
        external
        view
        assetExists(assetId)
        returns (uint256)
    {
        return availableTokens[assetId];
    }

    function _transfer(
        uint256 assetId,
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        require(sender != address(0), "Transfer from the zero address");
        require(recipient != address(0), "Transfer to the zero address");
        require(balances[assetId][sender] >= amount, "Insufficient balance");
        require(!locked[assetId][sender], "Tokens locked");

        balances[assetId][sender] -= amount;
        balances[assetId][recipient] += amount;

        if (recipient != assets[assetId].creator) {
            _lockTokens(assetId, recipient);
        }

        // Convert the recipient address to a payable address
        address payable payableSender = payable(sender);

        // Transfer Ether to the specified recipient
        (bool sent, ) = payableSender.call{
            value: amount * assets[assetId].tokenPrice
        }("");
        require(sent, "Failed to send Ether");
    }

    function _transferFrom(
        uint256 assetId,
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        _transfer(assetId, sender, recipient, amount);
    }

    // function that return all details of an asset
    function getAsset(uint256 assetId)
        external
        view
        assetExists(assetId)
        returns (Asset memory)
    {
        return assets[assetId];
    }

    // function to get list of assets based on filter such as are verified,unverified,all
    function getAssetsByFilter(VerificationStatus filter)
        external
        view
        returns (AssetDetailResponse[] memory)
    {
        // get assets count based on filter
        uint256 filteredAssetCount = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].verificationStatus == filter) {
                filteredAssetCount++;
            }
        }
        // create array of assets based on filter
        AssetDetailResponse[] memory filteredAssets = new AssetDetailResponse[](
            filteredAssetCount
        );
        uint256 count = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].verificationStatus == filter) {
                // filteredAssets[count] = assets[i];
                filteredAssets[count] = AssetDetailResponse({
                    ID: assets[i].ID,
                    name: assets[i].name,
                    symbol: assets[i].symbol,
                    decimals: assets[i].decimals,
                    totalSupply: assets[i].totalSupply,
                    tokenPrice: assets[i].tokenPrice,
                    verificationStatus: assets[i].verificationStatus,
                    category: assets[i].category,
                    description: assets[i].description,
                    images: assets[i].images,
                    supportingDocuments: assets[i].supportingDocuments,
                    creator: assets[i].creator,
                    availableToken: availableTokens[i]
                });
                count++;
            }
        }
        return filteredAssets;
    }

    // function to get list of user assets based on filter such as are verified,unverified,all
    function getUserAssetsByFilter(address user, VerificationStatus filter)
        external
        view
        returns (UserAssetDetailResponse[] memory)
    {
        // get user assets count based on filter
        uint256 filteredAssetCount = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (
                assets[i].creator == user &&
                assets[i].verificationStatus == filter
            ) {
                filteredAssetCount++;
            }
        }
        // create array of user assets based on filter
        UserAssetDetailResponse[]
            memory filteredAssets = new UserAssetDetailResponse[](
                filteredAssetCount
            );
        uint256 count = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (
                (assets[i].creator == user ||
                    balances[assets[i].ID][user] > 0) &&
                assets[i].verificationStatus == filter
            ) {
                // filteredAssets[count] = assets[i];
                filteredAssets[count] = UserAssetDetailResponse({
                    ID: assets[i].ID,
                    name: assets[i].name,
                    symbol: assets[i].symbol,
                    decimals: assets[i].decimals,
                    totalSupply: assets[i].totalSupply,
                    tokenPrice: assets[i].tokenPrice,
                    verificationStatus: assets[i].verificationStatus,
                    category: assets[i].category,
                    description: assets[i].description,
                    images: assets[i].images,
                    supportingDocuments: assets[i].supportingDocuments,
                    creator: assets[i].creator,
                    availableToken: availableTokens[i],
                    ownedTokens: balances[assets[i].ID][user],
                    assetLocked:locked[assets[i].ID][user]
                });
                count++;
            }
        }
        return filteredAssets;
    }
}
