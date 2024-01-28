var AssetTokenization = artifacts.require("./AssetTokenization.sol");
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  console.log("Deploying AssetTokenization...");
  _deployer.deploy(AssetTokenization);
};
