import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, DatePicker, Select, Button} from 'antd'
import moment from 'moment'

const FormGetBooking = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState('')

    const {Option} = Select;
    function onChange(date, dateString) {
        setDate(dateString)
    }
    const onFinish = (values) => {
        const {selectRoom, selectDate} = values
        if(selectRoom && selectDate){
            navigate(`booking?room=${selectRoom}&date=${moment(selectDate).format('YYYY-MM-DD')}`)
        }
    }

    return (
        <div style={{maxWidth:'500px', margin: 'auto', position:'relative', top: '10vh', overflowX:'hidden'}}>
            <div
            style={{backgroundColor: '#FFFFFF', maxWidth: '500px', margin: '0 10px'}}
            >
                <h6 style={{padding: '8px', color: 'Black', margin: 0, fontSize: 20, textAlign:'center'}}>
                    Select rooms and set the date
                </h6>
            </div>
            <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            style={{backgroundColor: 'white', maxWidth: '500px', padding: '15px 15px', margin: '0 10px'}}
            >
                <Form.Item
                label='Select a room'
                name='selectRoom'
                required
                initialValue="A101"
                >
                <Select>
                    <Option value="A101">A101</Option>
                    <Option value="A102">A102</Option>
                    <Option value="Auditorium">Auditorium</Option>
                </Select>
                </Form.Item>

                <Form.Item
                label='Set date'
                name='selectDate'
                required
                initialValue={moment('2019-09-28')}
                >
                    <DatePicker onChange={onChange} value={moment(date)}/>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                  style={{margin:0}}
                >
                    <Button type="primary" htmlType="submit"
                    >
                        see details
                    </Button>
                </Form.Item>
                
            </Form>
        </div>
    )
}

export default FormGetBooking

