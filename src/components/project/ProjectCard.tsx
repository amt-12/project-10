import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Project } from '../../types';
import { formatDate, getRelativeDueStatus } from '../../utils/date';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { _id, name, description, startDate, dueDate, status, teamMembers = [] } = project;
  console.log('ProjectCard project', _id, name, description, startDate, dueDate, status, teamMembers);
  const getStatusBadge = () => {
    switch (status) {
      case 'open':
        return <Badge variant="primary">Open</Badge>;
      case 'in-progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return null;
    }
  };
  
  const getDueDateBadge = () => {
    const dueStatus = getRelativeDueStatus(dueDate, status);
    
    switch (dueStatus) {
      case 'overdue':
        return <Badge variant="danger">Overdue</Badge>;
      case 'approaching':
        return <Badge variant="warning">Due Soon</Badge>;
      case 'safe':
        return <Badge variant="default">On Track</Badge>;
      case 'completed':
        return null; // Don't show due status for completed projects
      default:
        return null;
    }
  };
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <Card 
      className="h-full flex flex-col transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]"
      padding="none"
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {getStatusBadge()}
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{truncateText(description, 100)}</p>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
          <span>
            {formatDate(startDate)} - {formatDate(dueDate)}
          </span>
          <div className="ml-2">{getDueDateBadge()}</div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
          <span>{teamMembers.length} team members</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-6 py-4">
        <Link
          to={`/projects/${_id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};

export default ProjectCard;