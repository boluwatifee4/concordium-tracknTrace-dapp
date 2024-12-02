import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { WalletConnectionProps as BaseWalletConnectionProps, useConnection, useConnect } from '@concordium/react-components';
import * as constants from '../constants';
import { getBalanceFromWallet } from '../services/wallet.service';
import { microCcdToCcd } from '../helpers/digits';

interface WalletConnectionProps extends BaseWalletConnectionProps {
    children: React.ReactNode;
}

interface WalletContextProps {
    account: string | undefined;
    connect: () => void;
    connection: ReturnType<typeof useConnection>['connection'];
    activeConnectorError: string | undefined;
    isConnected: boolean;
    walletBalance: number | undefined;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<WalletConnectionProps> = ({
    setActiveConnectorType,
    activeConnector,
    connectedAccounts,
    genesisHashes,
    children,
}) => {
    const { connection, setConnection, account = undefined } = useConnection(connectedAccounts, genesisHashes);
    const { connect } = useConnect(activeConnector, setConnection);
    const [walletBalance, setWalletBalance] = useState<number | undefined>(0);

    useEffect(() => {
        setActiveConnectorType(constants.BROWSER_WALLET);
    }, [setActiveConnectorType]);

    const fetchBalance = useCallback(async () => {
        if (account && connection) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const balance: any = await getBalanceFromWallet(account);
                const wallet_balance = microCcdToCcd(balance.microCcdAmount);
                setWalletBalance(wallet_balance);
            } catch (error) {
                console.error('Failed to fetch wallet balance:', error);
            }
        }
    }, [account, connection]);

    useEffect(() => {
        if (account) {
            fetchBalance(); // Automatically fetch balance when connected
        }
    }, [account, fetchBalance]);

    return (
        <WalletContext.Provider value={{ account, connect, connection, activeConnectorError: undefined, isConnected: !!account, walletBalance }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
