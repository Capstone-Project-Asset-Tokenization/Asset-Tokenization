// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "remix_tests.sol"; // this import is automatically injected by Remix
import "remix_accounts.sol"; // this import is required to use custom transaction context
import "../contracts/UserRegistration.sol"; // adjust the path as necessary

contract UserRegistrationTest {
    UserRegistration userRegistration;
    address account1 = TestsAccounts.getAccount(1);

    // Define the accounts you'll use in the tests
    function beforeAll() public {
        // Deploy the contract before running tests
        userRegistration = new UserRegistration();
    }

    /// Test registering a user
    function testRegisterUser() public {
        string memory legalIdNo = "ID123";
        userRegistration.registerUser("John Doe", "password123", "john@example.com", "regular", legalIdNo);

        // Check that the user is registered correctly
        (uint256 userId, , , , bool isRegistered, , , ,string memory _legalIdNo) = userRegistration.users(1);
        Assert.equal(userId, 1, "User ID should be 1");
        Assert.equal(_legalIdNo, legalIdNo, "Legal ID should match");
        Assert.equal(isRegistered, true, "User should be registered");
    }

    /// Test updating user info
    function testUpdateUserInfo() public {
        userRegistration.updateUserInfo(1, "Jane Doe", "jane@example.com", "regular");
        // Check that the user info is updated
        ( , string memory fullName, ,string memory email, , , , ,) = userRegistration.users(1);
        Assert.equal(fullName, "Jane Doe", "Full name should be updated");
        Assert.equal(email, "jane@example.com", "Email should be updated");
    }

    /// Test suspending a user
    function testSuspendUser() public {
        userRegistration.suspendUser(1);
        // Check that the user is suspended
        ( , , , , , bool isSuspended, , ,) = userRegistration.users(1);
        Assert.equal(isSuspended, true, "User should be suspended");
    }

    /// Test deleting a user
    function testDeleteUser() public {
        userRegistration.deleteUser(1);
        // Check that the user is unregistered
        ( , , , , bool isRegistered, , , ,) = userRegistration.users(1);
        Assert.equal(isRegistered, false, "User should be unregistered");
    }

    
}
