
const sheetId = '1JzDy_C4Tss6PGfVfVBomcd42knABlTHPk7Zl_jrvPws';
const sheetName = 'Sheet1';

const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

console.log(url)

fetch(url)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        const latitude = data[0].latitude;
        const longitude = data[0].longitude;
        console.log(latitude)
        console.log(longitude)

        key = '3CD5N2DHC08I';
        fetch('https://api.timezonedb.com/v2.1/get-time-zone?key=' + key + '&format=json&by=position&lat=' + latitude + '&lng=' + longitude)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                // Do something with the data
                console.log(data);
                const offset = data.gmtOffset / (60 * 60); // UTC offset in hours

                const difference = document.getElementById('difference');
                const differenceb = document.getElementById('differenceb');

                // set the content of the div to the field value
                difference.textContent = `${offset + 8} hours ahead of Santa Barbara`;

                differenceb.textContent = `${offset + 5} hours ahead of D.C.  time`;


                const now = new Date();

               let formattedTime = now.toLocaleString("en-US", options, {timeZone: "America/Log_Angeles", hour12: true});

                const altered = new Date(now.getTime() + (offset + 0) * (60 * 60));

                const time = altered.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });

                console.log(`The time is: ${altered}`);
                
                

                var options = { hour12: true,  hour: 'numeric', minute: 'numeric' };
                fordisplay = altered.toLocaleString('en-US', options); //  24 hour
                
                const loganTime = document.getElementById('loganTime');
                loganTime.textContent = `${fordisplay}`;

                const wakeup = new Date();
                wakeup.setHours(10,0,0);

                const bedtime = new Date();
                bedtime.setHours(23,55,0);

                const awake = document.getElementById('awake');
                const disclaimer = document.getElementById('disclaimer');

                console.log(wakeup)
                console.log(bedtime)
                console.log(altered)

                if ( wakeup <= altered && altered <= bedtime ){
                    awake.textContent = `Logan is probably awake`;
                    console.log('logan is probably awake')
                }
                else {
                    awake.textContent = `Logan is probably asleep`;
                    disclaimer.textContent = `this website and it's associates are not liable for injuries related to contacting Logan at the aforementioned hour`;
                    console.log('logan is probably asleep')
                }

            })
            .catch(error => {
                // Handle any errors
                console.error(error);
                console.error('there is an error happening Logan!');
            });

    })
    .catch(error => {
        // Handle any errors
        console.error(error);
        console.error('there is an error happening Logan!');
    });


