// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract UserRegistration {
    using SafeMath for uint256;

    struct User {
        uint256 userId; // Unique user identifier
        string fullName; // Full name of the user
        string password; // Password for the user
        string email; // Email address of the user
        bool isRegistered; // Indicates if the user is registered
        bool isSuspended; // incase the user gets suspended
        string userType; // Type of the user
        address owner; // Owner of the user
        string legalIdNo; // Unique legal identifier for user
    }

    mapping(uint256 => User) public users;
    mapping(string => uint256) public userIdsByLegalIdNo;
    uint256 private nextUserId = 1;

    event UserRegistered(uint256 userId, string legalIdNo, address owner);
    event UserUpdated(uint256 userId, string legalIdNo, address owner);
    event UserDeleted(uint256 userId, string legalIdNo);
    event UserSuspended(uint256 userId, string legalIdNo);

    function registerUser(string memory _fullName, string memory _password, string memory _email, string memory _userType, string memory _legalIdNo) public {
        require(userIdsByLegalIdNo[_legalIdNo] == 0, "User with this legal ID already exists.");

        User memory newUser = User({
            userId: nextUserId,
            fullName: _fullName,
            password: _password,
            email: _email,
            isRegistered: true,
            isSuspended: false,
            userType: _userType,
            owner: msg.sender,
            legalIdNo: _legalIdNo
        });

        users[nextUserId] = newUser;
        userIdsByLegalIdNo[_legalIdNo] = nextUserId;

        emit UserRegistered(nextUserId, _legalIdNo, msg.sender);

        nextUserId = nextUserId.add(1);
    }

    function updateUserInfo(uint256 _userId, string memory _fullName, string memory _email, string memory _userType) public {
        require(users[_userId].isRegistered, "User not registered.");
        require(users[_userId].owner == msg.sender, "Unauthorized.");
        require(!users[_userId].isSuspended, "User is suspended!");

        User storage user = users[_userId];
        user.fullName = _fullName;
        user.email = _email;
        user.userType = _userType;

        emit UserUpdated(_userId, user.legalIdNo, msg.sender);
    }

    function deleteUser(uint256 _userId) public {
        require(users[_userId].isRegistered, "User not registered.");
        require(users[_userId].owner == msg.sender, "Unauthorized.");

        emit UserDeleted(_userId, users[_userId].legalIdNo);

        delete userIdsByLegalIdNo[users[_userId].legalIdNo];
        delete users[_userId];
    }

    function suspendUser(uint256 _userId) public {
        require(users[_userId].isRegistered, "User not registered.");
        require(users[_userId].owner == msg.sender, "Unauthorized.");

        users[_userId].isSuspended = true;

        emit UserSuspended(_userId, users[_userId].legalIdNo);
    }


}
