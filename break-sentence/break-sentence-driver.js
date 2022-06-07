const axios = require('axios').default;
const TranslatorBase = require('../utilties/translator-base');

class BreakSentenceDriver extends TranslatorBase {

    constructor(node, key, region) {
        super(node, key, region);
        this.baseUrl = 'https://api.cognitive.microsofttranslator.com/breaksentence';
    }

    preProcess(options) {
        if (!Array.isArray(options.requestArray)) throw new Error('msg.payload should be an array');
        options.language = options.language ? `&language=${options.language}` : '';
        options.script = options.script ? `&script=${options.script}` : '';
        options.requestBody = options.requestArray;
    }

    async analyzeInternal({ language, script, requestBody, config }) {
        this.setStatus({ fill: 'green', shape: 'dot', text: 'Detecting' });
        const res = await axios.post(`${this.baseUrl}?api-version=3.0${language}${script}`, requestBody, config);
        return res.data;
    }
}

module.exports = BreakSentenceDriver;
