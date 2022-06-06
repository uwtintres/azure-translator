const DictionaryDriver = require('./dictionary-lookup-driver');

module.exports = function(RED) {
    function dictionaryLookup(config) {
        RED.nodes.createNode(this, config);
        this.on('input', async (msg) => {
            try {
                const options = {
                    requestArray: msg.payload || [],
                    toLan: config.toLan,
                    fromLan: config.fromLan,
                };

                const driver = new DictionaryDriver(this, this.credentials.key, this.credentials.region);

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

    RED.nodes.registerType("dictionary-lookup", dictionaryLookup, {
        credentials: {
            key: { type: 'password' },
            region: { type: 'text' }
        },
    });
}
