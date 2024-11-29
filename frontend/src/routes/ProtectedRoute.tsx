import { Navigate } from 'react-router-dom';
import { useWallet } from '../context/WalletConnect.tsx';

interface Props {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { isConnected } = useWallet();

    // Redirect to home if the wallet is not connected
    if (!isConnected) {
        return <Navigate to="/" />;
    }

    return children;
};
