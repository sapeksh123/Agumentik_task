import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Users,
    Menu,
    X,
    LogOut
} from "lucide-react";
import { logout } from "../services/auth";

const navigationItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/inventory", label: "Inventory", icon: Package },
    { path: "/users", label: "Users", icon: Users },
];

export default function Sidebar({ isOpen, onToggle }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={onToggle}
                className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white shadow-lg lg:hidden hover:bg-gray-100"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                {/* Logo */}
                <div className="border-b border-gray-200 p-4 flex justify-center">
                    <img
                        src="/aglogofull.png"
                        alt="Logo"
                        className="h-24 object-contain"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        end={item.path === "/dashboard"}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) onToggle();
                                        }}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${isActive
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`
                                        }
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button (Bottom) */}
                <div className="border-t border-gray-200 p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3
              rounded-lg bg-red-50 text-red-600 hover:bg-red-100
              transition-all font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
