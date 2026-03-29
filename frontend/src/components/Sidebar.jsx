import { NavLink } from "react-router-dom";
import { MdDashboard, MdOutlineScience, MdBarChart } from "react-icons/md";
import { GiWheat } from "react-icons/gi";

const links = [
    { to: "/", label: "Dashboard", icon: <MdDashboard /> },
    { to: "/predictions", label: "Predictions", icon: <MdOutlineScience /> },
    { to: "/analytics", label: "Analytics", icon: <MdBarChart /> },
];

export default function Sidebar({ open, onClose }) {
    return (
        <>
            {open && <div className="sidebar-overlay" onClick={onClose} />}
            <aside className={`sidebar${open ? " open" : ""}`}>
                <div className="sidebar-logo">
                    <span className="logo-icon"><GiWheat color="#4caf50" /></span>
                    <div className="logo-text">
                        CropAdvisor
                        <span>ML Dashboard</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="sidebar-label">Navigation</div>
                    {links.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                            onClick={onClose}
                        >
                            <span className="nav-icon">{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <p>v1.0 · DADV Mini Project</p>
                </div>
            </aside>
        </>
    );
}
