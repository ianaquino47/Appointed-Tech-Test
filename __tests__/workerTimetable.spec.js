const workerTimetable = require("../src/workerTimetable");

describe("workerTimetable", () => {
    let str = ('1@[2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00,2020-01-01T07:15:00.000+07:00/2019-12-31T16:00:00.000-10:00]' + '\n' +
    '0@[2020-01-01T16:15:00.000+12:00/2019-12-31T18:30:00.000-10:00,2020-01-01T02:15:00.000+02:00/2020-01-01T13:30:00.000+12:00,2020-01-01T09:00:00.000+07:00/2020-01-01T00:30:00.000-03:00]' + '\n' +
    '2@[2020-01-01T11:00:00.000+09:00/2020-01-01T00:30:00.000-03:00,2019-12-31T19:00:00.000-09:00/2019-12-31T22:45:00.000-06:00,2020-01-01T08:45:00.000+08:00/2019-12-31T14:15:00.000-11:00]')

    test("it should return a string", () => {
        expect(typeof workerTimetable(str).earliestStart).toEqual('string');
    })

    test("it should return a starting date and time in UTC", () => {
        expect(workerTimetable(str).earliestStart.slice(-1)).toEqual('Z');
    })

    describe("Question 1: ", () => {
        test("the starting date and time (in UTC) of the earliest interval where any of the workers are free", () => {
            expect(workerTimetable(str).earliestStart).toEqual('2020-01-01T00:15:00.000Z')
        })
    })

    describe("Question 2: ", () => {
        test("the ending date and time (in UTC) of the latest interval where any of the workers are free", () => {
            expect(workerTimetable(str).latestEnd).toEqual('2020-01-01T04:45:00.000Z')
        })
    })

    describe("Question 3: ", () => {
        let obj = [ { start: new Date('2020-01-01T00:15:00.000Z'),
            end: new Date('2020-01-01T01:30:00.000Z')},
          { start: new Date('2020-01-01T02:00:00.000Z'),
            end: new Date('2020-01-01T03:30:00.000Z') },
          { start: new Date('2020-01-01T04:00:00.000Z'),
            end: new Date('2020-01-01T04:30:00.000Z') } 
        ]

        test("the intervals of date and times (in UTC) where there are at least 2 workers free", () => {
            expect(workerTimetable(str).overlap).toEqual(obj)
        })
    })
})


