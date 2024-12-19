import { User } from './user.interface';

export interface Message {
  id: string;
  sender: User;
  receiver: User;
  created_at: Date;
  updated_at: Date;
  content: string;
}
