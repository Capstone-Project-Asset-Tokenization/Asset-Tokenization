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
        Assert.equal(_assetId, assetId, "Asset ID should match");
        Assert.equal(_assetType, assetType, "Asset type should match");
        Assert.equal(_owner, owner, "Owner should be msg.sender");
        Assert.equal(isTokenized, false, "Asset should not be tokenized yet");
    }

    /// Test tokenizing an asset
    function testTokenizeAsset() public {
        string memory assetId = "asset_1";
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


}
