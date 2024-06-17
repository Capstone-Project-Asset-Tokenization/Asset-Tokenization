// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    struct User {
        bool isAdmin;
        bool isRegistered;
        bool isBanned;
        address promotedBy;
        address userAddress;
    }

    mapping(address => User) public users;
    address[] public usersAddressList;

    event UserRegistered(
        address indexed user,
        bool isAdmin,
        address indexed promotedBy
    );
    event UserPromoted(address indexed user, address indexed promotedBy);

    modifier onlyAdmin() {
        require(users[msg.sender].isAdmin, "Only admin allowed");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }

    constructor() {
        users[msg.sender] = User({
            isAdmin: true,
            isRegistered: true,
            isBanned: false,
            promotedBy: address(0),
            userAddress: msg.sender
        });
        usersAddressList.push(msg.sender);
    }

    function registerUser() external {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender].isRegistered = true;
        users[msg.sender].isBanned = false;
        users[msg.sender].userAddress = msg.sender;
        usersAddressList.push(msg.sender);
        emit UserRegistered(msg.sender, false, address(0));
    }

    function promoteToAdmin(address userAddress) external onlyAdmin {
        require(users[userAddress].isRegistered, "User is not registered");
        users[userAddress].isAdmin = true;
        users[userAddress].promotedBy = msg.sender;
        emit UserPromoted(userAddress, msg.sender);
    }

    function getUser(address userAddress)
        external
        view
        returns (
            bool,
            bool,
            bool,
            address
        )
    {
        return (
            users[userAddress].isAdmin,
            users[userAddress].isRegistered,
            users[userAddress].isBanned,
            users[userAddress].promotedBy
        );
    }

    function getAllUserAddresses() external view returns (address[] memory) {
        address[] memory filteredUsersAddressList = new address[](
            usersAddressList.length
        );
        uint256 count = 0;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (!users[usersAddressList[i]].isBanned) {
                filteredUsersAddressList[count] = usersAddressList[i];
                count = count + 1;
            }
        }
        return filteredUsersAddressList;
    }

    function banUser(address userAddress) external onlyAdmin {
        users[userAddress].isBanned = true;
    }

    function unbanUser(address userAddress) external onlyAdmin {
        users[userAddress].isBanned = false;
    }

    function getAdminsWithPromoterDetails()
        external
        view
        returns (User[] memory, User[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (users[usersAddressList[i]].isAdmin) {
                count = count + 1;
            }
        }
        User[] memory admins = new User[](count);
        User[] memory promoters = new User[](count);
        count = 0;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (users[usersAddressList[i]].isAdmin) {
                admins[count] = users[usersAddressList[i]];
                promoters[count] = users[users[usersAddressList[i]].promotedBy];
                count = count + 1;
            }
        }
        return (admins, promoters);
    }

    function getBannedUsers() external view returns (User[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (users[usersAddressList[i]].isBanned) {
                count = count + 1;
            }
        }
        User[] memory bannedUsers = new User[](count);
        count = 0;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (users[usersAddressList[i]].isBanned) {
                bannedUsers[count] = users[usersAddressList[i]];
                count = count + 1;
            }
        }
        return bannedUsers;
    }

    function getRegisteredUsers() external view returns (User[] memory) {
        User[] memory registeredUsers = new User[](usersAddressList.length);
        uint256 count = 0;
        for (uint256 i = 0; i < usersAddressList.length; i++) {
            if (users[usersAddressList[i]].isRegistered) {
                registeredUsers[count] = users[usersAddressList[i]];
                count = count + 1;
            }
        }
        return registeredUsers;
    }

    function depromoteAdmin(address userAddress) external onlyAdmin {
        users[userAddress].isAdmin = false;
    }
}

