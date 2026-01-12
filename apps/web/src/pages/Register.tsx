import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../lib/api';
import { Link, useNavigate } from '@tanstack/react-router';

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await api.post('/auth/register', data);
            alert('Registration successful! Please wait for admin approval.');
            navigate({ to: '/login' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border">
                <h2 className="text-3xl font-bold text-center text-foreground">Register</h2>
                {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground">Name</label>
                        <input
                            {...register('name')}
                            className="w-full px-3 py-2 mt-1 border rounded-md bg-input text-foreground focus:ring-primary focus:border-primary"
                        />
                        {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                    </div>

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
                        className="w-full py-2 font-semibold text-primary-foreground bg-primary rounded-md hover:opacity-90 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Loading...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-sm text-center text-muted-foreground">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
