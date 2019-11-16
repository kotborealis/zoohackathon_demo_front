![Zoohackathon](https://amc.ru/wp-content/uploads/2019/09/zoohackathon-11-1024x256.jpg)

# zoohackathon-demo-front

Create `.env` with Mapbox public token:
```
MAPBOX_API_TOKEN=pk.#############
```

Set API adress in `mock-api/mock-api.js`:
```js
module.exports = [
    {
        context: ['/api/v1'],
        target: 'http://172.20.10.3:8080',
        pathRewrite: {'^/api/v1': '/rest/api'},
    }
];
```

Run webpack-dev-server:

```bash
npm i
npm run start
```
