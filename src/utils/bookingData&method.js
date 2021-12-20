import moment from "moment";

const bookingData = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2019-09-28 13:00:00",
        "endTime": "2019-09-28 14:00:00",
        "title": "Lunch with Petr"
    },
    {
        "id": 2,
        "roomId": "A101",
        "startTime": "2019-09-28 14:00:00",
        "endTime": "2019-09-28 15:00:00",
        "title": "Sales Weekly Meeting"
    },
    {
        "id": 3,
        "roomId": "A101",
        "startTime": "2019-09-28 16:00:00",
        "endTime": "2019-09-28 18:00:00",
        "title": "Anastasia Website Warroom"
    },
    {
        "id": 4,
        "roomId": "A101",
        "startTime": "2019-09-29 13:00:00",
        "endTime": "2019-09-29 14:00:00",
        "title": "One-on-One Session"
    },
    {
        "id": 5,
        "roomId": "A101",
        "startTime": "2019-09-29 16:00:00",
        "endTime": "2019-09-29 18:00:00",
        "title": "UGC Sprint Planning"
    },
    {
        "id": 6,
        "roomId": "A102",
        "startTime": "2019-09-30 09:00:00",
        "endTime": "2019-10-04 18:00:00",
        "title": "5-Day Design Sprint Workshop"
    },
    {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2019-09-19 09:00:00",
        "endTime": "2019-09-23 19:00:00",
        "title": "Thai Tech Innovation 2019"
    },
    {
        "id": 8,
        "roomId": "A101",
        "startTime": "2019-09-28 10:00:00",
        "endTime": "2019-09-28 13:00:00",
        "title": "Raimonland project"
    },
    {
        "id": 9,
        "roomId": "A102",
        "startTime": "2019-10-04 18:00:00",
        "endTime": "2019-10-04 20:00:00",
        "title": "Management Meetinng"
    },
    {
        "id": 10,
        "roomId": "A101",
        "startTime": "2019-10-04 14:00:00",
        "endTime": "2019-10-06 11:00:00",
        "title": "3-day workshop Corgi costume"
    }
]
export default bookingData;

export const checkAvailability = (bookingData, roomId, startTime, endTime) => {
    function compare(a, b) {
        if (a.startTime < b.startTime) {
            return -1;
        }
        if (a.startTime > b.startTime) {
            return 1;
        }
        return 0;
    }
    
    if (startTime >= endTime) return console.log('endTime must be greater than startTime')
    const filterRoomId = (bookingData.filter(item => item.roomId === roomId)).sort(compare)
    

    if (filterRoomId.length === 0) return console.log('Do not have room Id.')

    let isAvailable = false;
    if (startTime < filterRoomId[0].startTime && endTime <= filterRoomId[0].startTime) {
        isAvailable = true;
        console.log(isAvailable)
        return;
    }
    if (startTime >= filterRoomId[filterRoomId.length - 1].endTime) {
        isAvailable = true;
        console.log(isAvailable)
        return;
    }
    for (let i = 0; i < filterRoomId.length; i++) {
        if (startTime >= filterRoomId[i].endTime && endTime <= filterRoomId[i + 1].startTime) {
            isAvailable = true;
            break;
        }
        console.log(isAvailable, i)
    }
    console.log('isAvailable' + isAvailable)
}

export const getBookingsForWeek = (bookingData, roomId, dateBooking) => {
    function compare(a, b) {
        if (a.startTime < b.startTime) {
            return -1;
        }
        if (a.startTime > b.startTime) {
            return 1;
        }
        return 0;
    }

    const filterRoomId = (bookingData.filter(item => item.roomId === roomId)).sort(compare)

    if (filterRoomId.length === 0) return console.log('Do not have room Id.')
    console.log(filterRoomId)

    const year = moment(dateBooking).year()
    const month = moment(dateBooking).month()
    const date = moment(dateBooking).date()

    const thisWeekSunday = moment().year(year).month(month).date(date).set({'hour':0, 'minute':0, 'second':0}).weekday(0).format('YYYY-MM-DD HH:mm:ss')
    const nextWeekSunday = moment().year(year).month(month).date(date+7).set({'hour':0, 'minute':0, 'second':0}).weekday(0).format('YYYY-MM-DD HH:mm:ss')
    const next2WeekSunday = moment().year(year).month(month).date(date+14).set({'hour':0, 'minute':0, 'second':0}).weekday(0).format('YYYY-MM-DD HH:mm:ss')
    console.log('thisWeekSunday: ' + thisWeekSunday)
    console.log('nextWeekSunday: '+ nextWeekSunday)
    console.log('next2WeekSunday: '+ next2WeekSunday)
   

    let allBookingToday = []
    for (const i of filterRoomId) {
        if(moment(dateBooking).isSameOrAfter(i.startTime, 'day') && moment(dateBooking).isSameOrBefore(i.endTime, 'day')){
            allBookingToday.push(i)
        }    
    }

    let allBookingThisWeek = []
    for (const i of filterRoomId) {
        if(i.endTime > thisWeekSunday && i.startTime < nextWeekSunday){            
            allBookingThisWeek.push(i)
        }
    }

    let allBookingNextWeek = []
    for (const i of filterRoomId) {
        if(i.endTime > nextWeekSunday && i.startTime < next2WeekSunday){
            allBookingNextWeek.push(i)
        }
    }

    return {
        allBookingToday: allBookingToday,
        allBookingThisWeek: allBookingThisWeek,
        allBookingNextWeek: allBookingNextWeek,
    }
} 

