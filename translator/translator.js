const TranslatorDriver = require('./translator-driver');

module.exports = function(RED) {
    function translator(config) {
        RED.nodes.createNode(this, config);
        this.on('input', async (msg) => {
            const BOOLEAN_FLAGS = {
                'yes': true,
                'no': false,
            };

            try {
                const options = {
                    requestArray: msg.payload || [],
                    toLan: config.toLan,
                    fromLan: config.fromLan,
                    textType: config.textType,
                    category: config.category,
                    profanityAction: config.profanityAction,
                    profanityMarker: config.profanityMarker,
                    includeAlignment:BOOLEAN_FLAGS[config.includeAlignment] || BOOLEAN_FLAGS['no'],
                    includeSentenceLength: BOOLEAN_FLAGS[config.includeSentenceLength] || BOOLEAN_FLAGS['no'],
                    suggestedFrom: config.suggestedFrom,
                    fromScript: config.fromScript,
                    toScript: config.toScript,
                    allowFallback: BOOLEAN_FLAGS[config.allowFallback] || BOOLEAN_FLAGS['no']
                };

                const driver = new TranslatorDriver(this, this.credentials.key, this.credentials.region);

                const res = await driver.run(options);

                this.status({});
                this.send({ payload: res });
            } catch (e) {
                // Clear status in the node
                this.status({});
                // Send error to catch node, original msg object must be provided
                this.error(e.message, msg);
            }
        });
    }

    RED.nodes.registerType("translator", translator, {
        credentials: {
            key: { type: 'password' },
            region: { type: 'text' }
        },
    });
}
