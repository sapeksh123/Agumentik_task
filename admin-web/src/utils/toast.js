import toast from 'react-hot-toast';


/**
 * @param {string} message - The success message to display
 * @param {object} options - Additional toast options
 */
export const showSuccess = (message, options = {}) => {
    return toast.success(message, {
        duration: 3000,
        ...options,
    });
};

/**
 * @param {string} message - The error message to display
 * @param {object} options - Additional toast options
 */
export const showError = (message, options = {}) => {
    return toast.error(message, {
        duration: 5000,
        ...options,
    });
};

/**
 * @param {string} message - The info message to display
 * @param {object} options - Additional toast options
 */
export const showInfo = (message, options = {}) => {
    return toast(message, {
        duration: 3000,
        icon: 'ℹ️',
        ...options,
    });
};

/**
 * @param {string} message - The loading message to display
 * @param {object} options - Additional toast options
 * @returns {string} Toast ID for dismissal
 */
export const showLoading = (message, options = {}) => {
    return toast.loading(message, options);
};

/**
 * @param {string} toastId - The ID of the toast to dismiss
 */
export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};


export const dismissAllToasts = () => {
    toast.dismiss();
};

/**
 * @param {Promise} promise - The promise to track
 * @param {object} messages - Object with loading, success, and error messages
 * @returns {Promise} The original promise
 */
export const showPromise = (promise, messages) => {
    return toast.promise(promise, {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Error occurred',
    });
};
