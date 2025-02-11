export interface Task {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  category: 'work' | 'personal';
}
