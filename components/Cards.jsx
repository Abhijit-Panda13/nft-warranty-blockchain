import React, { useState, useContext, useEffect } from 'react'
import Card from './Card'
import { FlipkartContext } from '../context/FlipkartContext'

const Cards = () => {
  const styles = {
    container: `h-full w-full flex flex-col ml-[20px] -mt-[0px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px] flex items-center justify-center`,
    cards: `flex items-center  flex-wrap gap-[80px]`,
  }
  const { assets } = useContext(FlipkartContext)
  console.log(assets);
  return (
    <div className={styles.container}>
      <div className={styles.title}>New Release</div>
      <div className={styles.cards}>
        <div className={styles.cards}>
          {assets.map((item, index) => {
            let asset = item.attributes

            return <Card id = {index} key={item.id} item={item.attributes} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Cards
