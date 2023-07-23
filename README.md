# React Flappy Bird

This is a simple flappy bird implentation using React. Its main purpose is to demonstrate the [VS Code Asset Converter](https://github.com/rramjuttun/vscode-asset-converter) extension and the deployment of react apps to IPFS. 

## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

IPFS supports website hosting natively. To deploy the app to IPFS, simply run `npm run build` and upload the resulting `build` folder to IPFS using any method (CLI, webUI, etc..).

Access the app with the folder CID using any IPFS gateway. Example: `https://ipfs.io/<CID>`


## Acknowledgement
Most of the source code was taken from [code-projects.org](https://code-projects.org/flappy-bird-game-in-reactjs-with-source-code). It was updated with a few additional features and to use newer versions of react and react-sripts that support the [web3.js](https://web3js.readthedocs.io/en/v1.10.0/) library.
