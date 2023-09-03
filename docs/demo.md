## React Flappy Bird Web3 Conversion Demo

### Introduction

This is a demo on how to use the [VS Code Asset Converter](https://github.com/rramjuttun/vscode-asset-converter) extension and the [IPFS Gateway Fetch](https://github.com/rramjuttun/asset-fetching) library. It involves modifying a basic Web2 React Flappy Bird game to use NFT assets and deploying it to IPFS for anyone to use. 

### Prerequisites
* VS Code with the Asset Converter extension installed
* Access to a IPFS node

### Setup
#### Base Game
Start by cloning and installing the base flappy bird game. This is a just a basic web game made using React.

```sh
git clone https://github.com/rramjuttun/react-flappy-bird.git
cd react-flappy-bird
npm install
```

The game can be started using `npm start`. 

#### Environment file
The VS Code extension requires a environment file to run. Create a `.env` file in the root level of the workspace (or wherever the location was changed to if the env location was changed in the settings) and include the following entries:
```sh
IPFS_API_ENDPOINT = ...  
ETH_NODE_URI = ...
PRIVATE_KEY = ...
```
For information about each entry see the [documentation](https://github.com/rramjuttun/vscode-asset-converter#environment-file). Note that if using the Infura IPFS service then `IPFS_API_KEY` and `IPFS_API_KEY_SECRET` are also required, as also explained in the documentation.

### Deploying to IPFS
IPFS supports website hosting natively. Run `npm run build` to create a production build for the game. Then, right-click on the `build` folder in the VS Code workspace and select `Upload to IPFS`. Confirm, and the folder will be deployed to IPFS. 

Follow the instructions in [project documentation](https://github.com/rramjuttun/react-flappy-bird#deployment) for more information on how to access the deployed game.

 
### Creating a NFT Collection
There are two choices of birds that can be used which are located in `src/assets/birds`. However, the colour of the bird can curently only be hard-coded in `src/game/sprite.js` by changing the following line.  

```js
import bird_img from '../assets/birds/bird1.png'
```
A better idea would to create a NFT collection to allow each player to *own* their own bird which used in the game.

#### Deploy Contract
To do so, right-click the `src/assets/birds` folder in the VS Code Workspace and select `Upload Folder and Deploy ERC721 Contract` Confirm, and a window to enter the constructor parameters will appear. Enter the collection name and symbol, as `baseuri` and `max` should already be filled. The contract will then be deployed. More information about constructor parameter selection can be found [here](https://github.com/rramjuttun/vscode-asset-converter#upload-folder-and-deploy-erc721-contract).

After the contract has been deployed, its information can be found in `src/assets/assets.json` (or wherever the location was changed to in the settings). 
```json
{
  "src/assets/birds": {
    "baseUri": "ipfs://ba...",
    "deployAddress": "0x..."
  }
}
```

#### Minting
Once the contract is deployed, minting can easily be done using Blockchain explorers (eg. PolygonScan) or Foundry. Simply call the `publicMint()` function using any method of choice. 

### Fetch game assets from NFT
Once the ERC721 contract has been deployed, all that is left is to modify the game to fetch these assets. This will be done by the IPFS Assets Service Worker. Begin by installing the package. 

```sh
npm install ipfs-gateway-fetch
```

Open `src/assets/sprite.js` and add the following import along with the rest of the import statements. 
```js
import { Gateway } from 'ipfs-gateway-fetch'
```

#### Create gateway instance
Create a Gateway instance to fetch the NFT assets. This instance requires three arguments, `location`, `accountAddress`, and `ethURI`. For more complex apps, you may need to implement a basic login system. To see an example of such a system using Web3Auth, see the [web3auth branch](https://github.com/rramjuttun/react-flappy-bird/tree/web3auth) of the Flappy Bird Repo.

However, for the simplicity of this demo, we will just use Metamask's `window.ethereum` instance for the user's public address and interacting with the blockchain. Add the following code to `sprite.js` after the import statements.

```js
const accountAddress = (await window.ethereum.request({method: "eth_requestAccounts"}))[0];
const gateway = new Gateway(window.location, accountAddress, window.ethereum);
```
#### Replace imports
The extension can attempt to automatically replace import statements to fetch from a gateway instead. It does this by using regular expressions to look for every import statement and checks if the path exists in the json file created when the contract was deployed.

Open the command window (Ctrl + Shift + P) and search for and select `Convert .png imports`. Enter the name of the Gateway instance and the import statement will be converted.

The converted import statement must be moved to come after the creation of the gateway instance. Move the line 
```js
let bird_img = await gateway.urlFromJsonEntry(assets, "src/assets/birds")
```

To come after the gateway instance creation. It should look like this
```js
const accountAddress = (await window.ethereum.request({method: "eth_requestAccounts"}))[0];
const gateway = new Gateway(window.location, accountAddress, window.ethereum);
let bird_img = await gateway.urlFromJsonEntry(assets, "src/assets/birds");
```

When the connected account does not own an NFT, the gateway will return `null`. To account for this case, add the following code after the code given above. This will give an alert message and refresh the page to try again. 
```js
if(!bird_img) {
  if(!alert('No NFT found for this account. Either mint/transfer an NFT to this account or switch to an account that owns one already. Press OK to refresh')){
    window.location.reload();
  }
}
```

### Finishing Up
#### Publishing to IPFS
The game is now ready to be deployed to IPFS. Instructions are given in the Deploying to IPFS section.

#### Running the game in a non-IPFS context
As is, the game will currently only work when being accessed from IPFS gateways. This is because IPFS Gateway Fetch uses relative URLs to access IPFS content as `window.location` was given as the gateway.

To test the game in a local server, or if publishing to a dedicated hosting server rather than IPFS, replace `window.location` with any IPFS gateway URI when creating the Gateway instance. For example,
```js
const gateway = new Gateway("https://ipfs.io", accountAddress, window.ethereum);
```
