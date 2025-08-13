import { redirect } from 'next/navigation';

export default function ExperiencesPage() {
  // Redirect to search page as this shows all experiences/categories
  redirect('/search');
}