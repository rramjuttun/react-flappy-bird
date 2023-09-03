# React Flappy Bird

This is a simple flappy bird implentation using React. Its main purpose is to demonstrate the [VS Code Asset Converter](https://github.com/rramjuttun/vscode-asset-converter) extension and the deployment of react apps to IPFS. 

A step-by-step demo of decentralizing the game with ownable assets can be found in [docs/demo.md](https://github.com/rramjuttun/react-flappy-bird/blob/main/docs/demo.md).

To see a version with a simple Blockchain login system, check out the [web3auth](https://github.com/rramjuttun/react-flappy-bird/tree/web3auth) branch. Note that for this version to work it must be built and deployed to IPFS - it will not work in localhost or dedicated servers. 


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

IPFS supports website hosting natively. To deploy the app to IPFS, simply run `npm run build` and upload the resulting `build` folder to IPFS using any method (CLI, webUI, etc..). If nothing has been changed in the code, the resulting V1 CID should be `bafybeib2iadwfus4qnjeebop4frndpxtmcicd5bpkrfozvjqun2g2augua`. 

Access the app with the folder CID using any IPFS gateway. \
Example: https://ipfs.io/ipfs/bafybeib2iadwfus4qnjeebop4frndpxtmcicd5bpkrfozvjqun2g2augua


## Acknowledgement
Most of the source code was taken from [code-projects.org](https://code-projects.org/flappy-bird-game-in-reactjs-with-source-code). It was updated with a few additional features and to use newer versions of react and react-sripts that support the [web3.js](https://web3js.readthedocs.io/en/v1.10.0/) library.
