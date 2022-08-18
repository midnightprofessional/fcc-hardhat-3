//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    uint256 public favouriteNumber;

    mapping(string => uint256) public nameToFavNumber;

    struct People {
        uint256 favNumber;
        string name;
    }

    People[] public people;

    function store(uint256 _favNumber) public virtual {
        favouriteNumber = _favNumber;
        // retrieve();
    }

    //  View, Pure
    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    // function add() public pure returns(uint256){
    //     return 1+1;
    // }

    // calldata, memory, storage
    function addPerson(string calldata _name, uint256 _favNumber) public {
        // People memory person = People({ favNumber:_favNumber, name : _name  });
        // People memory person = People(_favNumber, _name);
        // people.push(person);
        people.push(People(_favNumber, _name));
        nameToFavNumber[_name] = _favNumber;
    }
}
