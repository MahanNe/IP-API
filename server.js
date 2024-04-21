const express = require('express');
const app = express();
const cors = require('cors');
const useragent = require('useragent');

const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(cors());

app.get('/app', (req, res) => {
    const ipString = req.headers['x-forwarded-for'] || req.ip;
    const ipNumeric = ipString.split('.').reduce((acc, octet, index) => acc + Number(octet) * Math.pow(256, 3 - index), 0);
    const ipType = ipString.includes(':') ? 'IPv6' : 'IPv4';
    const isBehindProxy = req.headers['x-forwarded-for'] ? true : false;

    const userAgent = useragent.parse(req.headers['user-agent']);

    const responseObject = {
        ipString: ipString,
        ipNumeric: ipNumeric,
        ipType: ipType,
        isBehindProxy: isBehindProxy,
        device: userAgent.device.toString(),
        os: userAgent.os.toString(),
        userAgent: userAgent.toString(),
        family: userAgent.family,
        versionMajor: userAgent.major,
        versionMinor: userAgent.minor,
        versionPatch: userAgent.patch,
        isSpider: userAgent.isSpider,
        isMobile: userAgent.isMobile,
        userAgentDisplay: userAgent.toAgent(),
        userAgentRaw: req.headers['user-agent'],
        userLanguages: req.headers['accept-language'].split(',')
    };

    res.json(responseObject);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
