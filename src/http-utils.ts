const http = require('node:https');
const cfenv = require('cfenv');

const url = 'my326897.crm.ondemand.com';
const path = '/sap/c4c/odata/v1/c4codataapi/VisitCollection';


const oServices = cfenv.getAppEnv().getServices(); console.log(oServices);
const uaa_service = cfenv.getAppEnv().getService('xsuaa'); console.log(uaa_service);
const dest_service = cfenv.getAppEnv().getService('destSrv'); console.log(dest_service);
const sUaaCreds = dest_service.credentials.clientid + ":" + dest_service.credentials;

const post_options = {
    url: uaa_service.credentials.url + '/oauth/token',
    method: 'POST',
    headers: {
        'Authorization': 'Basic' + Buffer.from(sUaaCreds).toString('base64'),
        'Content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        'client_id': dest_service.credentials.clientid,
        'grant_type': 'client_credentials'
    }
}

const getCredentials = async () => {
    return new Promise((resolve) =>
    {http.request(post_options, function(response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('TOKEN: ' + JSON.parse(response.data).access_token);
    }
        
    )

    }
    )
}


const getCSRFToken = async () => {
 return new Promise((resolve) => 
    { http.request(
    { host : url,
        path: path,
        method: 'POST',
        headers: {"x-csrf-token": "fetch"}
    },
        function(response) {
            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + response.headers);
        }).end();
    });
};
        


export {getCSRFToken, getCredentials};
