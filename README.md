# NOTIFICATION SERVICE

## Getting started 
- ```npm start```

## LINT
- ```npm run lint```


## notes
- Code block started from index.js
- All models and DB schema in src/models folder
- Validation are into src/validators
- Controller code are in src/controllers
- Scheduler and job code is on src/jobs
- all helper functions are into scr/helpers
- Configuration are in config folder
- Currently i have assume we have all working code for third-party api and email is return with error for testing. 

## API to send notification
```
curl --location --request POST 'http://localhost:8692/api/v1/notification' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userIds": ["60aa2ed43dc30358ddd52ee9", "60aa2e173dc30358ddd52ee8"],
    "message": "hello this is notification from notiication service",
    "notificationTypes": ["SMS", "EMAIL"]
}'
```

- To insert user on DB with details
```
db.getCollection("user").insert([
    {
        "name": "parth",
        "email": "parth@gmail.com",
        "telephone": "987654321",
        "whatsAppNumber": "123456789",
        "slackId": "parth@slack.com",
        "isEmailSubscribed": true,
        "isSMSSubscribed": true,
        "isWhatsAppSubscribed": false,
        "isSlackSubscribed": false,
        "isDeleted": false
    }
])
```

- to change time for scheduler src/jobs/index.js > SCHEDULES array
