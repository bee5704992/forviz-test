import React,{useEffect} from 'react'
import bookingData,{ checkAvailability, getBookingsForWeek } from '../utils/bookingData&method'

const Booking = () => {
    useEffect(()=>{
        checkAvailability(bookingData, 'A101', '2019-10-06 20:00:00', '2019-10-06 22:00:00')
    
        console.log(getBookingsForWeek(bookingData, 'A101', '2019-09-28'))
    },[])


    return (
        <div>
            
        </div>
    )
}

export default Booking
