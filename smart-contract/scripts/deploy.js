const hre = require('hardhat')

async function main() {
  const flipkartCoinFactory = await hre.ethers.getContractFactory('FlipkartCoin')
  const flipkartCoin = await flipkartCoinFactory.deploy()

  await flipkartCoin.deployed()

  console.log('Flipkart Coin deployed to:', flipkartCoin.address)
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })