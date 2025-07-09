import React, { useState } from 'react';
import { Users, BookOpen, BarChart3, Settings } from 'lucide-react';
import UserTable from '../components/admin/UserTable';
import BookTable from '../components/admin/BookTable';
import { mockUsers, mockBooks } from '../data/mockData';
import { User, Book } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'books'>('users');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [books, setBooks] = useState<Book[]>(mockBooks);

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditBook = (book: Book) => {
    console.log('Edit book:', book);
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const handleApproveBook = (bookId: string) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, approved: true } : book
    ));
  };

  const handleRejectBook = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Books',
      value: books.length,
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Approvals',
      value: books.filter(book => !book.approved).length,
      icon: BarChart3,
      color: 'bg-yellow-500'
    },
    {
      title: 'Active Sessions',
      value: 12,
      icon: Settings,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage users, books, and system settings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('books')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'books'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Book Management
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'users' && (
            <UserTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          )}
          {activeTab === 'books' && (
            <BookTable
              books={books}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
              onApprove={handleApproveBook}
              onReject={handleRejectBook}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;