## Introduction
**azure-translator** is a collection of nodes that translation services from [Microsoft Azure Translation Services](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-overview).

### About us
The [Internet of Things Research (INTRES) Group](https://github.com/UWTINTRES)
at the University of Washington Tacoma (UWT) developed and maintains this package to promote Internet of Things (IoT) research and teaching. This package seeks to accelerate the adoption of IoT concepts by developing a simple mechanism to increase the productivity of researchers, software engineers, developers, and data scientists.

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

![Example flow](https://github.com/uwtintres/azure-translator/blob/main/img/flow.png?raw=true)

The function node contains the payload:

![Payload](https://github.com/uwtintres/azure-translator/blob/main/img/payload.png?raw=true)

The config of the translator node is as follows. In this example, the text will be translated to both es and it(separated by a comma).

![Config](https://github.com/uwtintres/azure-translator/blob/main/img/config.png?raw=true)

The output format is exactly from the official API document and is passed to the next node for further usage.

![Result](https://github.com/uwtintres/azure-translator/blob/main/img/result.png?raw=true)

#### Disclaimer
INTRES and UWT are not responsible for the usage or utilization of these packages. They are meant to promote IoT research and education. IoT service providers may require additional verification steps to utilize the features outlined in these packages. We are not in any way responsible for the misuse of these packages. For more details on the service agreement and terms, please click [here](https://azure.microsoft.com/en-us/support/legal/).
