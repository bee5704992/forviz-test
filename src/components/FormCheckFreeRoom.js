import React,{useState} from 'react'
import {Form, Button, DatePicker} from 'antd'
import bookingData,{checkAvailability} from '../utils/bookingData&method';
import moment from 'moment';

const FormCheckFreeRoom = ({room}) => {
    const { RangePicker } = DatePicker;
    const [arrStartToEnd, setArrStartToEnd] = useState([])
    
    function onOk(value) {  
        if(value[0] !== null && value[1] !== null){
            let arr = [];
            for (const i of value) {
                arr.push(moment(i).set({second: 0}).format('YYYY-MM-DD HH:mm:ss'))
            }
            setArrStartToEnd(arr)
        }
    }

    function funcCheck(value) {
        if(value.length !== 0){
            const isAvailable = checkAvailability(bookingData, room, arrStartToEnd[0], arrStartToEnd[1])
            if(isAvailable){
                alert(`ํYou can booking at that time. (${arrStartToEnd[0]} - ${arrStartToEnd[1]})`)
            }else{
                alert(`You can't booking Because the room is full.`)
            }
        }
    }

    return (
            <Form
            style={{padding: 8}}
            >
                <Form.Item
                rules={[
                    {
                    required: true,
                    },
                ]}
                style={{margin: 0}}
                >
                    <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onOk={onOk}
                    style={{width: 200}}
                    />

                    <Button type="primary"
                    style={{marginLeft: 8}}
                    onClick={()=> funcCheck(arrStartToEnd)}
                    >
                        Check
                    </Button>

                </Form.Item>
            </Form>
    )
}

export default FormCheckFreeRoom
