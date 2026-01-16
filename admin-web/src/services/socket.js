import { io } from "socket.io-client";

// WebSocket connection configuration
const SOCKET_URL = "http://localhost:5000";

// Create socket instance with auto-reconnect configuration
const socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    timeout: 20000,
});

// Connection status listeners
let connectionStatusCallbacks = [];

/**
 * Register a callback to be notified of connection status changes
 * @param {Function} callback - Function to call with connection status (true/false)
 * @returns {Function} Unsubscribe function
 */
export const onConnectionStatusChange = (callback) => {
    connectionStatusCallbacks.push(callback);

    // Immediately call with current status
    callback(socket.connected);

    // Return unsubscribe function
    return () => {
        connectionStatusCallbacks = connectionStatusCallbacks.filter(cb => cb !== callback);
    };
};

/**
 * Notify all registered callbacks of connection status change
 * @param {boolean} isConnected - Current connection status
 */
const notifyConnectionStatusChange = (isConnected) => {
    connectionStatusCallbacks.forEach(callback => {
        try {
            callback(isConnected);
        } catch (error) {
            console.error('Error in connection status callback:', error);
        }
    });
};

// Connection event handlers
socket.on('connect', () => {
    notifyConnectionStatusChange(true);
});

socket.on('disconnect', () => {
    notifyConnectionStatusChange(false);
});

socket.on('connect_error', () => {
    notifyConnectionStatusChange(false);
});

socket.on('reconnect', () => {
    notifyConnectionStatusChange(true);
});

socket.on('reconnect_attempt', () => {
    // Reconnection in progress
});

socket.on('reconnect_error', () => {
    // Reconnection error occurred
});

socket.on('reconnect_failed', () => {
    // Reconnection failed
});

/**
 * Get current connection status
 * @returns {boolean} True if connected, false otherwise
 */
export const isConnected = () => socket.connected;

/**
 * Manually disconnect the socket
 */
export const disconnect = () => {
    socket.disconnect();
};

/**
 * Manually connect the socket
 */
export const connect = () => {
    socket.connect();
};

export default socket;

