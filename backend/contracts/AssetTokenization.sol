// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AssetTokenization {
    struct Asset {
        string assetId; // Unique identifier for the asset (e.g., VIN for cars, property ID for houses)
        address owner;  // Owner of the asset
        bool isTokenized; // Indicates if the asset is already tokenized
        string assetType; // Type of the asset (e.g., house, car, land)
        //TODO: Add additional fields for the asset
    }
    // Mapping from assetId to Asset
    mapping(string => Asset) public assets;

    event AssetRegistered(string assetId, address owner);
    event AssetTokenized(string assetId, address owner);

    constructor(){
    }

    // Function to register an asset
    function registerAsset(string memory assetId, address owner, string memory assetType) public {
        require(assets[assetId].owner == address(0), "Asset already registered");
        assets[assetId] = Asset(assetId, owner, false, assetType);
        emit AssetRegistered(assetId, owner);
    }

    // Function to tokenize an asset
    function tokenizeAsset(string memory assetId) public {
        require(assets[assetId].owner == msg.sender, "Only the owner can tokenize the asset");
        require(!assets[assetId].isTokenized, "Asset is already tokenized");
        assets[assetId].isTokenized = true;
        //TODO: Add logic to tokenize the asset

        emit AssetTokenized(assetId, msg.sender);
    }

    // Function to check if an asset is tokenized
    function isAssetTokenized(string memory assetId) public view returns (bool) {
        return assets[assetId].isTokenized;
    }
}
