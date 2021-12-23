import React, { useEffect, useState } from 'react'
import moment from 'moment'
import bookingData, { checkAvailability, getBookingsForWeek } from '../utils/bookingData&method'
import '../css/booking.css'

const Booking = () => {
    const [dataBooking, setDataBooking] = useState({})
    const [thisOrNextWeek, setThisOrNextWeek] = useState('this')

    useEffect(() => {
        checkAvailability(bookingData, 'A101', '2019-10-06 20:00:00', '2019-10-06 22:00:00')

        setDataBooking(getBookingsForWeek(bookingData, 'Auditorium', '2019-09-19'))
    }, [])

    const { allBookingThisWeek, allBookingNextWeek } = dataBooking

    let arrKeyThisWeek, arrKeyNextWeek;
    if(allBookingThisWeek && allBookingNextWeek){
        arrKeyThisWeek = Object.keys(allBookingThisWeek)
        arrKeyNextWeek = Object.keys(allBookingNextWeek)
    }
    const renderAllBookingThisWeek = (
        arrKeyThisWeek?.map((item, index) => (
            <div key={index}>
                <p>{moment(item).format('ddd, DD MMM')}</p>
                {
                    allBookingThisWeek[item].map((item2, index2) => (
                        <div key={index2}>
                            <p>{
                                moment(item2.startTime).format('DD MM') !== moment(item2.endTime).format('DD MM') ? `${item2.startTime} - ${item2.endTime}`
                                : moment(item2.startTime).format('HH:mm:ss') +' - '+ moment(item2.endTime).format('HH:mm:ss')
                            }</p>
                            <p>{item2.title}</p>
                        </div>
                    ))
                }
            </div>
        ))
    )
    const renderAllBookingNextWeek = (
        arrKeyNextWeek?.map((item, index) => (
            <div key={index}>
                <p>{moment(item).format('ddd, DD MMM')}</p>
                {
                    allBookingNextWeek[item].map((item2, index2) => (
                        <div key={index2}>
                            <p>{
                                moment(item2.startTime).format('DD MM') !== moment(item2.endTime).format('DD MM') ? `${item2.startTime} - ${item2.endTime}`
                                : moment(item2.startTime).format('HH:mm:ss') +' - '+ moment(item2.endTime).format('HH:mm:ss')
                            }</p>
                            <p>{item2.title}</p>
                        </div>
                    ))
                }
            </div>
        ))
    )

    const handleClick = (value) => {
        setThisOrNextWeek(value)
    }


    return (
        <div>
            <div className='flex booking-container'>
                <div className='left-panel'>
                    <div className='flex' style={{ justifyContent: 'flex-end' }}>
                        <div className='l-header'>{'A101'}</div>
                    </div>
                    <p>Upcoming</p>
                    <h1>Monday</h1>
                    <h1>28 Sep</h1>
                </div>
                <div className='right-panel'>
                    <div className='r-header'>
                        <button onClick={()=> handleClick('this')}>THIS WEEK</button>
                        <button onClick={()=> handleClick('next')}>NEXT WEEK</button>
                    </div>
                    {
                        thisOrNextWeek === 'this' ? renderAllBookingThisWeek : renderAllBookingNextWeek
                    }

                </div>
            </div>
        </div>
    )
}

export default Booking
