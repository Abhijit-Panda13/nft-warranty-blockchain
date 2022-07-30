import React, { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import { FlipkartContext } from '../context/FlipkartContext'
import Warranty from './Warranty'


const Transaction = ({ item }) => {
  const styles = {
    container: ` w-[45%] flex flex-col border-[#d6d7d9] border-2 rounded-lg shadow-lg`,
    top: `flex w-full h-[80px] bg-[#f0f1f3] p-[20px] pr-[80px] gap-[80px]`,
    topHeaderText: `text lg text-left flex items-center`,
    topHeaderEndText: `text lg flex items-center  flex-row p-[30px]`,
    content: `flex flex-col w-full h-[400px] gap-[20px] p-[20px] flex-1`,
    date: `text-xl font-bold`,
    item: `flex flex-row gap-[20px] w-full`,
    nameContainer: `flex flex-col justify-end`,
    itemName: `text-mg font-bold flex ml-[10px]`,
    buyAgainBtn: `bg-[#ffd713] font-bold rounded-full p-[10px] h-[40px] w-[200px] cursor-pointer text-[#3a2802] text-center mb-[5px] mt-[10px]`,
    etherscanBtn: `font-bold rounded-full h-[40px] w-[150px] cursor-pointer text-[#3a2802] text-center border-2 border-[#ffd713] flex justify-center items-center`,
  }
  let time = Date.now();
  // let time = new Date().toLocaleString();
  const [check, setCheck] = useState(0);
  const [cTime, setTime] = useState(time);
  // console.log(cTime);
  const { username } = useContext(FlipkartContext)
  
  return (
    <>
      {item.map((asset, index) => {
        return (
          <div className={styles.container} key={index}>
            <div className={styles.top}>
              <div className='flex w-full gap-[80px]'>
                <div className={styles.topHeaderText}>
                  ORDER PLACED <br />
                  {moment(asset.purchaseDate).format('MMMM Do YYYY')}
                </div>
                <div className={styles.topHeaderText}>
                  TOTAL <br />
                  {asset.price} SC
                </div>
                <div className={styles.topHeaderText}>
                  SHIP TO <br />
                  {username}
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.date}>
                Bought on {moment(asset.purchaseDate).format('MMMM Do')}
              </div>
              <div className={styles.item}>
                <Image
                  className='object-cover'
                  src={asset.src}
                  alt='item'
                  height={100}
                  width={100}
                />
                <div className={styles.nameContainer}>
                  <div className={styles.itemName}>{asset.name}</div><div className='relative left-60 bottom-7 font-bold'> Quantity - {asset.quantity}</div>
                  <div className='flex flex-row items-center justify-center gap-4'>
                    <div className={styles.buyAgainBtn}>Buy it Again</div>
                    <Link href={`${asset.etherscanLink}`}>
                      <a target='_blank' rel='noopener'>
                        <div className={styles.etherscanBtn}>PolygonScan</div>
                      </a>
                    </Link>
                  </div>
                  <div>
                  {asset.warrantyValid ?
                    <Warranty setCheck={setCheck} id = {asset.transactionID} purTime = {asset.purchaseDate}/>
                  :
                    <div className='ml-20'>Warranty Over!!!</div>
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Transaction
// {Math.floor((asset.purchaseDate-cTime)/1000)}
//  {(asset.purchaseDate+60-cTime) - ((asset.purchaseDate+60-cTime)/1000/60/60)*1000*60*60)}