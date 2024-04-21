const express = require('express');
const app = express();
const cors = require('cors');
const useragent = require('useragent');

const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(cors());

app.get('/app', (req, res) => {
    // Get the IP address of the client
    const ipString = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.ip;
    const ipType = ipString.includes(':') ? 'IPv6' : 'IPv4';
    const isBehindProxy = req.headers['x-forwarded-for'] ? true : false;

    // Parse user agent string
    const userAgentString = req.headers['user-agent'];
    const userAgent = useragent.parse(userAgentString);

    // Determine the device type
    let device;
    if (userAgent.isDesktop) {
        device = 'Desktop';
    } else if (userAgent.isMobile) {
        device = 'Mobile';
    } else if (userAgent.isTablet) {
        device = 'Tablet';
    } else {
        device = 'Other';
    }

    // Construct response object
    const responseObject = {
        ipString: ipString,
        ipType: ipType,
        device: device,
        isBehindProxy: isBehindProxy,
        browser: userAgent.family,
    };

    // Send the response
    res.json(responseObject);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
