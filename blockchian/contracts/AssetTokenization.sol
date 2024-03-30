// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AssetTokenization is ERC721 {
    using SafeMath for uint256;

    struct Asset {
        uint256 tokenId; // Unique token identifier
        string assetId; // Unique identifier for the asset
        bool isTokenized; // Indicates if the asset is tokenized
        string assetType; // Type of the asset
        address owner; // Owner of the asset
        bool isVerified; // Indicates if the asset is verified
        string[] supportingDocuments; // Stores the cryptographic hash of files
        string[] supportingImages; // Stores the cryptographic hash of images
        uint256 quantity; // Optional: Quantity of the asset (for fungible assets)
        string location; // Optional: Location of the asset
        string[] tags; // Optional: Array of tags for the asset
        address[] previousOwners; // Optional: Array of previous owners
        string status; // Optional: Status of the asset
    }

    struct Escrow {
        uint256 tokenId; // Unique token identifier
        string assetId; // Unique identifier for the asset
        address seller; // Seller address
        address buyer; // Buyer address
        uint256 price; // Price of the asset
        uint256 escrowTime; // Time when the asset was escrowed
        bool isSuccessful; // Indicates if the escrow was successful
        uint256 escrowId; // Unique identifier for the escrow
    }

    mapping(string => Asset) public assets;
    mapping(uint256 => string) private tokenToAssetId;
    mapping(uint256 => Escrow) public escrows;
    uint256 private nextTokenId;

    event AssetRegistered(string assetId, address owner);
    event AssetTokenized(string assetId, address owner);
    event AssetVerified(string assetId, address owner);
    event EscrowInitiated(string assetId, address seller, address buyer, uint256 price, uint256 escrowId);
    event EscrowConfirmed(string assetId, address seller, address buyer, uint256 price, uint256 escrowId);
    event EscrowCancelled(string assetId, address seller, address buyer, uint256 escrowId);

    constructor() ERC721("AssetToken", "AST") {
        nextTokenId = 1;
    }

    modifier onlyAssetOwner(string memory assetId) {
        require(assets[assetId].owner == msg.sender, "Caller is not the asset owner");
        _;
    }

    // Function to register an asset
    function registerAsset(string memory assetId,
        string memory assetType,
        address assetOwner,
        string[] memory supportingDocuments,
        string[] memory supportingImages,
        uint256 quantity,
        string memory location,
        string[] memory tags,
        string memory status) public {
        require(assets[assetId].owner == address(0), "Asset already registered");
        uint256 currentTokenId = nextTokenId++; // Assign and then increment tokenId
        Asset memory newAsset = Asset(
            currentTokenId,
            assetId,
            false,
            assetType,
            assetOwner,
            false,
            supportingDocuments,
            supportingImages,
            quantity,
            location,
            tags,
            new address[](0),
            status
        );
        assets[assetId] = newAsset;
        tokenToAssetId[currentTokenId] = assetId;
        emit AssetRegistered(assetId, assetOwner);
    }

    function tokenizeAsset(string memory assetId, address assetOwner) public {
        require(!assets[assetId].isTokenized, "Asset is already tokenized");
        assets[assetId].isTokenized = true;
        _mint(assetOwner, assets[assetId].tokenId);
        emit AssetTokenized(assetId, assetOwner);
    }

    function getAssetOwner(string memory assetId) public view returns (address) {
        require(assets[assetId].isTokenized, "Asset is not tokenized");
        return ownerOf(assets[assetId].tokenId);
    }

    function isAssetTokenized(string memory assetId) public view returns (bool) {
        return assets[assetId].isTokenized;
    }

    function verifyAsset(string memory assetId) public {
        require(!assets[assetId].isVerified, "Asset is already verified");
        assets[assetId].isVerified = true;
        emit AssetVerified(assetId, msg.sender);
    }

    function isAssetVerified(string memory assetId) public view returns (bool) {
        return assets[assetId].isVerified;
    }
    // TODO Under development...
    function initiateEscrow(string memory assetId, address buyer, uint256 price, address assetOwner) public {
        require(assets[assetId].isTokenized, "Asset is not tokenized");
        uint256 escrowId = uint256(keccak256(abi.encodePacked(assetId, assetOwner, buyer)));
        require(escrows[escrowId].escrowTime == 0, "Escrow already exists");
        Escrow memory newEscrow = Escrow(assets[assetId].tokenId, assetId, assetOwner, buyer, price,
        block.timestamp,
        false,
        escrowId);
        escrows[escrowId] = newEscrow;
        emit EscrowInitiated(assetId, assetOwner, buyer, price, escrowId);
    }
    // TODO Under development...
    function confirmEscrow(uint256 escrowId, address assetOwner) public {
        Escrow storage escrow = escrows[escrowId];
        require(escrow.buyer == assetOwner, "Only the buyer can confirm the escrow");
        require(escrow.escrowTime.add(1 days) > block.timestamp, "Escrow expired");
        require(!escrow.isSuccessful, "Escrow already confirmed");

        escrow.isSuccessful = true;
        _transfer(escrow.seller, assetOwner, escrow.tokenId);
        assets[tokenToAssetId[escrow.tokenId]].owner = assetOwner;
        emit EscrowConfirmed(escrow.assetId, escrow.seller, assetOwner, escrow.price, escrowId);
    }
    // TODO Under development...
    function cancelEscrow(uint256 escrowId, address assetOwner) public {
        Escrow storage escrow = escrows[escrowId];
        require(assetOwner == escrow.seller || assetOwner == escrow.buyer, "Only involved parties can cancel the escrow");
        require(!escrow.isSuccessful, "Escrow already completed");

        //TODO: Refund logic goes here (if applicable)

        delete escrows[escrowId]; // Remove the escrow from storage
        emit EscrowCancelled(escrow.assetId, escrow.seller, escrow.buyer, escrowId);
    }

}