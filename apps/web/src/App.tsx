import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {
    RouterProvider,
    createRouter,
    createRootRoute,
    createRoute,
    Outlet,
    Link,
    redirect
} from '@tanstack/react-router'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
    component: () => (
        <AuthProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Outlet />
            </div>
        </AuthProvider>
    ),
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-4">My Golden Stack</h1>
            <p className="text-muted-foreground mb-8">
                Production-ready Monorepo Boilerplate.
            </p>
            <div className="flex gap-4">
                <Link to="/login" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
                    User Login
                </Link>
                <Link to="/admin/login" className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:opacity-90">
                    Admin Login
                </Link>
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 border border-input rounded hover:bg-accent hover:text-accent-foreground"
                >
                    Documentation
                </a>
            </div>
        </div>
    ),
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: Register,
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
    beforeLoad: () => {
        if (!localStorage.getItem('token')) {
            throw redirect({
                to: '/login',
            })
        }
    }
})

// --- Admin Routes ---

const adminLoginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/login',
    component: AdminLogin,
})

const adminDashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/dashboard',
    component: AdminDashboard,
    beforeLoad: () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
            throw redirect({ to: '/admin/login' })
        }

        const user = JSON.parse(userStr);
        if (user.role !== 'ADMIN') {
            throw redirect({ to: '/admin/login' })
        }
    }
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    dashboardRoute,
    adminLoginRoute,
    adminDashboardRoute
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
