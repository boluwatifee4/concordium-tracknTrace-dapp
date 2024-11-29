import { Routes, Route } from 'react-router-dom';
import { Explorer } from '../components/features/Explorer/Explorer';
import { AdminCreateItem } from '../components/features/Admin/AdminCreateItem';
import { AdminChangeRoles } from '../components/features/Admin/AdminChangeRoles';
import { ChangeItemStatus } from '../components/features/Admin/ChangeItemStatus';
import { AddTransitionRule } from '../components/features/Rules/AddTransitionRule';
import { ProtectedRoute } from './ProtectedRoute';
import { useWallet } from '../context/WalletConnect.tsx';
import { useEffect } from 'react';

export const AppRoutes = () => {
    const { connection, account, activeConnectorError } = useWallet();

    useEffect(() => {
    }, [connection, account, activeConnectorError]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Explorer />} />
            <Route path="/explorer" element={<Explorer />} />

            {/* Protected Routes */}
            <Route
                path="/adminCreateItem"
                element={
                    <ProtectedRoute>
                        <AdminCreateItem
                            connection={connection}
                            accountAddress={account}
                            activeConnectorError={activeConnectorError}
                        />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/adminChangeRoles"
                element={
                    <ProtectedRoute>
                        <AdminChangeRoles
                            connection={connection}
                            accountAddress={account}
                            activeConnectorError={activeConnectorError}
                        />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/changeItemStatus"
                element={
                    <ProtectedRoute>
                        <ChangeItemStatus
                            connection={connection}
                            accountAddress={account}
                            activeConnectorError={activeConnectorError}
                        />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/addTransitionRule"
                element={
                    <ProtectedRoute>
                        <AddTransitionRule
                            connection={connection}
                            accountAddress={account}
                            activeConnectorError={activeConnectorError}
                        />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
