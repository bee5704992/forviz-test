import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Booking from '../components/Booking'
import '../css/img-grid.css'

const Index = () => {
    const [img, setImg] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios('https://picsum.photos/v2/list',{
                method: 'GET'
            })
            if(res) setImg(res.data)
        }
        fetchData()
    },[])



    return (
        <div>
        <div className='gallery' style={{padding: '0 4%'}}>
            {
                img.length === 0 ? null 
                : img.map((item)=>(
                    <div style={{gridColumn:`span ${Math.round(150 * (item.width / item.height) / 25)}`}} key={item.download_url}><img src={item.download_url} alt='' /></div>
                ))
            }
        </div>

        <Booking/>
        </div>
    )
}

export default Index
