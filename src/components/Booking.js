import React, { useEffect, useState } from 'react'
import moment from 'moment'
import bookingData, { checkAvailability, getBookingsForWeek } from '../utils/bookingData&method'
import {Timeline} from 'antd'

const Booking = ({room, date}) => {
    const [dataBooking, setDataBooking] = useState({})
    const [thisOrNextWeek, setThisOrNextWeek] = useState('this')

    useEffect(() => {
        setDataBooking(getBookingsForWeek(bookingData, room, date))
    }, [])

    const { allBookingThisWeek, allBookingNextWeek, allBookingThisMonth, allBookingToday } = dataBooking

    let arrKeyThisWeek, arrKeyNextWeek, arrKeyThisMonth;
    if(allBookingThisWeek && allBookingNextWeek && allBookingThisMonth){
        arrKeyThisWeek = Object.keys(allBookingThisWeek)
        arrKeyNextWeek = Object.keys(allBookingNextWeek)
        arrKeyThisMonth = Object.keys(allBookingThisMonth)
    }

    function renderDate (item) {
        if(moment(date).add(-1,'day').format('YYYY-MM-DD') === item) return `Yesterday(${moment(item).format('ddd, DD MMM')})`
        if(date === item) return `Today(${moment(item).format('ddd, DD MMM')})`
        if(moment(date).add(1,'day').format('YYYY-MM-DD') === item) return `Tomorrow(${moment(item).format('ddd, DD MMM')})`

        return moment(item).format('ddd, DD MMM')
    }
    const renderAllBookingThisWeek = (
        (allBookingThisWeek && Object.keys(allBookingThisWeek).length === 0) ? 
        <div style={{textAlign:'center',marginTop:'30vh'}}>

            <p className='no-reserve' >There are no reservations for this period.</p>
        </div>
        : arrKeyThisWeek?.map((item, index) => (
            <div key={index}>
                <p className='roboto-700 date-r-panel'>{renderDate(item)}</p>
                <Timeline style={{paddingLeft: '5vw'}}>
                {
                    allBookingThisWeek[item].map((item2, index2) => (
                        <Timeline.Item key={index2} className={`tl-item-${index2 % 3}`}>
                            <p className='roboto-400 time-r-panel'>{
                                moment(item2.startTime).format('DD MM') !== moment(item2.endTime).format('DD MM') ? `${moment(item2.startTime).format('YYYY-MM-DD HH:mm')} - ${moment(item2.endTime).format('YYYY-MM-DD HH:mm')}`
                                : moment(item2.startTime).format('HH:mm') +' - '+ moment(item2.endTime).format('HH:mm')
                            }</p>
                            <p className='roboto-400 title-r-panel'>{item2.title}</p>
                        </Timeline.Item>
                    ))
                }
                </Timeline>
            </div>
        ))
    )
    const renderAllBookingNextWeek = (
        (allBookingNextWeek && Object.keys(allBookingNextWeek).length === 0) ? 
        <div style={{textAlign:'center',marginTop:'30vh'}}>

            <p className='no-reserve'>There are no reservations for this period.</p>
        </div>
        : arrKeyNextWeek?.map((item, index) => (
            <div key={index}>
                <p className='roboto-700 date-r-panel'>{renderDate(item)}</p>
                <Timeline style={{paddingLeft: '5vw'}}>
                {
                    allBookingNextWeek[item].map((item2, index2) => (
                        <Timeline.Item key={index2} className={`tl-item-${index2 % 3}`}>
                            <p className='roboto-400 time-r-panel'>{
                                moment(item2.startTime).format('DD MM') !== moment(item2.endTime).format('DD MM') ? `${moment(item2.startTime).format('YYYY-MM-DD HH:mm')} - ${moment(item2.endTime).format('YYYY-MM-DD HH:mm')}`
                                : moment(item2.startTime).format('HH:mm') +' - '+ moment(item2.endTime).format('HH:mm')
                            }</p>
                            <p className='roboto-400 title-r-panel'>{item2.title}</p>
                        </Timeline.Item>
                    ))
                }
                </Timeline>
            </div>
        ))
    )
    const renderAllBookingThisMonth = (
        (allBookingThisMonth && Object.keys(allBookingThisMonth).length === 0) ? 
        <div style={{textAlign:'center',marginTop:'30vh'}}>

            <p className='no-reserve'>There are no reservations for this period.</p>
        </div>
        : arrKeyThisMonth?.map((item, index) => (
            <div key={index}>
                <p className='roboto-700 date-r-panel'>{renderDate(item)}</p>
                <Timeline style={{paddingLeft: '5vw'}}>
                {
                    allBookingThisMonth[item].map((item2, index2) => (
                        <Timeline.Item key={index2} className={`tl-item-${index2 % 3}`}>
                            <p className='roboto-400 time-r-panel'>{
                                moment(item2.startTime).format('DD MM') !== moment(item2.endTime).format('DD MM') ? `${moment(item2.startTime).format('YYYY-MM-DD HH:mm')} - ${moment(item2.endTime).format('YYYY-MM-DD HH:mm')}`
                                : moment(item2.startTime).format('HH:mm') +' - '+ moment(item2.endTime).format('HH:mm')
                            }</p>
                            <p className='roboto-400 title-r-panel'>{item2.title}</p>
                        </Timeline.Item>
                    ))
                }
                </Timeline>
            </div>
        ))
    )

    const handleClick = (value) => {
        setThisOrNextWeek(value)
    }

    function renderRightPanel (thisOrNextWeek) {
        if(thisOrNextWeek === 'this') return renderAllBookingThisWeek
        if(thisOrNextWeek === 'next') return renderAllBookingNextWeek
        if(thisOrNextWeek === 'month') return renderAllBookingThisMonth
    }
    const renderLeftPanel = (
        <div className='l-content'>
            <p className='lato-700 upcoming-l-panel'>Upcoming</p>
            <h1 className='lato-300 d-week-l-panel'>{moment(date).format('dddd')}</h1>
            <h1 className='lato-300 d-month-l-panel'>{moment(date).format('DD MMM')}</h1>
            {
                allBookingToday?.length === 0 ? 
                <div>

                    <p className='no-reserve' style={{color: '#FFFFFF'}}>There are no reservations for this period.</p>
                </div>
                : allBookingToday?.map((item, index) => (
                    <div key={index}>
                        <p className='roboto-400 time-l-panel'>{moment(item.startTime).format('HH:mm') +' - '+ moment(item.endTime).format('HH:mm')}</p>
                        <p className='roboto-400 title-l-panel'>{item.title}</p>
                    </div>
                ))
            }
        </div>
    )

    const active = (value, className) => {
        if(thisOrNextWeek === value) return className
        return ''
    }

    return (
        <div>
            <div className='flex booking-container' style={{ justifyContent: 'center' }}>
                <div className='left-panel'>
                    <div className='sticky'>
                        <div className='flex' style={{ justifyContent: 'flex-end' }}>
                            <div className='l-header'>
                                    <h1 className='roboto-700 room-name'>
                                        {room}
                                    </h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex' style={{ justifyContent: 'flex-end' }}>
                    {
                        renderLeftPanel
                    }
                    </div>
                </div>
                <div className='right-panel'>
                    <div className='sticky'>
                        <div className='r-header'>
                            <div className='align-bottom'>
                            <div className={`btn-this-next-month ${active('this','active')}`} style={{position:'relative'}} onClick={()=> handleClick('this')}>THIS WEEK<div></div></div>
                            <div className={`btn-this-next-month ${active('next','active')}`} onClick={()=> handleClick('next')}>NEXT WEEK<div></div></div>
                            <div className={`btn-this-next-month ${active('month','active')}`} onClick={()=> handleClick('month')}>WHOLE MONTH<div></div></div>
                            </div>
                        </div>
                    </div>
                    
                    {
                        renderRightPanel(thisOrNextWeek)
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Booking
