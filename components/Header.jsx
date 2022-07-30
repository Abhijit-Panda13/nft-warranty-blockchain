import React, { useContext, useState, useEffect } from "react";
import { CgMenuGridO } from "react-icons/cg";
import logo from "../assets/flipkart_full_logo.png";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { FlipkartContext } from "../context/FlipkartContext";
import { FaCoins } from "react-icons/fa";
// import {
//   ModalProvider,
//   Modal,
//   useModal,
//   ModalTransition,
// } from "react-simple-hook-modal";
// import "react-simple-hook-modal/dist/styles.css";
import BuyModal from "./BuyModal";
import Modal from 'react-modal';


Modal.setAppElement('#__next');

const Header = () => {
  let subtitle;
  
  const styles = {
    container: `h-[60px] w-full flex items-center gap-5 px-16`,
    logo: `flex items-center mr-[30px] cursor-pointer flex-1`,
    search: `p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-black`,
    searchInput: `bg-transparent focus:outline-none border-none flex-1 items-center flex`,
    menu: `flex items-center gap-6`,
    menuItem: `flex items-center text-md font-bold cursor-pointer`,
    coins: `ml-[10px]`,
  };

  

  const [modalIsOpen, setIsOpen] = useState(false);
  const { balance, buyTokens, getBalance } = useContext(FlipkartContext);
  // const { openModal, isModalOpen, closeModal } = useModal();
  const  openModal = () => {
    setIsOpen(true);
  }
  const afterOpenModal=()=> {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
  const closeModal=()=> {
    // console.log("Close It", modalIsOpen);
    // setIsOpen(false);
    window.location.reload();
  }
  // useEffect(() => { closeModal() }, [])
  
  
  return (
    // <ModalProvider>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src={logo}
            alt="flipkart"
            height={200}
            width={220}
            className="object-cover"
          />
        </div>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search Your Assets..."
            className={styles.searchInput}
          />
          <IoMdSearch fontSize={20} />
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>New Releases</div>
          <div className={styles.menuItem}>Featured</div>
          {balance ? (
            <div
              className={(styles.balance, styles.menuItem)}
              onClick={openModal}
            >
              {balance}
              <Image alt="supercoin logo" width = "23px" height = "23px" src="https://rukminim1.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" />
              <Modal 
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={styles}
                contentLabel="Example Modal" 
              >
                <BuyModal closeModal={closeModal} buyTokens={buyTokens}/>
              </Modal>
            </div>
          ) : (
            <div
              className={(styles.balance, styles.menuItem)}
              onClick={openModal}
            >
              0 <Image alt="supercoin logo" width = "23px" height = "23px" src="https://rukminim1.flixcart.com/lockin/32/32/images/super_coin_icon_22X22.png?q=90" />
              <Modal 
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={styles}
                contentLabel="Example Modal" 
              >
                <BuyModal close={closeModal} buyTokens={buyTokens}/>
              </Modal>
            </div>
          )}
          <CgMenuGridO fontSize={30} className={styles.menuItem} />
        </div>
      </div>
    // </ModalProvider>
  );
};

export default Header;
