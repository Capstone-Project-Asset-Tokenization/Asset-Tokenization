// const AssetTokenization = artifacts.require("AssetTokenization");
// const { expect } = require("chai");
// const truffleAssert = require("truffle-assertions");

// contract("AssetTokenization", (accounts) => {
//   let contractInstance;
//   const owner = accounts[0];
//   const alice = accounts[1];

//   // Initialize a new contract instance before each test
//   beforeEach(async () => {
//     contractInstance = await AssetTokenization.new();
//   });

//   // Tests related to the deployment of the contract
//   describe("Deployment", () => {
//     it("Should set the owner", async () => {
//       expect(await contractInstance.owner()).to.equal(owner);
//     });
//   });

//   // Tests related to the minting functionality
//   describe("Minting", () => {
//     it("Should mint tokens", async () => {
//       const tokenId = 1;
//       const tokenURI = "https://example.com";
//       const tx = await contractInstance.mint(alice, tokenId, tokenURI, {
//         from: owner,
//       });

//       // Check if the Transfer event was emitted correctly
//       truffleAssert.eventEmitted(tx, "Transfer", (event) => {
//         return (
//           event.from === "0x0000000000000000000000000000000000000000" &&
//           event.to === alice &&
//           event.tokenId.toNumber() === tokenId
//         );
//       });
//     });

//     it("Should not mint tokens if not owner", async () => {
//       const tokenId = 1;
//       const tokenURI = "https://example.com";
//       // Expect the transaction to be reverted if not called by the owner
//       await truffleAssert.reverts(
//         contractInstance.mint(alice, tokenId, tokenURI, { from: alice }),
//         "Ownable: caller is not the owner"
//       );
//     });
//   });

//   // Additional tests can be added here
// });
