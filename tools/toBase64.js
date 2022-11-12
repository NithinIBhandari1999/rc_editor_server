const fs = require('fs');

// Below is fake key, please enter your key to generate to BASE 64 format
const file = '-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgQCW0K9+Gse4ek/qfPbd9Kv3qIL9+iiKxQnfPYMF7O4odSiSsObC\njdAbzQzzZT4KeTD/hQ2ckCZVZkrq6HppAQknXhpUuMXxsTKEu81EmxE8XGywY+dh\nld8QFSx9kFAijLaSykL0dzwt/lrqfwKs5Mc55kM/arO6jk55z8RDPP0OlwIDAQAB\nAoGAQjAP9M4X/NRhIk35oetxVV11L7WL+WsELB84027qDoNsbQSKIbRPMwRIvMEf\n+0S4xktEcAOrbytXkcS5hD/aHeeazpXCaSTbehvwadfccfB9A1jwdhRFkUzxmGaj\nwMwAADrBwJBSQOkUCtGm5VfF1xxa1W9YUQqslDbw/pLOGPECQQDrYGvHz06NUVHs\nm2HDNTI8I9MphMtrMgJhRYtCUJNjBxiWCauxDMw2X8E/1cb20R7hnBYzB4d3sdz+\nGjKNjDCNAkEApAeFkc6KcEJnD68n0hbf4BpDDT4n+GiKTprepmXiy53RA5dDYTWD\nLqsJ3amfbjoLjBFUYkqFRJiHNmihzZKMswJAFCQkFO0AY8dZo02IiBO9QLgwEZVz\ncrDM01YIHJyYgBjTWcNqFbRqpRx8hOHeLLCoW9XncGZsiSmHJ5dGTCZ64QJAOKwM\nnxLgS+b1WrrmpDSZBwGr1wB5qN7dokjp0k3zbOxK0dXKRuTJPS+FChvX5KqTYMKA\nCDG9F7UnSkoeVTtj9wJAMvghhJ55/5lceFk0flAxgKKCGn3dxCkpGF/tscBo1RGO\nHbO0bRqOg4jE7rjgZfkWIjb3tybDpiKLz8Jubk1CLQ==\n-----END RSA PRIVATE KEY-----';

let content = Buffer.from(file).toString('base64');

fs.writeFile('./keyBase64.txt', content, err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});