import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FlipkartContext } from '../context/FlipkartContext'

import Transaction from '../components/Transaction'

const History = () => {
  const styles = {
    container: `h-full w-full flex bg-[#fff]`,
    main: `w-full h-full flex flex-col mt-[50px]`,
    tableContainer: `w-full h-full flex flex-col p-[100px] justify-center p-10`,
    pageTitle: `text-2xl font-bold text-left mt-[50px] mb-[30px]`,
    transactions: `flex gap-[50px] flex-row flex-wrap`,
  }
  const { ownedItems } = useContext(FlipkartContext)
  // useEffect(() => {
  //   console.log(ownedItems)
  // }, [])
  console.log(ownedItems);

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <Header />
        <div className={styles.tableContainer}>
          {ownedItems ? (
            <div>
            <div className={styles.pageTitle}>Purchase History</div>
                <div className={styles.transactions}>
                    {ownedItems.map((item, index) => {
                        return <Transaction key={index} item={item} index={index} />
                    })}
                </div>
          </div>
          ) : (
            <div className={styles.pageTitle}>No Purchase History</div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default History
