
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
                difference.textContent = `Logan is ${offset + 8} hours ahead of Santa Barbara time`;

                differenceb.textContent = `Logan is ${offset + 5} hours ahead of D.C.  time`;


                const now = new Date();
                const future = new Date(now.getTime() + (offset + 0) * (60 * 60));

                const time = future.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });

                console.log(`The time is: ${time}`);
                const loganTime = document.getElementById('loganTime');
                loganTime.textContent = `it is ${time} where he is`;

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


