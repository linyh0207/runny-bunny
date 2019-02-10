import {Linking} from 'react-native';
import qs from 'qs';
import {AsyncStorage} from 'react-native';

export function OAuth(cb) {

    // Listen to redirection
    // Linking.addEventListener('url', handleUrl);
    // function handleUrl(event){
    //     console.log(event.url);
    //     Linking.removeEventListener('url', handleUrl);
    //     const [, query_string] = event.url.match(/\#(.*)/);
    //     console.log(query_string);
    //
    //     const query = qs.parse(query_string);
    //     console.log(`query: ${JSON.stringify(query)}`);
    //
    //     AsyncStorage.setItem('@funnybunny:fitbit_access_token', query.access_token);
    //     cb(query.access_token)
    // }
    //
    //
    // // Call OAuth
    // const oauthurl = 'https://www.fitbit.com/oauth2/authorize?'+
    //     qs.stringify({
    //         client_id: '22DC2N',
    //         response_type: 'token',
    //         scope: 'heartrate activity activity profile sleep',
    //         redirect_uri: 'runnybunny://fit',
    //         expires_in: '31536000',
    //         //state,
    //     });
    // console.log(oauthurl);
    // Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));


    AsyncStorage.setItem('@funnybunny:fitbit_access_token', '1234');
    cb('1234')
}

//get your API data
// yyyy-MM-ddTHH:mm:ss
export function getData(access_token, last_update_date, cb) {
    console.log("about to get data")
    console.log(access_token)
    console.log('https://api.fitbit.com/1/user/-/activities/list.json?afterDate='
        + last_update_date.split('.')[0] + '&sort=asc&limit=20&offset=0')
    fetch(
        'https://api.fitbit.com/1/user/-/activities/list.json?afterDate='
        + last_update_date.split('.')[0] + '&sort=asc&limit=20&offset=0',
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
