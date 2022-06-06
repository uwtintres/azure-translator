const axios = require('axios').default;
const TranslatorBase = require('../utilties/translator-base');

class TranslatorDriver extends TranslatorBase {

    constructor(node, key, region) {
        super(node, key, region);
        this.baseUrl = 'https://api.cognitive.microsofttranslator.com/translate';
    }

    preProcess(options) {
        if (!Array.isArray(options.requestArray)) throw new Error('msg.payload should be an array');
        // Process toLan
        let toLan = options.toLan.trim().split(',');
        toLan = toLan.map(lan => `to=${lan}`);
        options.toLan = toLan.join('&');
        options.requestBody = options.requestArray;
        // Process fromLan
        options.fromLan = options.fromLan ? `&from=${options.fromLan}` : '';
    }

    async analyzeInternal({ requestBody,
                              toLan,
                              fromLan,
                              textType,
                              category,
                              profanityAction,
                              profanityMarker,
                              includeAlignment,
                              includeSentenceLength,
                              suggestedFrom,
                              fromScript,
                              toScript,
                              allowFallback,
                              config }) {
        this.setStatus({ fill: 'green', shape: 'dot', text: 'Detecting' });
        const res = await axios.post(`${this.baseUrl}?api-version=3.0${fromLan}&${toLan}&textType=${textType}&category=${category}&profanityAction=${profanityAction}&profanityMarker=${profanityMarker}&includeAlignment=${includeAlignment}&includeSentenceLength=${includeSentenceLength}&suggestedFrom=${suggestedFrom}&fromScript=${fromScript}&toScript=${toScript}&allowFallback=${allowFallback}`,
            requestBody,
            config);
        return res.data;
    }
}

module.exports = TranslatorDriver;
