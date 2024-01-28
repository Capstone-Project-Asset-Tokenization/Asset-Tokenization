// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "remix_tests.sol"; // this import is automatically injected by Remix
import "remix_accounts.sol"; // this import is required to use custom transaction context
import "../contracts/AssetTokenization.sol"; // adjust the path as necessary

contract AssetTokenizationTest {

    AssetTokenization assetTokenization;
    address account1 = TestsAccounts.getAccount(1);
    address owner;

    // Define the accounts you'll use in the tests
    
    function beforeAll() public {
        // Deploy the contract before running tests
        assetTokenization = new AssetTokenization();
        owner = msg.sender;
    }

    /// Test registering an asset
    function testRegisterAsset() public {
        // Register an asset
        string memory assetId = "asset_1";
        string memory assetType = "type_1";
        // address expectedOwner = msg.sender;
        assetTokenization.registerAsset(assetId, assetType, owner);

        // Check that the asset is registered correctly
        (uint256 tokenId, string memory _assetId, bool isTokenized, string memory _assetType, address _owner) = assetTokenization.assets(assetId);
        Assert.equal(tokenId, 1, "Token ID should be 1");
        Assert.equal(_assetId, assetId, "Asset ID should match");
        Assert.equal(_assetType, assetType, "Asset type should match");
        Assert.equal(_owner, owner, "Owner should be msg.sender");
        Assert.equal(isTokenized, false, "Asset should not be tokenized yet");
    }

    /// Test tokenizing an asset
    function testTokenizeAsset() public {
        string memory assetId = "asset_1";
        // string memory assetType = "type_1";
        address assetOwner = owner; // use the 'owner' address to register
        // assetTokenization.registerAsset(assetId, assetType, assetOwner);
        address assetOwner = owner; // use the 'owner' address to register
        assetTokenization.tokenizeAsset(assetId, assetOwner);

        // Check that the asset is tokenized
        bool isTokenized = assetTokenization.isAssetTokenized(assetId);
        Assert.equal(isTokenized, true, "Asset should be tokenized");
    }

    /// Test transferring an asset
    function testTransferAsset() public {
        string memory assetId = "asset_1";
        address assetOwner = owner;
        assetTokenization.transferAsset(assetId, assetOwner, account1);

        // Check new owner
        address newOwner = assetTokenization.getAssetOwner(assetId);
        Assert.equal(newOwner, account1, "Asset should be transferred to account1");
    }

    /// Test initiating escrow
    function testInitiateEscrow() public {
        string memory assetId = "asset_1";
        uint256 price = 1000; // Set a price for the asset
        assetTokenization.initiateEscrow(assetId, account1, price);

        // Fetch escrow details and check
        // Escrow ID generation logic needs to be replicated here to fetch the correct escrow
        uint256 escrowId = uint256(keccak256(abi.encodePacked(block.number, assetId, owner, account1, price)));
        ( , , address seller, address buyer, uint256 escrowPrice, , bool isSuccessful, ) = assetTokenization.escrows(escrowId);

        Assert.equal(seller, owner, "Seller should be msg.sender");
        Assert.equal(buyer, account1, "Buyer should be account1");
        Assert.equal(escrowPrice, price, "Escrow price should match");
        Assert.equal(isSuccessful, false, "Escrow should not be successful yet");
    }

    /// Test confirming escrow
    function testConfirmEscrow() public {
        // Setup: Initialize and confirm an escrow
        string memory assetId = "asset_1";
        uint256 price = 1000;
        assetTokenization.initiateEscrow(assetId, account1, price);

        // Calculate the escrow ID
        uint256 escrowId = uint256(keccak256(abi.encodePacked(block.number, assetId, owner, account1, price)));

        // Assuming the contract allows the buyer (account1) to confirm the escrow
        // Change msg.sender to account1
        TestsAccounts.setAccount(1);

        // Confirm the escrow
        assetTokenization.confirmEscrow(escrowId);

        // Verify escrow is confirmed
        ( , , , , , , bool isSuccessful, ) = assetTokenization.escrows(escrowId);
        Assert.equal(isSuccessful, true, "Escrow should be successful");

        // Verify asset ownership transfer
        address newOwner = assetTokenization.getAssetOwner(assetId);
        Assert.equal(newOwner, account1, "New owner should be account1 after escrow confirmation");

        // Revert back to the original account
        TestsAccounts.setAccount(0);
    }
    /// Test cancelling escrow
    function testCancelEscrow() public {
        // Setup: Initialize an escrow
        string memory assetId = "asset_2"; // Use a different asset to avoid conflicts with previous tests
        uint256 price = 2000;
        assetTokenization.initiateEscrow(assetId, account2, price);

        // Calculate the escrow ID
        uint256 escrowId = uint256(keccak256(abi.encodePacked(block.number, assetId, owner, account2, price)));

        // Cancel the escrow
        assetTokenization.cancelEscrow(escrowId);

        // Verify escrow is cancelled
        ( , , , , , , bool isSuccessful, ) = assetTokenization.escrows(escrowId);
        Assert.equal(isSuccessful, false, "Escrow should be cancelled");

        // Optionally, verify that the escrow entry is deleted or marked as cancelled
        // This depends on how the cancelEscrow function is implemented in the contract
    }



}
