import { BN } from '@project-serum/anchor';
import { flashLoan } from './usdcflashloan';
import { PublicKey, Keypair, Connection, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    // Borrow a million USDC (6 decimals)
    const borrowAmount = new BN(1000000000000);

    // Load environment variables
    if (!process.env.PRIVATE_KEY || !process.env.USDC_TOKEN_ACCOUNT || !process.env.RPC_ENDPOINT) {
        throw new Error('Missing required environment variables');
    }

    // Convert private key string to Uint8Array
    const privateKeyArray = process.env.PRIVATE_KEY.split(',').map(Number);
    const payer = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));

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