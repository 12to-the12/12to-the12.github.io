
key = '3CD5N2DHC08I';
fetch('https://api.timezonedb.com/v2.1/get-time-zone?key='+key+'&format=json&by=zone&zone=Asia/Kolkata')
.then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Do something with the data
    console.log(data);
    const offset  = data.gmtOffset/(60*60); // UTC offset in hours

    const difference = document.getElementById('difference');

    // set the content of the div to the field value
    difference.textContent = ''+(offset+8)+' hours ahead of Santa Barbara time';

    const now = new Date();

    // Get the current time in Los Angeles
    const losAngelesTime = now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    console.log(`Los Angeles time: ${losAngelesTime}`);

    // Get the current time in Paris
    const parisTime = now.toLocaleString('en-US', { timeZone: 'Europe/Paris' });
    console.log(`Paris time: ${parisTime}`);

    // Create a table showing how the times in Los Angeles and Paris correspond
    console.table([
      { 'Time zone': 'Los Angeles', 'Time': losAngelesTime, 'Corresponding time in Paris': parisTime },
      { 'Time zone': 'Paris', 'Time': parisTime, 'Corresponding time in Los Angeles': losAngelesTime }
    ]);


    const b = document.getElementById('b');
    b.textContent = 55;
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
    console.error('there is an error happening Logan!');
  });