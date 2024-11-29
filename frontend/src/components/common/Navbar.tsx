import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useWallet } from '../../context/WalletConnect.tsx';

export const Navbar = () => {
    const { account, connect, walletBalance } = useWallet();

    return (
        <div className="navbar">
            <div>
                Track And Trace:{' '}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace"
                >
                    Version 1.0.0
                </a>
                <br />
                Contract:{' '}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://testnet.ccdscan.io"
                >
                    Contract Info
                </a>
                <br />
                {
                    account && walletBalance !== undefined
                        ? `Balance: ${walletBalance} Ccd`
                        : ''
                }
            </div>
            <Link className="secondary" to="/explorer">
                Explorer
            </Link>
            <Link className="secondary" to="/changeItemStatus">
                Admin1
            </Link>
            <Link className="secondary" to="/adminCreateItem">
                Admin2
            </Link>
            <Link className="secondary" to="/adminChangeRoles">
                Admin3
            </Link>
            <Link className="secondary" to="/addTransitionRule">
                Admin4
            </Link>
            <Button
                variant="primary"
                id="account"
                disabled={!!account}
                onClick={connect}
            >
                {account ? `${account.slice(0, 5)}...${account.slice(-5)}` : 'Connect Wallet'}
            </Button>
        </div>
    );
};
