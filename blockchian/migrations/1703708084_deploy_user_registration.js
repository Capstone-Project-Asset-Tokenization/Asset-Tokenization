var UserRegistration = artifacts.require("./UserRegistration.sol");
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  console.log("Deploying UserRegistration...");
  _deployer.deploy(UserRegistration);
};
