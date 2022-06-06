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

    checkInputMode({ inputMode, imageFilePath, imageUrl }) {
        if (inputMode === this.INPUT_MODE.url ) {
            if (!imageUrl) throw new Error('imageUrl must not be empty');
        } else {
            if (!imageFilePath || !path.isAbsolute(imageFilePath)) throw new Error('Image file path must be a string of an absolute path to local file system');
        }
    }

    async analyze(options) {
        // Test input mode
        // this.checkInputMode(options);
        // Clean and check features for different services
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
