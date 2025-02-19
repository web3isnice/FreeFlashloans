# Solana Flashloan Implementation

This project implements a flashloan mechanism on Solana using Kamino Finance's kLend protocol.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Solana wallet with SOL and USDC
- A USDC token account
- Access to a Solana RPC endpoint

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd solana-flashloan
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your details:
- `RPC_ENDPOINT`: Your Solana RPC endpoint
- `PRIVATE_KEY`: Your wallet's private key (as comma-separated numbers)
- `USDC_TOKEN_ACCOUNT`: Your USDC token account address

## Security Notice

⚠️ NEVER commit your `.env` file or share your private keys!
⚠️ Make sure your private key is properly secured and backed up.

## Running the Script

```bash
npm start
```
