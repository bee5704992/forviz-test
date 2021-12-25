import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../css/img-grid.css'

const FetchImg = () => {
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
                : img.map((item, index)=>(
                    <div className={index === img.length - 1 ? 'last-img' : ''} key={item.download_url}><img src={item.download_url} alt='' /></div>
                ))
            }
        </div>
        </div>
    )
}

export default FetchImg
