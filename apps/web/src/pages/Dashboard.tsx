import { useAuth } from '../context/AuthContext';
import { useNavigate } from '@tanstack/react-router';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate({ to: '/login' });
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Welcome back!</h2>
                    <div className="space-y-2">
                        <p className="text-muted-foreground">Email: <span className="text-foreground font-medium">{user?.email}</span></p>
                        <p className="text-muted-foreground">Role: <span className="text-foreground font-medium">{user?.role}</span></p>
                        <p className="text-muted-foreground">ID: <span className="text-foreground font-medium">{user?.id}</span></p>
                    </div>

                    <div className="mt-6 p-4 bg-muted/50 rounded border border-muted">
                        <p className="text-sm">You have successfully authenticated via JWT. This page is protected.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
