export interface Project {
  _id: Key | null | undefined;
  id?: string;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: 'open' | 'in-progress' | 'completed';
  teamMembers?: TeamMember[];
}

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  role: string;
  projectId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  position?: string;
}

export interface TeamMemberAssignment {
  userId: string;
  role: string;
}