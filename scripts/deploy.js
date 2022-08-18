const { ethers, run, network } = require("hardhat");
// require("dotenv").config();

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to : ${simpleStorage.address}`);

    console.log("Check for network");
    console.log(network.config.chainId);
    console.log(process.env.ETHERSCAN_API_KEY);
    
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waitting for block transactions...");
        await simpleStorage.deployTransaction.wait(5);
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value : ${currentValue}`);

    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);

    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Value : ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log(`Verify contract...`);
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
