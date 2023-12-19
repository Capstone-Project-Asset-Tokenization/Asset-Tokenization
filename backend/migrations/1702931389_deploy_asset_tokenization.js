var AssetTokenization = artifacts.require("./AssetTokenization.sol");
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(AssetTokenization);
};
