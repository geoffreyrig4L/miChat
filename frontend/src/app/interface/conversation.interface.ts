import { User } from './user.interface';

export interface Conversation {
  id: string;
  interlocutor: User;
  created_at: Date;
  updated_at: Date;
}