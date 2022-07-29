import React, { useContext, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { FlipkartContext } from "../context/FlipkartContext";
import Image from "next/image";
// import increase from "../assets/increase.svg";
// import decrease from "../assets/decrease.svg";

const Card = ({ item, id }) => {
  const styles = {
    cardContainer: `flex flex-col`,
    card: `h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#1363DF]`,
    cardTitle: `text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]`,
    price: `text-md font-bold flex justify-center`,
    coins: `ml-[10px]`,
    buttons: `text-white pt-2 ml-8 text-md font-bold flex align-center justify-center bg-orange-400 h-[50px] w-[150px] rounded-xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow overflow-hidden border border-white shadow-xl  `,
    but: "inline mx-10",
    quantity_block: "inline ml-10",
    // buttons: `bg-black`,
  };
  const [product, setProductQuantity] = useState(0);
  const { buyAsset } = useContext(FlipkartContext);
  // console.log(id);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <Image
          src={item.src}
          className="object-cover object-center"
          width={190}
          height={250}
        />
      </div>
      <div>
        <div className={styles.cardTitle}>{item.name}</div>
        <div className={styles.price}>
          {item.price} SC
          <Image
            alt="supercoin logo"
            width="23px"
            height="11px"
            src="https://rukminim1.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90"
          />
        </div>
        <div className="quantity_block">
          {/* <img
            alt="decrease"
            className="action-icons"
            src={decrease}
            onClick={() => {
              setProductQuantity(product - 1);
            }}
          /> */}
          <svg
            className={styles.but}
            height="15pt"
            viewBox="0 0 512 512"
            width="15pt"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              product == 0
                ? setProductQuantity(0)
                : setProductQuantity(product - 1);
            }}
          >
            <path d="m256 512c-68.378906 0-132.667969-26.628906-181.019531-74.980469-48.351563-48.351562-74.980469-112.640625-74.980469-181.019531s26.628906-132.667969 74.980469-181.019531c48.351562-48.351563 112.640625-74.980469 181.019531-74.980469s132.667969 26.628906 181.019531 74.980469c48.351563 48.351562 74.980469 112.640625 74.980469 181.019531s-26.628906 132.667969-74.980469 181.019531c-48.351562 48.351563-112.640625 74.980469-181.019531 74.980469zm0-472c-119.101562 0-216 96.898438-216 216s96.898438 216 216 216 216-96.898438 216-216-96.898438-216-216-216zm110 195.980469h-220v40h220zm0 0" />
          </svg>
          <span className="quantity">{product}</span>

          <svg
            className={styles.but}
            height="15pt"
            viewBox="0 0 512 512"
            width="15pt"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setProductQuantity(product + 1);
            }}
          >
            <g>
              <g>
                <path
                  d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
			c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
			"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
			c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
			s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                />
              </g>
            </g>
          </svg>

          {/* <img
            alt="increase"
            className="action-icons"
            src={increase}
            onClick={() => {
              setProductQuantity(product + 1);
            }}
          /> */}

          {/* <button>Buy</button> */}
          <button
            className={styles.buttons}
            disabled={product == 0}
            onClick={() => buyAsset(product, item.price * product, item, id)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
