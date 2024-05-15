// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";



contract AssetTokenizationPlatform  {
    enum VerificationStatus { Pending, Verified, Declined }
    enum AssetCategory { RealEstate, Artwork, IntellectualProperty, Other }

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



    mapping(uint256=>mapping(address=>uint256)) public balances;
    mapping(uint256=>mapping(address=>mapping(address=>uint256))) public allowances;
    mapping(uint256=>mapping(address=>bool)) public locked;


    mapping(uint256 => Asset) public assets;
    mapping(uint256 => uint256) public availableTokens;
    uint256 public assetCount;
    mapping(uint256 => address) public assetVerifiers;
    UserManagement public userManagement;


    event AssetCreated(uint256 indexed assetId, string name, string symbol, uint256 decimals, uint256 totalSupply, uint256 tokenPrice, address indexed creator);
    event Transfer(uint256 indexed assetId, address indexed from, address indexed to, uint256 value);
    event TransferTo(uint256 indexed assetId, address indexed to, uint256 value);
    event Approval(uint256 indexed assetId, address indexed owner, address indexed spender, uint256 value);
    event AssetVerified(uint256 indexed assetId, VerificationStatus status, address indexed verifier);
    event TokensLocked(uint256 indexed assetId, address indexed tokenHolder, bool locked);
    event TokensUnlocked(uint256 indexed assetId, address indexed tokenHolder, bool unlocked);
    event AssetVerificationDeclined(uint256 indexed assetId, address indexed verifier);
    event AssetUpdated(
        uint256 assetID,
        string name,
        string symbol,
        uint8 decimals,
        uint256 totalSupply,
        uint256 tokenPrice,
        AssetCategory category,
        string description,
        string[] images,
        string[] supportingDocuments,
        address updater
    );

    modifier onlyAssetCreator(uint256 assetID) {
        require(msg.sender == assets[assetID].creator, "Only asset creator can update the asset");
        _;
    }


    modifier assetExists(uint256 assetId) {
        require(assetId < assetCount, "Asset does not exist");
        _;
    }

    modifier onlyAdmin() {
        (bool isAdmin,bool isRegistered ,bool isBanned ,) = userManagement.getUser(msg.sender);
        require(isAdmin, "Only admin allowed");
        require(!isBanned, "User banned");

        _;
    }

    modifier onlyRegisteredUser() {
        (bool isAdmin,bool isRegistered ,bool isBanned ,) = userManagement.getUser(msg.sender);
        require(isRegistered, "User not registered");
        require(!isBanned, "User banned");


        _;
    }

       constructor(address _userManagementAddress) {
        userManagement = UserManagement(_userManagementAddress);
    }



    function createAsset(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply,
        uint256 tokenPrice,
        AssetCategory category,
        string memory description,
        string[] memory images,
        string[] memory supportingDocuments
    ) external onlyRegisteredUser {
        assets[assetCount] = Asset({
            ID:assetCount,
            name: name,
            symbol: symbol,
            decimals: decimals,
            totalSupply: initialSupply * 10 ** uint256(decimals),
            tokenPrice: tokenPrice,
            verificationStatus: VerificationStatus.Pending,
            category: category,
            description: description,
            images: images,
            supportingDocuments: supportingDocuments,
            creator:msg.sender
        });
        balances[assetCount][msg.sender]=initialSupply * 10 ** uint256(decimals);
        allowances[assetCount][msg.sender][msg.sender]=initialSupply * 10 ** uint256(decimals);
        availableTokens[assetCount] = initialSupply * 10 ** uint256(decimals);
        locked[assetCount][msg.sender]=false;
        emit AssetCreated(assetCount, name, symbol, decimals, initialSupply, tokenPrice, msg.sender);
        assetCount++;
    }

        function updateAsset(
        uint256 assetID,
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 totalSupply,
        uint256 tokenPrice,
        AssetCategory category,
        string memory description,
        string[] memory images,
        string[] memory supportingDocuments
    ) external onlyRegisteredUser onlyAssetCreator(assetID) {
        Asset storage asset = assets[assetID];

        asset.name = name;
        asset.symbol = symbol;
        asset.decimals = decimals;
        asset.totalSupply = totalSupply * 10 ** uint256(decimals);
        asset.tokenPrice = tokenPrice;
        asset.category = category;
        asset.description = description;
        asset.images = images;
        asset.supportingDocuments = supportingDocuments;

        emit AssetUpdated(assetID, name, symbol, decimals, totalSupply, tokenPrice, category, description, images, supportingDocuments, msg.sender);
    }
}


    function totalSupply(uint256 assetId) external view assetExists(assetId) returns (uint256) {
        return assets[assetId].totalSupply;
    }

    function balanceOf(uint256 assetId, address account) external view assetExists(assetId) returns (uint256) {
        return balances[assetId][account] ;
    }

    function transfer(uint256 assetId, address recipient, uint256 amount) external payable assetExists(assetId) onlyRegisteredUser returns (bool) {
        require(msg.value == amount * assets[assetId].tokenPrice, "Incorrect payment amount");
        require(availableTokens[assetId] >= amount, "Insufficient available tokens");

        // up until the required amount of tokens are transferred, keep transferring tokens from unlocked accounts
        (address[] memory usersAddressList) = userManagement.getAllUserAddresses();
        uint256 remainingAmount = amount;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (!locked[assetId][usersAddressList[i]]) {
                uint256 transferAmount = balances[assetId][usersAddressList[i]];
                if (transferAmount > remainingAmount) {
                    transferAmount = remainingAmount;
                }
                _transfer(assetId, usersAddressList[i], recipient, transferAmount);
                remainingAmount -= transferAmount;
                if (remainingAmount == 0) {
                    break;
                }
            }
        }

        emit TransferTo(assetId, recipient, amount);
        return true;
    }

    function transferFrom(uint256 assetId, address sender, address recipient, uint256 amount) external payable assetExists(assetId) onlyRegisteredUser returns (bool) {
        require(msg.value == amount * assets[assetId].tokenPrice, "Incorrect payment amount");
        _transferFrom(assetId, sender, recipient, amount);
        if (sender == assets[assetId].creator) {
            availableTokens[assetId] -= amount;
        }
        // make payment to sender
        (bool success, ) = sender.call{value: amount * assets[assetId].tokenPrice}("");
        require(success, "Payment failed");
        emit Transfer(assetId, sender, recipient, amount);
        return true;
    }

    function allowance(uint256 assetId, address owner, address spender) external view assetExists(assetId) returns (uint256) {
        return allowances[assetId][owner][spender];
    }

    function verifyAsset(uint256 assetId, VerificationStatus status) external onlyAdmin assetExists(assetId) {
        assets[assetId].verificationStatus = status;
        assetVerifiers[assetId] = msg.sender;
        emit AssetVerified(assetId, status, msg.sender);
    }

    function declineAssetVerification(uint256 assetId) external onlyAdmin assetExists(assetId) {
        assets[assetId].verificationStatus = VerificationStatus.Declined;
        assetVerifiers[assetId] = msg.sender;
        emit AssetVerificationDeclined(assetId, msg.sender);
    }

    function lockTokens(uint256 assetId) external assetExists(assetId) onlyRegisteredUser {
        require(!locked[assetId][msg.sender], "Tokens already locked");

        _lockTokens(assetId, msg.sender);
        availableTokens[assetId] -= balances[assetId][msg.sender];
        emit TokensLocked(assetId, msg.sender, true);
    }

    function _lockTokens(uint256 assetId, address tokenHolder) internal {
        locked[assetId][tokenHolder]=true;
        emit TokensLocked(assetId, tokenHolder, true);
    }

    function unlockTokens(uint256 assetId) external assetExists(assetId) onlyRegisteredUser {
        require(locked[assetId][msg.sender], "Tokens already unlocked");
        _unlockTokens(assetId, msg.sender);
        availableTokens[assetId] += balances[assetId][msg.sender];
        emit TokensUnlocked(assetId, msg.sender, false);
    }

    function _unlockTokens(uint256 assetId, address tokenHolder) internal {
        locked[assetId][tokenHolder]=false;
        emit TokensUnlocked(assetId, tokenHolder, false);
    }

    function availableTokenBalance(uint256 assetId) external view assetExists(assetId) returns (uint256) {
        return availableTokens[assetId];
    }

    function _transfer(uint256 assetId, address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "Transfer from the zero address");
        require(recipient != address(0), "Transfer to the zero address");
        require(balances[assetId][sender]>= amount, "Insufficient balance");
        require(!locked[assetId][sender], "Tokens locked");


        balances[assetId][sender]-=amount;
        balances[assetId][recipient]+= amount;

        if (recipient != assets[assetId].creator) {
            _lockTokens(assetId, recipient);
        }
    }

    function _transferFrom(uint256 assetId, address sender, address recipient, uint256 amount) internal {
        _transfer(assetId, sender, recipient, amount);
    }



    // function that return all details of an asset
    function getAsset(uint256 assetId) external view assetExists(assetId) returns (Asset memory) {
        return assets[assetId];
    }

    // function to get list of assets based on filter such as are verified,unverified,all
    function getAssetsByFilter(VerificationStatus filter) external view returns (Asset[] memory) {
        // get assets count based on filter
        uint256 filteredAssetCount = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].verificationStatus == filter) {
                filteredAssetCount++;
            }
        }
        // create array of assets based on filter
        Asset[] memory filteredAssets = new Asset[](filteredAssetCount);
        uint256 count = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].verificationStatus == filter) {
                filteredAssets[count] = assets[i];
                count++;
            }
        }
        return filteredAssets;
    }
    // function to get list of user assets based on filter such as are verified,unverified,all
    function getUserAssetsByFilter(address user, VerificationStatus filter) external view returns (Asset[] memory) {
        // get user assets count based on filter
        uint256 filteredAssetCount = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].creator == user && assets[i].verificationStatus == filter) {
                filteredAssetCount++;
            }
        }
        // create array of user assets based on filter
        Asset[] memory filteredAssets = new Asset[](filteredAssetCount);
        uint256 count = 0;
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].creator == user && assets[i].verificationStatus == filter) {
                filteredAssets[count] = assets[i];
                count++;
            }
        }
        return filteredAssets;
    }
}
