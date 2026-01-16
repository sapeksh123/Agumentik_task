export default function KPICard({ title, value, icon, color }) {
    const Icon = icon;
    return (
        <div className="bg-white rounded-lg shadow p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-default">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
}
