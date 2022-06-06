const path = require('path');
const fs = require('fs');

class TranslatorBase {
    #node;
    #key;
    #region;

    constructor(node, key, region) {
        this.#node = node;
        this.#key = key;
        this.#region = region;
    }

    /*********** Abstract method ***********/

    preProcess() {
        throw new Error('preProcess() must be implemented');
    }

    async analyzeInternal() {
        throw new Error('analyzeInternal() must be implemented');
    }

    getRegion() {
        return this.#region;
    }

    setStatus(status) {
        this.#node.status(status);
    }

    /*********** Concrete method ***********/
    async analyze(options) {
        // Construct the request header for different services
        this.preProcess(options);
        let config;
        config = {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Ocp-Apim-Subscription-Key": this.#key,
                "Ocp-Apim-Subscription-Region": this.#region,
            }
        }

        return this.analyzeInternal({
            ...options,
            config,
        });
    }

    async run(options) {
        try {
            return await this.analyze(options);
        } catch (e) {
            const message = e?.response?.data?.error?.message || e.message;
            throw new Error(message);
        }
    }
}

module.exports = TranslatorBase;
