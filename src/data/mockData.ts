import { Book, Author, User, Review } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel set in the summer of 1922, exploring themes of wealth, love, and the American Dream.',
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: [],
    approved: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A profound tale of racial injustice and childhood innocence in 1930s Alabama.',
    image: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: [],
    approved: true,
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel exploring themes of totalitarianism, surveillance, and individual freedom.',
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: [],
    approved: true,
    createdAt: '2024-01-17'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    image: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: [],
    approved: true,
    createdAt: '2024-01-18'
  }
];

export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'J.K. Rowling',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'British author best known for the Harry Potter series.',
    booksCount: 12
  },
  {
    id: '2',
    name: 'Stephen King',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'American author known for horror, supernatural fiction, and suspense.',
    booksCount: 64
  },
  {
    id: '3',
    name: 'Agatha Christie',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'English writer known for detective novels featuring Hercule Poirot.',
    booksCount: 66
  },
  {
    id: '4',
    name: 'Maya Angelou',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'American poet, memoirist, and civil rights activist.',
    booksCount: 36
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@bookhouse.com',
    role: 'admin',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    username: 'user1',
    email: 'user1@example.com',
    role: 'user',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    username: 'user2',
    email: 'user2@example.com',
    role: 'user',
    createdAt: '2024-01-11'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '2',
    bookId: '1',
    username: 'user1',
    rating: 5,
    comment: 'An absolute masterpiece! Fitzgerald\'s writing is both beautiful and haunting.',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    userId: '3',
    bookId: '2',
    username: 'user2',
    rating: 5,
    comment: 'A powerful story that remains relevant today. Harper Lee\'s storytelling is exceptional.',
    createdAt: '2024-01-21'
  }
];