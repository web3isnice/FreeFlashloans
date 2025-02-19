import { BN } from '@project-serum/anchor';
import { flashLoan } from './usdcflashloan';
import { PublicKey, Keypair, Connection, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

function loadKeypairFromFile(path: string): Keypair {
    const keypairData = JSON.parse(fs.readFileSync(path, 'utf-8'));
    
    // Handle array of numbers
    if (Array.isArray(keypairData)) {
        return Keypair.fromSecretKey(Uint8Array.from(keypairData));
    }
    
    // Handle JSON object with secretKey field
    if (keypairData.secretKey) {
        return Keypair.fromSecretKey(Uint8Array.from(keypairData.secretKey));
    }
    
    throw new Error('Invalid keypair format');
}

async function main() {
    // Borrow a million USDC (6 decimals)
    const borrowAmount = new BN(1000000000000);

    // Load environment variables
    if (!process.env.KEYPAIR_PATH || !process.env.USDC_TOKEN_ACCOUNT || !process.env.RPC_ENDPOINT) {
        throw new Error('Missing required environment variables');
    }

    const payer = loadKeypairFromFile(process.env.KEYPAIR_PATH);
    console.log('Using account:', payer.publicKey.toBase58());
    
    const connection = new Connection(process.env.RPC_ENDPOINT, 'confirmed');
    const USDCtokenAccount = new PublicKey(process.env.USDC_TOKEN_ACCOUNT);

    const [borrowInstruction, repayInstruction] = await flashLoan(borrowAmount, payer, USDCtokenAccount);

    const message = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
        instructions: [borrowInstruction, repayInstruction],
    }).compileToV0Message();

    const transaction = new VersionedTransaction(message);
    transaction.sign([payer]);

    const sig = await connection.sendTransaction(transaction);
    console.log('Transaction signature:', sig);
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});