require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const { GOERLI_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.8",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
        },
    },
};
