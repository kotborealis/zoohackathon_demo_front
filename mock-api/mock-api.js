module.exports = [
    {
        context: ['/api/v1'],
        target: 'http://127.0.0.1:8081/',
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