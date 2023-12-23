// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AssetTokenization is ERC721 {
    struct Asset {
        uint256 tokenId; // Unique token identifier
        string assetId; // Unique identifier for the asset
        bool isTokenized; // Indicates if the asset is tokenized
        string assetType; // Type of the asset
        address owner; // Owner of the asset
        // TODO: Add more fields
    }

    mapping(string => Asset) public assets;
    mapping(uint256 => string) private tokenToAssetId;
    uint256 private nextTokenId;

    event AssetRegistered(string assetId, address owner);
    event AssetTokenized(string assetId, address owner);

    constructor() ERC721("AssetToken", "AST") {
        nextTokenId = 1;
    }

    function registerAsset(string memory assetId, string memory assetType, address assetOwner) public {
        require(assets[assetId].owner == address(0), "Asset already registered");
        
        uint256 currentTokenId = nextTokenId++; // Assign and then increment tokenId
        Asset memory newAsset = Asset(currentTokenId, assetId, false, assetType, assetOwner);
        
        assets[assetId] = newAsset;
        tokenToAssetId[currentTokenId] = assetId;

        emit AssetRegistered(assetId, assetOwner);
    }
 


    function tokenizeAsset(string memory assetId, address assetOwner) public {
        require(assets[assetId].owner == assetOwner, "Only the owner can tokenize the asset");
        require(!assets[assetId].isTokenized, "Asset is already tokenized");
        assets[assetId].isTokenized = true;
        _mint(assetOwner, assets[assetId].tokenId);
        emit AssetTokenized(assetId, assetOwner);
    }

    function transferAsset(string memory assetId, address from, address to) public {
        require(assets[assetId].isTokenized, "Asset is not tokenized");
        require(assets[assetId].owner == from, "Only the owner can transfer the asset");
        _transfer(from, to, assets[assetId].tokenId);
    }

    function getAssetOwner(string memory assetId) public view returns (address) {
        require(assets[assetId].isTokenized, "Asset is not tokenized");
        return ownerOf(assets[assetId].tokenId);
    }

    function isAssetTokenized(string memory assetId) public view returns (bool) {
        return assets[assetId].isTokenized;
    }


}
