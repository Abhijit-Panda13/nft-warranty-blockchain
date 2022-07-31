# Blockchain-based eCommerce warranty system using NFTs

![alt text](https://cdn.discordapp.com/attachments/801879108622745611/1003259118196359189/unknown.png)

## Problem Statement ⛹️‍♂️

Many consumer products come with warranties against manufacturing and regular-use defects. Warranties are only granted when sold through an authorized dealer or store and oftentimes are valid only for a specified time period.

Currently, the validity of the warranty is determined by some physical receipt or warranty card. This poses several issues:

- The warranty document is easily falsifiable.
- The warranty document is not necessarily standard among different sellers.
- A bad acting authorized dealer could issue warranty cards for expired products "under the table".

## Solution ✨

The issues mentioned above are all byproducts of maintaining warranties in the physical world. Tokenize the warranties and many of the problems related to the "real-world" disappear. Not only are the problems resolved, but new possibilities also emerge, such as tracking the exact ownership chain.

With this solution:

- NFTs cannot be falsified.
- A warranty on this NFT DApp is standardized, no matter who issued it or when.
- Finding bad-acting dealers will be simpler since it is easier to scan the blockchain for anomalous behaviors such as multiple warranty NFTs for the same product serial number.

New Possibilities:

- The number of warranty transfers of a product can be limited and controlled. Some warranties are non-transferable to new owners whereas others offer unlimited transfers. Tokenized warranties can accurately enforce these rules.
- A product's exact ownership chain can be traced.

## THE ANONYMOUS TOURISTS 💖

Abhas Abhirup Behera <br>
Abhijit Panda <br>
Subhasish Panda

## Getting Started 💫

### Prerequisites

Any modern web browser such as Chrome, Firfox, Brave ,Edge etc. <br>
Node.js v 16.0.0 +<br>
Yarn latest <br>
npm latest <br>
Git latest <br>

### Setup Local Project

This is a Next.js project bootstrapped with create-next-app. <br>
Fork the repo on Github <br>
Clone the project to your local system<br>
After cloning the repo first install the modules required using bash npm install #or yarn add.
<br> Next change directory to smart-contract using bash cd smart-contract/ and run bash npm install<br>
Migrate to the root repository and run the development server bash cd .. #and npm run dev #or yarn dev. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Metamask Setup

Download the Metamask extension from [https://metamask.io/](https://metamask.io/) and create a wallet. (You are free to use any wallet of your choice). Connect the wallet by clicking on the "Connect Wallet" button on the top-left if a pop-up hasn't already come from metamask. Sign the request and your metamask wallet has been successfully linked to the site.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

You are now ready to use our site! Happy Minting ❤️

## Project Architecture 🤩

![alt text](https://cdn.discordapp.com/attachments/801879108622745611/1003259699979890708/unknown.png)

The user can access the application via web-browser, and he must have the Metamask wallet installed. This interface, built with Next.js, relies on the Ethers.js library to communicate with the smart contracts through Metamask. This means that the data reflected on the front-end application is fetched from the Ethereum blockchain. Each action performed by the user (mint a NFT, buy NFT...) creates a transaction on Ethereum, which will require Metamask confirmation and pay a small fee, and this transaction will permanently modify the state of the NFTCollection and NFTMarketplace smart contracts.

## How we built it? 🧑‍💻

![alt text](https://cdn.discordapp.com/attachments/801879108622745611/1003259556161388635/unknown.png)

We used next js in the frontend and used moralis' decentralised backend and database services. We also used meta mask wallet to connect our decentralised application with various blockchain and web3 services. We implemented our smart contracts with solidity, which inherited from open zepplin contracts library, and used hardhat to compile and deploy them to polygon's mumbai testnet, along with the help of alchemy. Our design was implemented using tailwind css.

Our decentralised web app includes the following features :-

### 1. Wallet Connect -

Users can register/login to the marketplace by connecting their wallet. They get a customised avatar, can edit their profile and access their wallet balance. They are then displayed all the trending products.

### 2. Super Coin -

A super coin is a custom token, that is used for tranactions in our marketplace, implemented using ERC-20 smart contract. Initially for a new user his super coin balance is set to 0 and he/she can mint any number of tokens through their wallet. After every successful mint, a receipt is generated which provides all the details of the transactions made.

### 3. Assets Buy -

Users can choose from and buy assets from the trending products. After every successful purchase, ERC-1155 NFTs double the amount of the quantity purchased get minted. Half of the NFTs are used to prove ownership of the users and the other half, being decaying in nature, can be used to track the warranty period of the product.

### 4. Decaying NFTs -

NFTs related to warranty are burned after the warranty expires. This automation of the smart contract was achieved using the chain link's keepers, which is an oracle service.

### 5. Purchase History -

Users can view the detailed information, of their owned assets, which includes date of purchase, quantity purchased, warranty time left and the receipt generated from the transaction.

## Challenges we ran into 🥺

We faced numerous challenges throughout the journey.

###### 1.How to efficiently mint NFTs for the wide variety of products available for each user.

###### 2.Automating the decaying process of the NFTs, related to the warranty of a product, as the blockchain is deterministic in nature.

###### 3.Creating an efficient way of storing the purchase time of the products, so that the respective decaying NFTs can be burnt, after the warranty expires.

###### 4.Implementing our database in the Moralis server and configuring a dApp for interacting with our web3 application.

## Limitations 😕

The limitations of our dApp include:

### 1. Maintenance -

Our dApp is hard to maintain and modify as the smart contracts and the related data are published on the blockchain. It's not easy to make updates to it once deployed, even if bugs or security risks are identified.

### 2. User experience -

It is harder to engineer user-friendly experience because the average end-user might find it too hard to set up a tool stack necessary for interacting with the blockchain in a truly secure fashion.

### 3. Performance overhead -

There is a huge performance overhead and scaling is really difficult. The dApp can sometimes be slow to load, and the payments can take a while to process. This adds lagtime to processes we have come to expect as instantaneous.

### 4. Traditional security -

Typical security solutions won't work in the dApp. It's critical to use dApp-specific security solutions, because they operate differently and in a very distinct environment.

## Future scope 🎉

###### 1. Using the newly emerging layer-2 scaling solutions of the blockchain can significantly improve the maintenance and performance drawbacks.

###### 2. With the rapid advancements in the field of blockchain, it is inevitable that numerous practices currently in use will become obsolete, leading to the advent of increased user-friendly experience and security platforms for securing transactions with proprietary technology.

## Built With 💕

Following technologies and libraries are used for the development of the website

- [ ] Next.js
- [ ] Tailwind Css
- [ ] Nodejs
- [ ] Alchemy
- [ ] Ethers.js
- [ ] Moralis
- [ ] Solidity
- [ ] Hardhat
- [ ] Open Zeppelin
- [ ] Chainlink
- [ ] Polygon (Mumbai Testnet)
- [ ] Metamask
- [ ] Heroku

## Conclusion 😎

This project presents an NFT application for recording product warranties on the blockchain. With such a solution, many of the issues around tracking and handling warranties in the physical world are alleviated. Additionally, new possibilities are opened such as exact tracking of a product's ownership over time and precise counting and enforcement of the number of warranty transfers permitted.
