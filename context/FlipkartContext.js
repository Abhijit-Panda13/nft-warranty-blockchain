import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { flipkartAbi, flipkartCoinAddress, flipkartNFTAddress, flipkartNFTAbi } from '../lib/constants'
import { ethers } from 'ethers'

export const FlipkartContext = createContext()

export const FlipkartProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [balance, setBalance] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const [amountDue, setAmountDue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [etherscanLink, setEtherscanLink] = useState('')
    const [nickname, setNickname] = useState('')
    const [username, setUsername] = useState('')
    const [assets, setAssets] = useState([])
    const [recentTransactions, setRecentTransactions] = useState([])
    const [ownedItems, setOwnedItems] = useState([])

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis()

  const {
    data: assetsData,
    error: assetsDataError,
    isLoading: assetsDataIsLoading,
  } = useMoralisQuery('assets')

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useMoralisQuery('_User')

  const getBalance = async () => {
    try {
      if (!isAuthenticated || !currentAccount) return
      const options = {
        contractAddress: flipkartCoinAddress,
        functionName: 'balanceOf',
        abi: flipkartAbi,
        params: {
          account: currentAccount,
        },
      }

      if (isWeb3Enabled) {
        const response = await Moralis.executeFunction(options)
        console.log(response.toString())
        setBalance(response.toString())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const listenToUpdates = async () => {
    let query = new Moralis.Query('EthTransactions')
    let subscription = await query.subscribe()
    console.log("Subscription", subscription)
    subscription.on('update', async object => {
      console.log('New Transactions')
      console.log(object)
      setRecentTransactions([object])
    })
  }
  

  useEffect(() => {
    async function fetchData() {
      if (!isWeb3Enabled) {
        await enableWeb3()
      }
        if(isAuthenticated) {
            await getBalance()
            await listenToUpdates()
            console.log("Recents", recentTransactions)
            const currentUsername = await user?.get('nickname')
            setUsername(currentUsername);
            const account = await user?.get('ethAddress');
            setCurrentAccount(account);
        }
    }
    fetchData();
  }, [isAuthenticated, user, username, currentAccount, getBalance, listenToUpdates])

  useEffect(() =>{
    async function fetchData() {
        console.log(assetsData)
        await enableWeb3()
        await getAssets()
        await getOwnedAssets()
    }
    if(isWeb3Enabled){
        fetchData()
    }
    
  }, [isWeb3Enabled, assetsData, assetsDataIsLoading])





  const connectWallet = async () => {
    await enableWeb3()
    await authenticate()
  }

  const handleSetUsername = () => {
    if (user) {
      if (nickname) {
        user.set('nickname', nickname)
        user.save()
        setNickname('')
      } else {
        console.log("Can't set empty nickname")
      }
    } else {
      console.log('No user')
    }
  }

  const getAssets = async () => {
    try {
      await enableWeb3()
      // const query = new Moralis.Query('Assets')
      // const results = await query.find()

      setAssets(assetsData)
    } catch (error) {
      console.log(error)
    }
  }

  const buyTokens = async () => {
    if (!isAuthenticated) {
      await connectWallet()
    }

    const amount = ethers.BigNumber.from(tokenAmount)
    const price = ethers.BigNumber.from('100000000000000')
    const calcPrice = amount.mul(price)

    console.log(flipkartCoinAddress)

    let options = {
      contractAddress: flipkartCoinAddress,
      functionName: 'mint',
      abi: flipkartAbi,
      msgValue: calcPrice,
      params: {
        amount,
      },
    }
    const transaction = await Moralis.executeFunction(options)
    const receipt = await transaction.wait()
    setIsLoading(false)
    console.log(receipt)
    setEtherscanLink(
        `https://mumbai.polygonscan.com/tx/${receipt.transactionHash}`,
    )
  }

  const buyAsset = async (quant, price, asset, id) => {
    try {
      if (!isAuthenticated) return
      // await enableWeb3()
      console.log('price: ', price)
      console.log('asset: ', asset.name)
      console.log(userData)
      const period = 120;
      const options = {
        type: 'erc20',
        amount: price,
        receiver: flipkartCoinAddress,
        contractAddress: flipkartCoinAddress,
      }

      let transaction = await Moralis.transfer(options)
      const receipt = await transaction.wait()
      console.log("Receipt1", receipt);
      const hash = receipt.transactionHash;


      console.log(flipkartNFTAddress)
      let optionsNFT = {
        contractAddress: flipkartNFTAddress,
        functionName: 'mintProductNFT',
        abi: flipkartNFTAbi,
        params: {
          user_account: currentAccount,
          purchased_product_id: id,
          product_warranty_period: period,
          quantity: quant,
          transactionID: hash
        },
      }

      let transactionNFT = await Moralis.executeFunction(optionsNFT)
      const receiptNFT = await transactionNFT.wait()
      setIsLoading(false)
      console.log("Receipttt", receiptNFT);
      if (receiptNFT) {
        const res = userData[0].add('ownedAssets', {
          src: asset.src,
          quantity: quant,
          price: price,
          name: asset.name,
          createdAt: asset.createdAt,
          updatedAt: asset.updatedAt,
          purchaseDate: Date.now(),
          warrantyValid: true,
          transactionID: receipt.transactionHash,
          etherscanLink: `https://mumbai.polygonscan.com/tx/${receiptNFT.transactionHash}`,
        })

        await res.save().then(() => {
          alert("You've successfully purchased this asset!")
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const getOwnedAssets = async () => {
    try {
      // let query = new Moralis.Query('_User')
      // let results = await query.find()

      if (userData[0]) {
        setOwnedItems(prevItems => [
          ...prevItems,
          userData[0].attributes.ownedAssets,
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const warrantyUpdate = async(ID) => {
    try {
      let check = 0;
      if (userData[0]) {
        userData[0].attributes.ownedAssets.map((asset)=>{
          if(asset.transactionID === ID && asset.warrantyValid === true){
            asset.warrantyValid = false;
          }else if(asset.transactionID === ID && asset.warrantyValid === false){
            check = 1;
            return;
          }
        }, ID)
        if(check === 1){
          return;
        }
        const res = userData[0].set('ownedAssets', userData[0].attributes.ownedAssets);
        await res.save().then(() => {
          alert("Warranty done for", ID);
        })
      }
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <FlipkartContext.Provider
        value={{
            isAuthenticated,
            nickname,
            setNickname,
            username,
            handleSetUsername,
            assets,
            balance,
            setTokenAmount,
            tokenAmount,
            amountDue,
            setAmountDue,
            isLoading,
            setIsLoading,
            setEtherscanLink,
            etherscanLink,
            currentAccount,
            buyTokens,
            buyAsset,
            recentTransactions,
            ownedItems,
            warrantyUpdate
        }}
    >
        {children}
    </FlipkartContext.Provider>
  )


}

