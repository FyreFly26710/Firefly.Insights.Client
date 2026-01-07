import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/Routing/ProtectedRoute';
import { lazily } from 'react-lazily';
import { AgentLayout } from '@/layouts/AgentLayout';

const { Articles: AdminArticles } = lazily(() => import('@/features/admins/pages/Articles'));
const { Topics: AdminTopics } = lazily(() => import('@/features/admins/pages/Topics'));
const { Categories: AdminCategories } = lazily(() => import('@/features/admins/pages/Categories'));
const { AiModels: AgentAiModels } = lazily(() => import('@/features/agents/pages/AiModels'));
const { ExecutionLogs: AgentExecutionLogs } = lazily(() => import('@/features/agents/pages/ExecutionLogs'));
const { JobLogs: AgentJobLogs } = lazily(() => import('@/features/agents/pages/JobLogs'));
const { Generate: AgentGenerate } = lazily(() => import('@/features/agents/pages/Generate'));
const { ApiKeys: AgentApiKeys } = lazily(() => import('@/features/agents/pages/ApiKeys'));
export const protectedRoutes = [
    {
        path: '/admin',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <Outlet />
            </ProtectedRoute>
        ),
        children: [
            // { index: true, element: <div>Admin Dashboard</div> },
            { path: 'articles', element: <AdminArticles /> },
            { path: 'topics', element: <AdminTopics /> },
            { path: 'categories', element: <AdminCategories /> },
            { path: 'tags', element: <div>Tags Management</div> },
        ]
    },
    {
        path: '/agents',
        element: (
            <ProtectedRoute allowedRoles={['admin', 'user']}>
                <AgentLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <AgentExecutionLogs /> }, // Default view
            { path: 'execution-logs', element: <AgentExecutionLogs /> },
            { path: 'job-logs', element: <AgentJobLogs /> },
            { path: 'ai-models', element: <AgentAiModels /> },
            { path: 'api-keys', element: <AgentApiKeys /> },
            {
                path: 'agents',
                children: [
                    { path: 'generate', element: <AgentGenerate /> },
                ]
            },
        ]
    }
];