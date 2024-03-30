// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// UserRegistration contract allows for the registration, update, and management of user details.
contract UserRegistration {
    using SafeMath for uint256;
    // Struct representing a user with various attributes.
    struct User {
        uint256 userId; // Unique user identifier
        string firstName; // First name of the user
        string lastName; // Last name of the user
        string email; // Email address of the user
        bool isSuspended; // incase the user gets suspended
        bool isGovermentOfficial; // Indicates if the user is a government official
        address owner; // Owner of the user
        string legalIdNo; // Unique legal identifier for user
        bool isUserDeleted; // Indicates if the user is deleted, soft delete
    }

    mapping(uint256 => User) public users;
    mapping(string => uint256) public userIdsByLegalIdNo;
    mapping(address => User) public usersByAddress;
    uint256 private nextUserId = 1;

    event UserRegistered(uint256 userId, string legalIdNo, address owner);
    event UserUpdated(uint256 userId, string legalIdNo, address owner);
    event UserDeleted(uint256 userId, string legalIdNo);
    event UserSuspended(uint256 userId, string legalIdNo);

    // Allows a user to be registered in the system with provided details.
    function registerUser(string memory _firstName,
     string memory _lastName,
      string memory _email,
       bool _isGovermentOfficial,
        string memory _legalIdNo,
        address _owner)
         public {
        require(userIdsByLegalIdNo[_legalIdNo] == 0, "User with this legal ID already exists.");
        require(usersByAddress[_owner].owner == address(0), "User with this address already exists.");
        User memory newUser = User({
            userId: nextUserId,
            firstName: _firstName,
            lastName: _lastName,
            email: _email,
            isSuspended: false,
            isGovermentOfficial: _isGovermentOfficial,
            owner: _owner,
            legalIdNo: _legalIdNo,
            isUserDeleted: false
        });
        users[nextUserId] = newUser;
        userIdsByLegalIdNo[_legalIdNo] = nextUserId;
        usersByAddress[_owner] = newUser;
        emit UserRegistered(nextUserId, _legalIdNo, _owner);
        nextUserId = nextUserId.add(1);
    }

    // Allows the owner of a user to update the user's information.
     function updateUserInfo(uint256 _userId,
     string memory _firstName,
      string memory _lastName,
      string memory _email,
       address _owner
       ) public {
        require(users[_userId].owner == _owner, "Unauthorized.");
        require(!users[_userId].isSuspended, "User is suspended!");
        User storage user = users[_userId];
        user.firstName = _firstName;
        user.lastName = _lastName;
        user.email = _email;
        emit UserUpdated(_userId, user.legalIdNo, _owner);
    }

    function deleteUser(uint256 _userId, address _officalsAddress
    ) public {
        require(users[usersByAddress[_officalsAddress].userId].isGovermentOfficial, "Unauthorized.");
        users[_userId].isUserDeleted = true;
        emit UserDeleted(_userId, users[_userId].legalIdNo);

    }

    function suspendUser(uint256 _userId, address _officalsAddress
    ) public {
        require(users[usersByAddress[_officalsAddress].userId].isGovermentOfficial, "Unauthorized.");
        users[_userId].isSuspended = true;
        emit UserSuspended(_userId, users[_userId].legalIdNo);
    }
}