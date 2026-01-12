import { useAuth } from '../context/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { AdminUserList } from '../components/AdminUserList';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate({ to: '/admin/login' });
    };

    return (
        <div className="min-h-screen bg-background p-8 border-t-8 border-destructive">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">System Administration</h2>
                    <div className="space-y-2">
                        <p className="text-muted-foreground">Admin: <span className="text-foreground font-medium">{user?.email}</span></p>
                    </div>

                    <div className="mt-6">
                        <AdminUserList />
                    </div>
                </div>
            </div>
        </div>
    );
}
