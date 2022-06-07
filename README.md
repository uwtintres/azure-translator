## Introduction
**azure-translator** is a collection of nodes that translation services from [Microsoft Azure Translation Services](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-overview).

### Features:
These features are currently supported:
1. Detect language
2. Translation
3. Dictionary lookup

Most of the parameters of these nodes are supported. For more information about all the settings and output format, please refer to the individual node.

## Installation
`npm install @intres/azure-translator`
## Example usage of translator
The example flow is as follows:

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/example.png?raw=true)

In this example, The node will output the translation of the text.

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/response.png?raw=true)

The output format is exactly from the official API document and is passed to the next node for further usage.

## Example usage of read/get-read-result
The example flow is as follows:

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/read.png?raw=true)

The config of the read node is as follows:

![Read config](https://github.com/uwtintres/azure-computer-vision/blob/main/img/read-config.png?raw=true)

In this example, read node accepts an image url and will output another URL for further query as its msg.payload.

![url](https://github.com/uwtintres/azure-computer-vision/blob/main/img/operationurl.png?raw=true)

This url should be recorded and passed to get-read-result node as input. The reason why the returned url should be kept instead of being passed to get-read-result node directly is that
the reading process is usually not completed when the url is returned, and thus the result is not available. The url should be recorded and be used later. The time one should wait depends on the input file.
