//configure our api endpoints
const uriBase = (process.env.NODE_ENV !== 'production' ? (
    'http://localhost:3000/'
) : (
    ' '
))

const apiVer = 'api/v1/'