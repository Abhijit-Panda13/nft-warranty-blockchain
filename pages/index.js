import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ethers } from 'ethers'

const styles = {
  container: `h-full w-full flex bg-[#fff]`,
}

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Sidebar />
      <Main />
    </div>
  )
}
