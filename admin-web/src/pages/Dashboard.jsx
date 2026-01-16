import { useState, useEffect } from 'react';
import { Package, AlertTriangle, XCircle, Users, Bell } from 'lucide-react';
import KPICard from '../components/KPICard';
import KPICardSkeleton from '../components/KPICardSkeleton';
import { getKPIs } from '../services/api';
import socket from '../services/socket';
import { showError } from '../utils/toast';

export default function Dashboard() {
    const [kpis, setKpis] = useState({
        totalProducts: 0,
        lowStock: 0,
        outOfStock: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchKPIs = async () => {
        try {
            setLoading(true);
            const data = await getKPIs();
            setKpis(data);
        } catch {
            showError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleDataUpdate = () => {
        // Refetch KPIs when any relevant event occurs
        fetchKPIs();
    };

    useEffect(() => {
        fetchKPIs();

        // Listen for WebSocket events that affect KPIs
        socket.on('stockUpdated', handleDataUpdate);
        socket.on('productCreated', handleDataUpdate);
        socket.on('productDeleted', handleDataUpdate);
        socket.on('userCreated', handleDataUpdate);
        socket.on('userUpdated', handleDataUpdate);
        socket.on('userDeleted', handleDataUpdate);

        // Cleanup listeners on unmount
        return () => {
            socket.off('stockUpdated', handleDataUpdate);
            socket.off('productCreated', handleDataUpdate);
            socket.off('productDeleted', handleDataUpdate);
            socket.off('userCreated', handleDataUpdate);
            socket.off('userUpdated', handleDataUpdate);
            socket.off('userDeleted', handleDataUpdate);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Administration Dashboard</h1> */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Administration Dashboard
                </h1>

                {/* Notification Icon */}
                <button
                    className="relative p-2 rounded-full hover:bg-gray-100 transition"
                    aria-label="Notifications"
                >
                    <Bell className="w-6 h-6 text-gray-700" />

                    {/* Notification Badge */}
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center 
                         w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
                        3
                    </span>
                </button>
            </div>

            {/* KPI Cards Grid - Responsive: 1 column (mobile), 2 columns (tablet), 4 columns (desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                {loading ? (
                    <>
                        <KPICardSkeleton />
                        <KPICardSkeleton />
                        <KPICardSkeleton />
                        <KPICardSkeleton />
                    </>
                ) : (
                    <>
                        <KPICard
                            title="Total Products"
                            value={kpis.totalProducts}
                            icon={Package}
                            color="bg-blue-600"
                        />
                        <KPICard
                            title="Low Stock"
                            value={kpis.lowStock}
                            icon={AlertTriangle}
                            color="bg-yellow-600"
                        />
                        <KPICard
                            title="Out of Stock"
                            value={kpis.outOfStock}
                            icon={XCircle}
                            color="bg-red-600"
                        />
                        <KPICard
                            title="Total Users"
                            value={kpis.totalUsers}
                            icon={Users}
                            color="bg-green-600"
                        />
                    </>
                )}
            </div>
        </div>
    );
}
