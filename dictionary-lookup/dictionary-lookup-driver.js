const axios = require('axios').default;
const TranslatorBase = require('../utilties/translator-base');

class DictionaryLookupDriver extends TranslatorBase {

    constructor(node, key, region) {
        super(node, key, region);
        this.baseUrl = 'https://api.cognitive.microsofttranslator.com/dictionary/lookup';
    }

    preProcess(options) {
        if (!Array.isArray(options.requestArray)) throw new Error('msg.payload should be an array');
        if (!options.toLan) throw new Error('To language is required!');
        if (!options.fromLan) throw new Error('From language is required!');

        options.toLan = options.toLan.trim();
        options.fromLan = options.fromLan.trim();
        options.requestBody = options.requestArray
    }

    async analyzeInternal({ requestBody, toLan, fromLan, config }) {
        this.setStatus({ fill: 'green', shape: 'dot', text: 'Detecting' });
        const res = await axios.post(`${this.baseUrl}?api-version=3.0&from=${fromLan}&to=${toLan}`, requestBody, config);
        return res.data;
    }
}

module.exports = DictionaryLookupDriver;
