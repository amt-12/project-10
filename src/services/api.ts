import axios from 'axios';
import { Project, TeamMemberAssignment } from '../types';

// This would be your actual API URL
const API_URL = 'https://api.example.com';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Project API calls
export const fetchProjects = async (): Promise<Project[]> => {
  // For demo purposes, return mock data
  return mockProjects;
};

export const fetchProjectById = async (id: string): Promise<Project> => {
  // For demo purposes, find the project in mock data
  const project = mockProjects.find(p => p.id === id);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

export const createProject = async (project: Project): Promise<Project> => {
  // For demo purposes, add to mock data
  const newProject = {
    ...project,
    id: Math.random().toString(36).substring(2, 9),
    teamMembers: [],
  };
  mockProjects.push(newProject);
  return newProject;
};

export const updateProject = async (id: string, project: Project): Promise<Project> => {
  // For demo purposes, update in mock data
  const index = mockProjects.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Project not found');
  }
  
  const updatedProject = { ...mockProjects[index], ...project };
  mockProjects[index] = updatedProject;
  return updatedProject;
};

export const deleteProject = async (id: string): Promise<void> => {
  // For demo purposes, remove from mock data
  const index = mockProjects.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Project not found');
  }
  mockProjects.splice(index, 1);
};

// Team Member API calls
export const assignTeamMembers = async (
  projectId: string,
  members: TeamMemberAssignment[]
): Promise<void> => {
  // For demo purposes, update mock data
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  
  // Add new team members
  const newMembers = members.map(member => ({
    id: Math.random().toString(36).substring(2, 9),
    userId: member.userId,
    name: mockUsers.find(u => u.id === member.userId)?.name || 'Unknown User',
    role: member.role,
    projectId,
  }));
  
  if (!project.teamMembers) {
    project.teamMembers = [];
  }
  
  project.teamMembers = [...project.teamMembers, ...newMembers];
};

export const removeTeamMember = async (
  projectId: string,
  memberId: string
): Promise<void> => {
  // For demo purposes, update mock data
  const project = mockProjects.find(p => p.id === projectId);
  if (!project || !project.teamMembers) {
    throw new Error('Project or team member not found');
  }
  
  project.teamMembers = project.teamMembers.filter(m => m.id !== memberId);
};

export const fetchUsers = async (): Promise<any[]> => {
  // For demo purposes, return mock data
  return mockUsers;
};

// Mock data
const mockUsers = [
  { id: 'user1', name: 'Alex Johnson', email: 'alex@example.com', position: 'Frontend Developer' },
  { id: 'user2', name: 'Sam Rodriguez', email: 'sam@example.com', position: 'Backend Developer' },
  { id: 'user3', name: 'Jordan Lee', email: 'jordan@example.com', position: 'UI/UX Designer' },
  { id: 'user4', name: 'Taylor Smith', email: 'taylor@example.com', position: 'Project Manager' },
  { id: 'user5', name: 'Casey Brown', email: 'casey@example.com', position: 'DevOps Engineer' },
];

const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'Website Redesign',
    description: 'Redesign the company website with new branding and improved UX',
    startDate: '2025-01-15',
    dueDate: '2025-03-30',
    status: 'in-progress',
    teamMembers: [
      { id: 'tm1', userId: 'user1', name: 'Alex Johnson', role: 'Frontend Lead', projectId: 'proj1' },
      { id: 'tm2', userId: 'user3', name: 'Jordan Lee', role: 'UI Designer', projectId: 'proj1' },
    ],
  },
  {
    id: 'proj2',
    name: 'Mobile App Development',
    description: 'Create a new mobile app for customer engagement',
    startDate: '2025-02-01',
    dueDate: '2025-05-15',
    status: 'open',
    teamMembers: [
      { id: 'tm3', userId: 'user2', name: 'Sam Rodriguez', role: 'Backend Developer', projectId: 'proj2' },
      { id: 'tm4', userId: 'user4', name: 'Taylor Smith', role: 'Project Manager', projectId: 'proj2' },
    ],
  },
  {
    id: 'proj3',
    name: 'Database Migration',
    description: 'Migrate from legacy database to new cloud-based solution',
    startDate: '2024-11-01',
    dueDate: '2024-12-15',
    status: 'completed',
    teamMembers: [
      { id: 'tm5', userId: 'user2', name: 'Sam Rodriguez', role: 'Database Engineer', projectId: 'proj3' },
      { id: 'tm6', userId: 'user5', name: 'Casey Brown', role: 'DevOps Engineer', projectId: 'proj3' },
    ],
  },
];