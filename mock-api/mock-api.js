module.exports = [
    {
        context: ['/api/v1'],
        target: 'http://172.25.102.32:8080/',
        pathRewrite: {'^/api/v1': '/rest/api'},
    },
    //{
    //    bypass: (req, res) => {
    //        if(req.url !== '/api/v1/test') return '/index.html';
    //
    //        res.json(require('./api-test.json'));
    //    }
    //}
];