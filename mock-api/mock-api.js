module.exports = [
    {
        context: ['/api/v1'],
        target: 'http://172.20.10.3:8080',
        pathRewrite: {'^/api/v1' : ''},
    },
];