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
    if(isAvailable){
        alert(`ํYou can booking at that time. (${startTime} - ${endTime})`)
    }else{
        alert(`You can't booking Because the room is full.`)
    }
}

export const getBookingsForWeek = (bookingData, roomId, dateToday) => {
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
    console.log('allBookingOfRoom',filterRoomId)

    const year = moment(dateToday).year()
    const month = moment(dateToday).month()
    const date = moment(dateToday).date()

    const thisWeekSunday = moment().year(year).month(month).date(date).set({'hour':0, 'minute':0, 'second':0}).weekday(0).format('YYYY-MM-DD')
    const nextWeekSunday = moment().year(year).month(month).date(date+7).set({'hour':0, 'minute':0, 'second':0}).weekday(0).format('YYYY-MM-DD')
    const next2WeekSunday = moment().year(year).month(month).date(date+14).set({'hour':0, 'minute':0, 'second':0}).weekday(0).format('YYYY-MM-DD')
    console.log('thisWeekSunday: ' + thisWeekSunday)
    console.log('nextWeekSunday: '+ nextWeekSunday)
    console.log('next2WeekSunday: '+ next2WeekSunday)

    let allBookingObj = {}
    
    const ExtractToDay = (i, obj, arr) => {

        const dateStartTime = moment(i.startTime).date()
        const monthStartTime = moment(i.startTime).month()
        const yearStartTime = moment(i.startTime).year()
    
        let date3 = i.startTime
        let x = 0
        while (moment(date3).set({'hour':0, 'minute':0, 'second':0}) <= moment(i.endTime).set({'hour':0, 'minute':0, 'second':0})) {
            date3 = moment().year(yearStartTime).month(monthStartTime).date(dateStartTime + x).set({'hour':0, 'minute':0, 'second':0})
            let dateKey = moment().year(yearStartTime).month(monthStartTime).date(dateStartTime + x).set({'hour':0, 'minute':0, 'second':0}).format('YYYY-MM-DD')
            obj[`${dateKey}`] = arr.filter(item => {       
                return (
                    moment(date3).format('MM DD') >= moment(item.startTime).format('MM DD')
                    && moment(date3).format('MM DD') <= moment(item.endTime).format('MM DD')
                )
            })
            x = x + 1   
        }
    }
 
    for (const i of filterRoomId) {
        ExtractToDay(i, allBookingObj, filterRoomId)
    }

    let allBookingToday = []
    for (const i of filterRoomId) {
        if(moment(dateToday).isSameOrAfter(i.startTime, 'day') && moment(dateToday).isSameOrBefore(i.endTime, 'day')){
            allBookingToday.push(i)
        }    
    }

    let allArrKey = Object.keys(allBookingObj)

    let arrKeyThisWeek = []
    for (const i of allArrKey) {
        if(i >= thisWeekSunday && i < nextWeekSunday){            
            arrKeyThisWeek.push(i)
        }     
    }
    let arrKeyNextWeek = []
    for (const i of allArrKey) {
        if(i >= nextWeekSunday && i < next2WeekSunday){
            arrKeyNextWeek.push(i)
        }
    }
    let arrKeyThisMonth = []
    for (const i of allArrKey) {
        if(moment(i).isSame(dateToday, 'month')){
            arrKeyThisMonth.push(i)
        }
    }

    let allBookingThisWeekObj = {}
    for(const i of arrKeyThisWeek){
        allBookingThisWeekObj[i] = allBookingObj[i]
    }
    let allBookingNextWeekObj = {}
    for(const i of arrKeyNextWeek){
        allBookingNextWeekObj[i] = allBookingObj[i]
    }
    let allBookingThisMonthObj = {}
    for(const i of arrKeyThisMonth){
        allBookingThisMonthObj[i] = allBookingObj[i]
    }

    return {
        allBookingToday: allBookingToday,
        allBookingThisWeek: allBookingThisWeekObj,
        allBookingNextWeek: allBookingNextWeekObj,
        allBookingThisMonth: allBookingThisMonthObj,
        //allBooking: allBookingObj
    }
}

