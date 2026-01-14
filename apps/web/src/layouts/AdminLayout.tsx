import { Outlet } from '@tanstack/react-router';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <AdminHeader />
            <div className="flex-1 flex">
                <aside className="w-64 hidden md:block bg-background border-r">
                    {/* Sidebar acts as navigation, fixed height often useful or scrollable */}
                    <AdminSidebar className="border-none w-full" />
                </aside>
                <main className="flex-1 p-8 pt-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
