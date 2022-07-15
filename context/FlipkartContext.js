import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { flipkartAbi, flipkartCoinAddress } from '../lib/constants'
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

  useEffect(() => {
    async function fetchData() {
        if(isAuthenticated) {
            await getBalance()
            const currentUsername = await user?.get('nickname')
            setUsername(currentUsername);
            const account = await user?.get('ethAddress');
            setCurrentAccount(account);
        }
    }
    fetchData();
  }, [isAuthenticated, user, username, currentAccount, getBalance])

  useEffect(() =>{
    async function fetchData() {
        console.log(assetsData)
        await getAssets()
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
            buyTokens
        }}
    >
        {children}
    </FlipkartContext.Provider>
  )


}

