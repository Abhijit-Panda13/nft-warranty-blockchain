const hre = require('hardhat')

async function main() {
  const flipkartCoinFactory = await hre.ethers.getContractFactory('FlipkartCoin')
  const flipkartCoin = await flipkartCoinFactory.deploy()

  await flipkartCoin.deployed()

  const flipkartNFTFactory = await hre.ethers.getContractFactory('FlipkartInvoice')
  const flipkartNFT = await flipkartNFTFactory.deploy()

  await flipkartNFT.deployed()

  console.log('Flipkart Coin deployed to:', flipkartCoin.address)
  console.log('Flipkart NFT deployed to:', flipkartNFT.address)
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })