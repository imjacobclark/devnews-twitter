# devnews-twitter
Developer news twitter client

[Data provided by the devnews-core API](http://github.com/imjacobclark/devnews-core)

### Deploying via Docker
```shell
docker build -t devnews-twitter .
docker run -d --name devnews-twitter -e CON_KEY= -e CON_SEC= -e ACC_KEY= -e ACC_SEC= devnews-twitter
```
