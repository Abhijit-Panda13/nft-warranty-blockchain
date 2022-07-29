import React, { useContext, useState} from 'react'
import { FaCoins } from 'react-icons/fa'
import { FlipkartContext } from '../context/FlipkartContext'
import Image from 'next/image'
import increase from '../assets/increase.svg'
import decrease from '../assets/decrease.svg'

const Card = ({ item, id }) => {
  const styles = {
    cardContainer: `flex flex-col`,
    card: `h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#1363DF]`,
    cardTitle: `text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]`,
    price: `text-md font-bold flex justify-center`,
    coins: `ml-[10px]`,
    buttons: `bg-black`
  }
  const [product, setProductQuantity] = useState(0);
  const { buyAsset } = useContext(FlipkartContext)
  // console.log(id);
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
        <div className="quantity_block">
        <img
          alt="decrease"
          className="action-icons"
          src={decrease}
          onClick={() => { setProductQuantity(product-1) }}
        />
        <span className="quantity">
          {product}
        </span>

        <img
          alt="increase"
          className="action-icons"
          src={increase}
          onClick={() => { setProductQuantity(product+1) }}
        />

        <button className={styles.buttons} onClick={() => buyAsset(product, item.price*product, item, id)}>Buy</button>
      </div>
      </div>
    </div>
  )
}

export default Card
