import * as Sentry from '@sentry/node'
import dotenv from 'dotenv'

dotenv.config({
    quiet: true,
})
Sentry.init({
    dsn: 'https://4881673f91c6aa7a3143aed4eab19929@o4511577238994944.ingest.us.sentry.io/4511577250922496',
    dataCollection: {
        // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
        // userInfo: false,
        // httpBodies: [],
    },
    environment: process.env.NODE_ENV || 'development',
})
