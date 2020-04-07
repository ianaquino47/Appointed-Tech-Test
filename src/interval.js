function findOverlap(data) {
    let array = [];
    let answer = [];
    
    Object.keys(data).forEach(function(key, index) {
        data[key].forEach(el => {
            let date = {};
            date['start'] = el.start;
            date['end'] = el.end;
            date['key'] = key;
            array.push(date)
        })
    })

    //sorts array of objects  
    array.sort((a, b) => (a.start > b.start) ? 1 : -1)

    let latest = array[0];
    let possibleInterval;
    for (let index = 0; index < array.length - 1; index++) {
        let start,end;

        if (array[index + 1].start < array[index].end) { //overlap between adjacent interval

            //get overlap
            start = (array[index].start > array[index + 1].start) ? array[index].start : array[index + 1].start; //takes the maximum of the 2 values
            end = (array[index].end < array[index + 1].end) ? array[index].end : array[index + 1].end; //takes the minimum

            
            if (!possibleInterval) {
                possibleInterval = {'start': start, 'end': end};
            }
        }

        //checks if checks if we can extend the current possibleInterval
        if (array[index + 1].start <= possibleInterval.end && possibleInterval.end < array[index + 1].end) {
            possibleInterval['end'] = (latest.end < array[index + 1].end) ? latest.end : array[index + 1].end
        } else if (possibleInterval.end < array[index + 1].start) {
            answer.push(possibleInterval);
            possibleInterval = null;
            // console.log('possible interval reset to null')
            if (array[index + 1].start < latest.end) {
                possibleInterval = {'start': array[index + 1].start, 'end': latest.end}
            } 
        }

        
        //updates latest = interval with the latest endTime so far on the iteration
        if (latest.end < array[index + 1].end) {
            latest = array[index + 1]
        }

        //on the last iteration, if possibleInterval exists, add to answers!
        if (possibleInterval &&  (index == array.length - 2)) {
            answer.push(possibleInterval);
        }
    }
    
    return answer;
}

module.exports = findOverlap;