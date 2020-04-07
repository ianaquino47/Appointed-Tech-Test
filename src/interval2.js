const IntervalTree = require('interval-tree2');
let itree; 

function getOverlap(data) {
    let overlap, dates;

    overlap = [];

    //Change each date object to milliseconds
    Object.keys(data).forEach((key) => {
        data[key].map(el => {
            el.start = Date.parse(el.start);
            el.end = Date.parse(el.end);
        })
    })

    let finished = [];

    //Cycle per user
        //Compare Each interval to all intervals of other users
    Object.keys(data).forEach((keyA) => {
        //set center of tree
        itree = new IntervalTree(0);

        //add interval data onto the tree i.e. add interval datas of other users apart from current user
        Object.keys(data).forEach((keyB) => {
            if (keyB == keyA || finished.includes(keyB)) return;

            data[keyB].forEach(el => {
                itree.add(el.start, el.end);
            })            
        })

        //loop through intervals of current user
            //get overlapped intervals using current interval
            data[keyA].forEach(el => {
            let intervals = itree.rangeSearch(el.start, el.end)
            intervals.forEach(function(interval) {
                let startDate, endDate;
                startDate = Math.max(el.start, interval.start);
                endDate = Math.min(el.end, interval.end);
                if (startDate != endDate) {
                    overlap.push(`${new Date(startDate).toISOString()}/${new Date(endDate).toISOString()}`)
                }
            });
        })  

        finished.push(keyA);
    })

    //Filter to distinct entries
    let unique = overlap.filter( (value, index, self) => {
        return self.indexOf(value) === index;
    });
    
    return unique
}

module.exports = getOverlap;


