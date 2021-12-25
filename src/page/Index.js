import React from 'react'
import FormGetBooking from '../components/FormGetBooking'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className='div-bg-color'>
            <Link to="/fetchImg" style={{color:'blue',fontSize: 20, textDecoration: 'underline'}}>{'>>fetch img<<'}</Link>
            <FormGetBooking />
        </div>
    )
}

export default Index
