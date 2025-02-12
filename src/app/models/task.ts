export interface Task {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: 'work' | 'personal';
}
