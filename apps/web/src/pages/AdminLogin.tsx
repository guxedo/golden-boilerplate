import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { useNavigate } from '@tanstack/react-router';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await api.post('/auth/login', data);

            if (response.data.role !== 'ADMIN') {
                setError('Unauthorized: Admin access only.');
                return;
            }

            login(response.data.access_token, { email: data.email, id: response.data.sub, role: response.data.role });
            navigate({ to: '/admin/dashboard' });
        } catch (err: any) {
            if (err.response?.status === 403) {
                setError('Account pending approval or disabled.');
            } else {
                setError('Invalid credentials.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border border-l-4 border-l-destructive">
                <h2 className="text-3xl font-bold text-center text-foreground">Admin Portal</h2>
                {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground">Email</label>
                        <input
                            {...register('email')}
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-input text-foreground focus:ring-primary focus:border-primary"
                        />
                        {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-input text-foreground focus:ring-primary focus:border-primary"
                        />
                        {errors.password && <span className="text-xs text-destructive">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 font-semibold text-destructive-foreground bg-destructive rounded-md hover:opacity-90 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Loading...' : 'Admin Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
