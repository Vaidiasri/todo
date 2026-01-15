import { useState, useCallback } from 'react';
import api from '../services/api';

export interface Todo {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    createdAt: string;
}

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTodos = useCallback(async (pageNum: number = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/todos?page=${pageNum}&limit=5`);
            setTodos(res.data.todos);
            setPage(res.data.page);
            setTotalPages(res.data.pages);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    }, []);

    const addTodo = async (title: string, description: string) => {
        try {
            await api.post('/todos', { title, description });
            fetchTodos(page); // Refresh current page
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to add todo');
        }
    };

    const updateTodo = async (id: string, updates: Partial<Todo>) => {
        try {
            await api.put(`/todos/${id}`, updates);
            fetchTodos(page);
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to update todo');
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await api.delete(`/todos/${id}`);
            fetchTodos(page);
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Failed to delete todo');
        }
    };

    return {
        todos,
        loading,
        error,
        page,
        totalPages,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        setPage: fetchTodos, // Alias for manual page change
    };
};
