import {Linking} from 'react-native';
import qs from 'qs';
import {AsyncStorage} from 'react-native';

//get your API data
// yyyy-MM-ddTHH:mm:ss
export function getData(access_token, last_update_date, cb) {
    console.log("about to get data")
    console.log(access_token)
    console.log('https://api.fitbit.com/1/user/-/activities/list.json?afterDate='
        + last_update_date.split('.')[0].replace(/\s/g, '') + '&sort=asc&limit=20&offset=0')
    fetch(
        'https://api.fitbit.com/1/user/-/activities/list.json?afterDate='
        + last_update_date.split('.')[0].replace(/\s/g, '') + '&sort=asc&limit=20&offset=0',
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.activities.length == 0) {
            console.log("No recent activity")
            cb(0)
        } else {
            console.log("some activity")
            let calories = 0;
            data.activities.forEach(function(element) {
                console.log(element);
                calories += element.calories
            })
            console.log("Got calories " + calories)
            cb(calories)
        }
    })

    .catch((err) => {
        console.error('Error: ', err);
    });

}
