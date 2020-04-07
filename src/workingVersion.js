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

    array.sort((a, b) => (a.start > b.start) ? 1 : -1)

    let latest = array[0];
    let possibleInterval;
    for (let index = 0; index < array.length - 1; index++) {
        let start,end;

        if (array[index + 1].start < array[index].end) { //overlap between adjacent interval
            // console.log('OVERLAP')
            //get overlap
            start = (array[index].start > array[index + 1].start) ? array[index].start : array[index + 1].start;
            end = (array[index].end < array[index + 1].end) ? array[index].end : array[index + 1].end;

            if (!possibleInterval) {
                possibleInterval = {'start': start, 'end': end};
            } 
    
            if(array[index + 1].start <= possibleInterval.end && possibleInterval.end < array[index + 1].end) {
                possibleInterval['end'] = (latest.end < array[index + 1].end) ? latest.end : array[index + 1].end
            }
            

            if (possibleInterval.end < array[index + 1].start) {
                answer.push(possibleInterval);
                possibleInterval = null;
                // console.log('possible interval reset to null')
                if (array[index + 1].start < latest.end) {
                    possibleInterval = {'start': array[index + 1].start, 'end': latest.end}
                } 
            }

            
        } else { //no overlap
            // console.log('NO OVERLAP')
            if (possibleInterval.end < array[index + 1].start) {
                answer.push(possibleInterval);
                possibleInterval = null;
                if (array[index + 1].start < latest.end) {
                    possibleInterval = {'start': array[index + 1].start, 'end': latest.end}
                } 
            } else {
                possibleInterval['end'] = (latest.end < array[index + 1].end) ? latest.end : array[index + 1].end
                console.log(possibleInterval)
            }
        }

    
        if (latest.end < array[index + 1].end) {
            latest = array[index + 1]
        }

        // console.log('LATEST' , latest)

        if (possibleInterval &&  (index == array.length - 2)) {
            answer.push(possibleInterval);
        }
        // console.log('*****************')
    }
    
    return answer;
}

module.exports = findOverlap;