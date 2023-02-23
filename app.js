const sbTime = document.getElementById('sbTime');
const loganTime = document.getElementById('loganTime');
const difference = document.getElementById('difference');
const differenceb = document.getElementById('differenceb');
const awake = document.getElementById('awake');
const disclaimer = document.getElementById('disclaimer');




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



                // set the content of the div to the field value
                difference.textContent = `${offset + 8} hours ahead of Santa Barbara`;

                differenceb.textContent = `${offset + 5} hours ahead of D.C.  time`;


                const timestamp = Date.now();
                const now = new Date(timestamp) // local time
                console.log(now)


                let sb = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour12: true, hour: "numeric", minute: "numeric" });

                console.log(`The sb time is: ${sb}`);

                // sbTime.textContent = `${sb}`;


                let logan = now.toLocaleString("en-US", { timeZone: data.zoneName, hour12: true, hour: "numeric", minute: "numeric" });
                console.log(`The logan time is: ${logan}`);


                loganTime.textContent = `${logan}`;









                const comparison = new Date(Date.now());
                comparison.setHours(now.getHours());
                comparison.setMinutes(now.getMinutes());

                const wakeup = new Date(Date.now());
                wakeup.setHours(10);
                wakeup.setMinutes(0);

                const bedtime = new Date(Date.now());
                bedtime.setHours(23);
                bedtime.setMinutes(59);



                console.log(wakeup)
                console.log(bedtime)
                console.log(comparison)
                console.log(wakeup <= comparison)
                console.log(comparison <= bedtime)
                console.log(wakeup <= comparison && comparison <= bedtime)

                if (wakeup <= comparison && comparison <= bedtime) {
                    awake.textContent = `Logan is probably awake`;
                    console.log('logan is probably awake')
                }
                else if(wakeup > comparison && comparison > bedtime) {
                    awake.textContent = `Logan is probably asleep`;
                    disclaimer.textContent = `this website and it's associates are not liable for injuries related to contacting Logan at the aforementioned hour`;
                    console.log('logan is probably asleep')
                }
                else {
                    awake.textContent = `Tell Logan his website is broken`;
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


