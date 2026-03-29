import { useLocation } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const titles = {
    "/": "Dashboard",
    "/predictions": "Predictions",
    "/analytics": "Analytics",
};

export default function Navbar({ onMenuClick }) {
    const { pathname } = useLocation();
    const title = titles[pathname] ?? "Dashboard";

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button
                    style={{ background: "none", border: "none", color: "#718096", fontSize: 22, display: "flex", alignItems: "center", marginRight: 4 }}
                    onClick={onMenuClick}
                    aria-label="Toggle menu"
                >
                    <MdMenu />
                </button>
                <span className="navbar-title">Crop Recommendation</span>
                <span className="navbar-breadcrumb">{title}</span>
            </div>
            <div className="navbar-right">
                <span className="navbar-badge">🌿 ML Powered</span>
                <div className="navbar-user">
                    <div className="user-avatar">A</div>
                    <span className="user-name">Admin</span>
                </div>
            </div>
        </header>
    );
}
