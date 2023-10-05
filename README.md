# Link Shortener

Link Shortener is a simple URL shortening service that allows you to shorten long URLs into shorter, more manageable ones.

## Getting Started

To get started with the project, follow these steps:
## Deployment

Navigate to the project directory and install the required dependencies using npm:

```bash
  git clone https://github.com/chionye/link-shortener.git
```

This will clone the repo to your local machine

```bash
  npm install
```


Install the required dependencies for the project to work

```bash
  npm run test
```

This will run the tests. Ensure you run them while the server is running to allow the tests run properly

```bash
  docker build --pull --rm -f "Dockerfile" -t image-name .
```

Build the Docker image for the project using the provided Dockerfile. Replace image-name with your desired image name

```bash
  docker run --rm -d -p 7000:7000/tcp image-name
```

Run the Docker container based on the image you built in the previous step. This command maps port 7000 of your local machine to port 7000 of the container. Replace image-name with the image name you specified earlier


## API Reference

#### Encoding a URL

```http
  POST /encode
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` | **Required**. A valid url |

#### Decoding a URL

```http
  POST /decode
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url`      | `string` | **Required**. A valid shortened url |

```http
  GET /statistic/${slug}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none` | `none` |
