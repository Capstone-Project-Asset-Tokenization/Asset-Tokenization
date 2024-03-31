// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract UserVerification {
    mapping(address => bool) public registeredUsers;

    event UserRegistered(address indexed user);
    event UserDeregistered(address indexed user);

    // Allows a user to register themselves
    function registerUser() public {
        require(!registeredUsers[msg.sender], "User already registered.");
        registeredUsers[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    // Allows a user to deregister themselves
    function deregisterUser() public {
        require(registeredUsers[msg.sender], "User not registered.");
        registeredUsers[msg.sender] = false;
        emit UserDeregistered(msg.sender);
    }

    // Checks if a specific user is registered
    function isUserRegistered(address user) public view returns (bool) {
        return registeredUsers[user];
    }
}

