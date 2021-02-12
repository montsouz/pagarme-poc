# Pagar.me PoC

A simple PoC that shows how to integrate Pagarme checkout to create transactions using React and Node.

## Running the application

First of all you need the API_KEY and ENCRYPTION_KEY that you get on Pagar.me

set the ENCRYPTION_KEY key on the client side

```env
ENCRYPTION_KEY=my-key
```

Then set the API_KEY on the server side

```
API_KEY=my-key
```

In order to start the client side of the application

```bash
cd client/my-app
yarn
yarn start
```

You should see something running on localhost:3000

To start the API

```bash
cd api
npm install
npm build:watch
npm start
```

The local API is running at localhost:9000

## Api reference

There is just only one endpoint.

- POST - /subscribe/:planId

Request body

```json
{
  "cardHash": "1234asd"
}
```
