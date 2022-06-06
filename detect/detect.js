const DetectDriver = require('./detect-driver');

module.exports = function(RED) {
    function detect(config) {
        RED.nodes.createNode(this, config);
        this.on('input', async (msg) => {
            try {
                const options = {
                    requestArray: msg.payload || [],
                };

                const driver = new DetectDriver(this, this.credentials.key, this.credentials.region);

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

    RED.nodes.registerType("detect", detect, {
        credentials: {
            key: { type: 'password' },
            region: { type: 'text' }
        },
    });
}
