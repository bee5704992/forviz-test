import React from 'react'
import {LeftOutlined} from '@ant-design/icons'
import Booking from '../components/Booking'
import { Link, useLocation } from 'react-router-dom'
import FormCheckFreeRoom from '../components/FormCheckFreeRoom'

const BookingPage = () => {
    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    return (
        <div className='div-bg-color'>
            <div className='flex' style={{justifyContent:'space-between'}}>
                <div style={{fontSize: 30, padding: 8, color: 'white', position: 'relative', top: '-6px'}}>
                    <Link to='/' style={{color: '#4D59A1', fontWeight: 'bold'}}><LeftOutlined /></Link>
                </div>
                <FormCheckFreeRoom room={query.get('room')} />
            </div>

            <div style={{padding: '0 0 5vh 0'}}>
                <Booking room={query.get('room')} date={query.get('date')} />
            </div>
        </div>
    )
}

export default BookingPage
