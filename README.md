<u>Input</u>

 1. String

 2. Has to be read from a file

 3. ID _ @ _ [interval1, interval2, ... , intervaln]

 4. Structure of ISO8601

    <u>Example of an interval</u> 

    ​	2019-12-31T23:45:00.000-03:00/2020-01-01T10:30:00.000+06:00

    ​		2019-12-31 -->  YEAR-MONTH-DAY

    ​		T --> separator

    ​		23:45:00.000 --> 11:45 pm

    ​		-03:00 --> Time Zone Designator (3 hours behind UTC) so current time is the same as 		02:45:00.000Z

    ​	

<u>Output</u>			

 1. String

 2. Structure

    <u>Example</u>

    2020-01-01T00:15:00.000Z

    YEAR-MONTH-DAY T HOUR:MINUTE:SECONDS.000Z

