import { ConcordiumGRPCWebClient, AccountAddress } from '@concordium/web-sdk';

// Set up the Concordium GRPC client
const client = new ConcordiumGRPCWebClient('https://grpc.testnet.concordium.com', 20000);



/**
 * Fetch the balance of a wallet.
 * @param accountAddress - The Concordium account address as a string.
 * @returns The wallet balance in microCCD.
 */
export const getBalanceFromWallet = async (accountAddress: string): Promise<unknown> => {
    try {
        // Convert the account address string to an AccountAddress instance
        const parsedAddress = AccountAddress.fromBase58(accountAddress);

        // Fetch the account info
        const accountInfo = await client.getAccountInfo(parsedAddress);

        // Ensure account info and balance are available
        if (!accountInfo || !accountInfo.accountAmount) {
            throw new Error('Account information is unavailable.');
        }

        return accountInfo.accountAmount;
    } catch (error) {
        console.error('Error fetching wallet balance:', error);
        throw error;
    }
};
