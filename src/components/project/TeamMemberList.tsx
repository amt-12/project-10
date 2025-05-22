import React from 'react';
import { UserX } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { TeamMember } from '../../types';

interface TeamMemberListProps {
  members: TeamMember[];
  onRemoveMember: (memberId: string) => void;
  isLoading?: boolean;
}

const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  onRemoveMember,
  isLoading = false,
}) => {
  if (members.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No team members assigned to this project yet.</p>
      </div>
    );
  }
  
  return (
    <ul className="divide-y divide-gray-200">
      {members.map((member) => (
        <li
          key={member.id}
          className="py-4 flex items-center justify-between hover:bg-gray-50 px-4 transition-colors"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-800 font-medium text-sm">
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
              <Badge
                variant="secondary"
                className="mt-1"
              >
                {member.role}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveMember(member.id)}
            disabled={isLoading}
            className="text-gray-400 hover:text-red-600"
            aria-label={`Remove ${member.name}`}
          >
            <UserX className="h-5 w-5" />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default TeamMemberList;