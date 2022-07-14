import React, { useContext } from 'react'
import { FaCoins } from 'react-icons/fa'
import { FlipkartContext } from '../context/FlipkartContext'
import Image from 'next/image'

const Card = ({ item }) => {
  const styles = {
    cardContainer: `flex flex-col`,
    card: `h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#1363DF]`,
    cardTitle: `text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]`,
    price: `text-md font-bold flex justify-center`,
    coins: `ml-[10px]`,
  }
  
  return (
    <div
      className={styles.cardContainer}
    >
      <div className={styles.card}>
        <Image
          src={item.src}
          className='object-cover object-center'
          width={190}
          height={250}
        />
      </div>
      <div>
        <div className={styles.cardTitle}>{item.name}</div>
        <div className={styles.price}>
          {item.price} SC
          <Image alt="supercoin logo" width = "23px" height = "11px" src="https://rukminim1.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" />
        </div>
      </div>
    </div>
  )
}

export default Card
