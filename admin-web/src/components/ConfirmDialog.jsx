import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", isLoading = false }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-sm md:text-base text-gray-700">{message}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px] order-1"
                    >
                        {isLoading && <LoadingSpinner size="sm" />}
                        {isLoading ? 'Deleting...' : confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px] order-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}
