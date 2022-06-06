const axios = require('axios').default;
const TranslatorBase = require('../utilties/translator-base');

class DetectDriver extends TranslatorBase {

    constructor(node, key, region) {
        super(node, key, region);
        this.baseUrl = 'https://api.cognitive.microsofttranslator.com/detect';
    }

    preProcess(options) {
        if (!Array.isArray(options.requestArray)) throw new Error('msg.payload should be an array');
        options.requestBody = options.requestArray;
    }

    async analyzeInternal({ requestBody, config }) {
        this.setStatus({ fill: 'green', shape: 'dot', text: 'Detecting' });
        const res = await axios.post(`${this.baseUrl}?api-version=3.0`, requestBody, config);
        return res.data;
    }
}

module.exports = DetectDriver;
