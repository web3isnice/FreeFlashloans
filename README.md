# Solana Flashloan Implementation

This project implements a USDC flashloan mechanism on Solana using Kamino Finance's kLend protocol for zero interest-rate.

## System Setup

```sh
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm 
sudo apt install npm
npm install -g n
n stable

# Install git
sudo apt install git -y
```

## Project Setup

```sh
# Clone the project (replace with your repo URL)
git clone https://github.com/web3isnice/FreeFlashloans.git
cd FreeFlashloans

# Install dependencies
npm install 
```

## Configuration

### Create keypair file:

```sh
# Create keypair.json
touch keypair.json

# Add your private key in JSON array format
# Example format: [1,2,3,...,32] or [1,2,3,...,64]
```

### Create .env file:

```sh
# Create .env file in project root
touch .env

# Add required configuration
KEYPAIR_PATH=/Absolute/path/to/keypair.json
USDC_TOKEN_ACCOUNT=<your-usdc-associated-token-account-address> 
RPC_ENDPOINT=https://api.mainnet-beta.solana.com 
```

### Start

```bash
npm start
# Then see transaction on solscan
```
