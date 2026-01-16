import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { onConnectionStatusChange } from '../services/socket';

/**
 * ConnectionStatus component displays the WebSocket connection status
 * Shows a green indicator when connected, red when disconnected
 */
export default function ConnectionStatus() {
    const [isConnected, setIsConnected] = useState(true);
    const [showDisconnected, setShowDisconnected] = useState(false);

    useEffect(() => {
        // Subscribe to connection status changes
        const unsubscribe = onConnectionStatusChange((connected) => {
            setIsConnected(connected);

            // Only show disconnected indicator if actually disconnected
            // Hide it after a brief moment when reconnected
            if (!connected) {
                setShowDisconnected(true);
            } else {
                // Delay hiding the indicator to show reconnection feedback
                setTimeout(() => setShowDisconnected(false), 2000);
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    // Don't show anything if connected and not in transition
    if (isConnected && !showDisconnected) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg
                    transition-all duration-300 ease-in-out
                    ${isConnected
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }
                `}
            >
                {isConnected ? (
                    <>
                        <Wifi className="w-5 h-5" />
                        <span className="text-sm font-medium">Connected</span>
                    </>
                ) : (
                    <>
                        <WifiOff className="w-5 h-5 animate-pulse" />
                        <span className="text-sm font-medium">Disconnected - Reconnecting...</span>
                    </>
                )}
            </div>
        </div>
    );
}
