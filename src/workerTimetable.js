const fs = require('fs'); 
// const getOverlap = require('./interval2')
const findOverlap = require('./interval')
// var IntervalTree = require('interval-tree2');

let input;

try {
    input =  fs.readFileSync('./input.txt', 'utf8');
} catch (error) {
    console.log(error)
}

function workerTimetable(str) {
    const data = {};
    
    function getIntervalsPerUser(str) {
        let arr = str.split(/\r?\n/);

        arr.forEach(element => {
            let userID, intervalArray, userData, dateObjects;

            userData = element.split('@'); //['1','[2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00,202 0-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00]'] 
            userID = userData[0];
            intervalArray = userData[1].slice(1,-1).split(','); //removes the brackets and splits string into an array using the comma
            dateObjects = intervalArray.map(function(el) {  //uses the getIntervalData function to turn the strings into a date object with start and end
                return getIntervalData(el)
            })
            
            data[userID] = dateObjects;  
        });

        //Sorts dates by start
        Object.keys(data).forEach(function(key) {
            data[key].sort((a, b) => (a.start > b.start) ? 1 : -1)
        })
    }

    function getIntervalData(str) { //sample input is '2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00'
        let times, startTime, endTime;

        times = str.split('/')
        startTime = new Date(times[0]);
        endTime = new Date(times[1])

        return {
            start: startTime,
            end: endTime
        }
    }

    function getTime(data, order) {
        let array = []
        
        Object.keys(data).forEach(function(key) {
            data[key].forEach(el => {
                array.push(el[order])
            })
            
        });
        
        if (order === 'start') {
            console.log('The starting date and time (in UTC) of the earliest interval where any of the workers are free is: ')
            console.log(array.sort()[0].toISOString());
            console.log('***************');
            return array.sort()[0].toISOString();
        } else if (order === 'end') {
            console.log('The ending date and time (in UTC) of the latest interval where any of the workers are free is: ')
            console.log(array.sort()[array.length - 1].toISOString());
            console.log('***************')
            return array.sort()[array.length - 1].toISOString();
        } 
    }        

    function displayOverlaps() {
        intervals = findOverlap(data);

        console.log('The intervals of date and times (in UTC) where there are at least 2 workers free are: ')
        intervals.forEach(el => {
            console.log(`${el.start.toISOString()}/${el.end.toISOString()}`);
        })
        console.log('***************')
        return intervals;
    }

     
    //Turn data into an array separated by user then Within each user, determine the start and end dates of every interval
        getIntervalsPerUser(str);

    
    //Return starting data of earliest interval
        return {
            earliestStart: getTime(data, 'start'),
            latestEnd: getTime(data, 'end'),
            overlap: displayOverlaps(data),
            data: data
        }
}

let str = ('1@[2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00,2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00]' + '\n' +
'0@[2020-01-01T16:15:00.000+12:00/2019-12-31T18:30:00.000-10:00,2020-01-01T02:15:00.000+02:00/2020-01-01T13:30:00.000+12:00,2020-01-01T09:00:00.000+07:00/2020-01-01T00:30:00.000-03:00]' + '\n' +
'2@[2020-01-01T11:00:00.000+09:00/2020-01-01T00:30:00.000-03:00,2019-12-31T19:00:00.000-09:00/2019-12-31T22:45:00.000-06:00,2020-01-01T08:45:00.000+08:00/2019-12-31T14:15:00.000-11:00]')
// let str = ('1@[2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00,2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00]' + '\n' +
// '0@[2020-01-01T16:15:00.000+12:00/2019-12-31T18:30:00.000-10:00,2020-01-01T02:15:00.000+02:00/2020-01-01T13:30:00.000+12:00,2020-01-01T08:20:00.000+07:00/2020-01-01T00:30:00.000-03:00]' + '\n' +
// '2@[2020-01-01T11:10:00.000+09:00/2020-01-01T00:30:00.000-04:00,2019-12-31T19:00:00.000-09:00/2019-12-31T22:45:00.000-06:00,2020-01-01T08:45:00.000+08:00/2019-12-31T14:15:00.000-11:00]')


workerTimetable(str);

module.exports = workerTimetable;