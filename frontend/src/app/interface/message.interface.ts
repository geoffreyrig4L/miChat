import { Participant } from './participant.interface';
import { User } from './user.interface';

export interface Message {
  _id: string;
  sender: User;
  receiver: Participant;
  created_at: Date;
  updated_at: Date;
  content: string;
  conversation: string;
}
