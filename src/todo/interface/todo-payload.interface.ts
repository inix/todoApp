export interface TodoPayload {
  id?: number;
  title: string;
  description: string;
  isComplete: boolean;
  completedAt: Date,
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
}
