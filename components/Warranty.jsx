import React, { useContext, useState, useEffect} from 'react'
import { FlipkartContext } from '../context/FlipkartContext'

let check = 0;
const Warranty = ({ id, purTime, setCheck }) => {
    const { warrantyUpdate } = useContext(FlipkartContext)
    let time = Date.now();
    // let time = new Date().toLocaleString();
    // const [check, setCheck] = useState(0);
    const [curTime, setTime] = useState(time);
    async function fetchData() {
        if((purTime+120000) < curTime){
            warrantyUpdate(id);
            check = 1;
        }
    }
    if(check == 0){
        fetchData();
    }
    
    useEffect(() => {
        setInterval(() => {
          setTime(time);
        }, 5000)
      });

  return (
    <div>
    {
        purTime+120000 < curTime ? <div className='ml-20'>Warranty Over!!!</div>
        :
        <div className='ml-10'> Warranty time left - About {Math.floor((purTime+120000-curTime)/(1000*60*60))} h {Math.floor(((purTime+120000-curTime) - ((Math.floor((purTime+120000-curTime)/(1000*60*60))*1000*60*60)))/(1000*60))+1} mins</div>
    }
    </div>
  )
}

export default Warranty
