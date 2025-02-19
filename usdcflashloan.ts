import { flashBorrowReserveLiquidity, flashRepayReserveLiquidity, ReserveLiquidity } from "@kamino-finance/klend-sdk";
import { BN } from "@project-serum/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";

export async function flashLoan(borrowAmount: BN, payer: Keypair, tokenAccount: PublicKey) {


// Assign addresses to variables based on their index
        const LENDING_PROGRAM_ID = new PublicKey("KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD"); //addresses[3]; // So1end...tMCpAo
                  const LENDING_MARKET_AUTHORITY = new PublicKey("9DrvZvyWh1HuAoZxvYWMvkf2XCzryCpGgHqrMjyDWpmo"); //addresses[2]; // Epa6Sy...fX2YJi
                  const LENDING_MARKET = new PublicKey("7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF"); //addresses[2]; // Epa6Sy...fX2YJi
                  const RESERVE_ADDRESS = new PublicKey("D6q6wuQSrifJKZYpR1M8R4YawnLDtDsMmWM1NbBmgJ59"); // addresses[0]; // FcMXW4...bt1wrs
                  const RESERVE_LIQUIDITY_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // addresses[0]; // FcMXW4...bt1wrs
                 // const solana_address = new PublicKey("So11111111111111111111111111111111111111112");
                  const SRC_LIQUIDITY_ADDRESS = new PublicKey("Bgq7trRgVMeq33yt235zM2onQ4bRDBsY5EWiTetF4qw6"); // addresses[1]; // 9wyWAg...WTnA5w
                  const USDCtokenAccount = new PublicKey("G8vY2SDWc6v58YfpxxDLYqdDLKTVB58R637dvVCy9kdJ");/// addresses[4]; //  YOUR_WSOL_ACCOUNT
                  const FEE_RECEIVER_ADDRESS = new PublicKey("BbDUrk1bVtSixgQsPLBJFZEF7mwGstnD5joA1WzYvYFX"); // addresses[5]; // 5wo1tF...PhvgC7
                  const REFERRER = new PublicKey("KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD"); // addresses[3]; // So1end...tMCpAo
                 // const myPublicKey = addresses[55]; //
                const sysvarInfo = new PublicKey("Sysvar1nstructions1111111111111111111111111");
                const tokenProgram = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");


    const borrowInstruction = flashBorrowReserveLiquidity(

        {
            liquidityAmount: borrowAmount,
        },
        {
            userTransferAuthority: payer.publicKey,
            lendingMarketAuthority: LENDING_MARKET_AUTHORITY,
            lendingMarket: LENDING_MARKET,
            reserve: RESERVE_ADDRESS,
            reserveLiquidityMint: RESERVE_LIQUIDITY_MINT,
            reserveSourceLiquidity: SRC_LIQUIDITY_ADDRESS,
            userDestinationLiquidity: tokenAccount,
            reserveLiquidityFeeReceiver: FEE_RECEIVER_ADDRESS,
            referrerTokenState: REFERRER,
            referrerAccount: REFERRER,
            sysvarInfo,
            tokenProgram,
        },
       LENDING_PROGRAM_ID

      );

    // Repay Instruction
    const repayInstruction = flashRepayReserveLiquidity(
        {
            liquidityAmount: borrowAmount,
            borrowInstructionIndex: 0,
        },
        {
            userTransferAuthority: payer.publicKey,
            lendingMarketAuthority: LENDING_MARKET_AUTHORITY,
            lendingMarket: LENDING_MARKET,
            reserve: RESERVE_ADDRESS,
            reserveLiquidityMint: RESERVE_LIQUIDITY_MINT,
            reserveDestinationLiquidity: SRC_LIQUIDITY_ADDRESS,
            userSourceLiquidity: tokenAccount,
            reserveLiquidityFeeReceiver: FEE_RECEIVER_ADDRESS,
            referrerTokenState: REFERRER,
            referrerAccount: REFERRER,
            sysvarInfo,
            tokenProgram,
        },
        LENDING_PROGRAM_ID
      );
      return [borrowInstruction, repayInstruction];
}


