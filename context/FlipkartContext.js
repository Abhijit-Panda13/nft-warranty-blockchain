import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const FlipkartContext = createContext()

export const FlipkartProvider = ({ children }) => {
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

  useEffect(() => {
    async function fetchData() {
        if(isAuthenticated) {
            const currentUsername = await user?.get('nickname')
            setUsername(currentUsername);
            console.log("Boom", username);
        }
    }
    fetchData();
  }, [isAuthenticated, user, username])

  useEffect(() =>{
    async function fetchData() {
        console.log(assetsData)
        await getAssets()
    }
    if(isWeb3Enabled){
        fetchData()
    }
    
  }, [isWeb3Enabled, assetsData, assetsDataIsLoading])

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

  return (
    <FlipkartContext.Provider
        value={{
            isAuthenticated,
            nickname,
            setNickname,
            username,
            handleSetUsername,
            assets
        }}
    >
        {children}
    </FlipkartContext.Provider>
  )


}