export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  created_at: Date;
  updated_at: Date;
  content: string;
  conversation: string;
}
