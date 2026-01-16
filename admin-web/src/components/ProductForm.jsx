import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function ProductForm({ product, onSubmit, onCancel, isSubmitting }) {
    const [formData, setFormData] = useState(() => ({
        name: product?.name || '',
        stock: product?.stock?.toString() || '',
        price: product?.price?.toString() || '',
        description: product?.description || ''
    }));

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.stock.trim()) {
            newErrors.stock = 'Stock is required';
        } else if (isNaN(formData.stock) || Number(formData.stock) < 0) {
            newErrors.stock = 'Stock must be a non-negative number';
        }

        if (formData.price && (isNaN(formData.price) || Number(formData.price) < 0)) {
            newErrors.price = 'Price must be a non-negative number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Convert numeric fields
        const submitData = {
            name: formData.name.trim(),
            stock: Number(formData.stock),
            price: formData.price ? Number(formData.price) : undefined,
            description: formData.description.trim() || undefined
        };

        onSubmit(submitData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter product name"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
            </div>

            {/* Stock */}
            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.stock ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter stock quantity"
                />
                {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
            </div>

            {/* Price */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter price"
                />
                {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
            </div>



            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product description"
                />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px]"
                >
                    {isSubmitting && <LoadingSpinner size="sm" />}
                    {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px]"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
