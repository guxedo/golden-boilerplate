import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    status: string;
}

export function AdminUserList() {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/users');
            return response.data.data as User[];
        },
    });

    const approveMutation = useMutation({
        mutationFn: async (userId: string) => {
            await api.patch(`/users/${userId}/status`, { status: 'ACTIVE' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            alert('User approved!');
        },
        onError: () => {
            alert('Failed to approve user.');
        }
    });

    if (isLoading) return <div>Loading users...</div>;

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow mt-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Pending Approvals</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                        {data?.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {user.status === 'PENDING' && (
                                        <button
                                            onClick={() => approveMutation.mutate(user.id)}
                                            className="text-primary hover:text-primary/80"
                                            disabled={approveMutation.isPending}
                                        >
                                            {approveMutation.isPending ? 'Approvng...' : 'Approve'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
