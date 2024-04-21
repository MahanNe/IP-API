const express = require('express');
const app = express();
const cors = require('cors');
const useragent = require('useragent');

const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(cors());

app.get('/app', (req, res) => {
    const ipString = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.ip;
    const ipType = ipString.includes(':') ? 'IPv6' : 'IPv4';
    const isBehindProxy = req.headers['x-forwarded-for'] ? true : false;

    const userAgent = useragent.parse(req.headers['user-agent']);

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

    const responseObject = {
        ipString: ipString,
        ipType: ipType,
        device: device,
        isBehindProxy: isBehindProxy,
        browser: userAgent.family,
    };

    res.json(responseObject);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
