export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  avatar?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  rating: number;
  reviews: Review[];
  approved: boolean;
  createdAt: string;
}

export interface Author {
  id: string;
  name: string;
  image: string;
  description: string;
  booksCount: number;
}

export interface Review {
  id: string;
  userId: string;
  bookId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// export interface AuthContextType {
//   user: User | null;
//   islogin: (email: string, password: string) => Promise<boolean>;
//   islogout: () => void;
// }