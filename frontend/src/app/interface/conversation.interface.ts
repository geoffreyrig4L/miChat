import { Participant } from '@app/interface/participant.interface';
import { Message } from './message.interface';

export interface Conversation {
  _id: string;
  created_at: Date;
  updated_at: Date;
  messages: Message[];
  interlocutor: Participant;
}
