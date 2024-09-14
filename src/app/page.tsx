import { redirect } from 'next/navigation';

export default function HomePage() {
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('token');

  if (isAuthenticated) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}