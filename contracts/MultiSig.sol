// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// @title MultiSig Wallet
/// @author eludius18
/// @notice This Smart Contract is a MultiSig Wallet
contract MultiSig is 
    ReentrancyGuardUpgradeable, 
    OwnableUpgradeable 
{
    address[] public owners;
    uint256 public transactionCount;
    uint256 public required;

    struct Transaction {
        address payable destination;
        uint256 value;
        bool executed;
        bytes data;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmations;

    constructor() {
        _disableInitializers();
    }

    function initialize(address[] memory _owners, uint256 _confirmations) initializer public {
        __Ownable_init();
        __ReentrancyGuard_init();
        require(_owners.length > 0);
        require(_confirmations > 0);
        require(_confirmations <= _owners.length);
        owners = _owners;
        required = _confirmations;
    }
    receive() payable external {
        
    }

    function executeTransaction(uint256 transactionId) public nonReentrant {
        require(isConfirmed(transactionId));
        Transaction storage _tx = transactions[transactionId];
        (bool success, ) = _tx.destination.call{ value: _tx.value }(_tx.data);
        require(success);
        _tx.executed = true;
    }

    function isConfirmed(uint256 transactionId) public view returns(bool) {
        return getConfirmationsCount(transactionId) >= required;
    }

    function getConfirmationsCount(uint256 transactionId) public view returns(uint256) {
        uint256 count;
        for(uint256 i = 0; i < owners.length; i++) {
            if(confirmations[transactionId][owners[i]]) {
                count++;
            }
        }
        return count;
    }

    function isOwner(address addr) private view returns(bool) {
        for(uint256 i = 0; i < owners.length; i++) {
            if(owners[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function submitTransaction(address payable dest, uint256 value,bytes calldata data) external {
        uint256 id = addTransaction(dest, value,data);
        confirmTransaction(id);
    }

    function confirmTransaction(uint256 transactionId) public {
        require(isOwner(msg.sender));
        confirmations[transactionId][msg.sender] = true;
        if(isConfirmed(transactionId)) {
            executeTransaction(transactionId);
        }
    }

    function addTransaction(address payable destination, uint256 value,bytes calldata data) public returns(uint256) {
        transactions[transactionCount] = Transaction(destination, value, false,data);
        transactionCount += 1;
        return transactionCount - 1;
    }
}