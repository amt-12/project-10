import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import Button from '../ui/Button';
import { User, TeamMemberAssignment, TeamMember } from '../../types';

interface TeamMemberFormProps {
  projectId: string;
  onSuccess: (members: TeamMember[]) => void;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ projectId, onSuccess }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignments, setAssignments] = useState<TeamMemberAssignment[]>([
    { userId: '', role: '' }
  ]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://test-job-bs88.onrender.com/api/userManagement/getAllUsers')
      .then((response) => {
        setUsers(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading users:', error);
        toast.error('Failed to load team members');
        setIsLoading(false);
      });
  }, []);

  const handleChange = (index: number, field: keyof TeamMemberAssignment, value: string) => {
    const newAssignments = [...assignments];
    newAssignments[index] = { ...newAssignments[index], [field]: value };
    setAssignments(newAssignments);
  };

  const addAssignment = () => {
    setAssignments([...assignments, { userId: '', role: '' }]);
  };

  const removeAssignment = (index: number) => {
    if (assignments.length <= 1) return;
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = assignments.every((a) => a.userId && a.role);
    if (!isValid) {
      toast.error('Please fill in all fields');
      return;
    }

    const userIds = "12345";

    setIsSubmitting(true);

    axios
      .post(`https://test-job-bs88.onrender.com/api/teamManagement/projects/${projectId}/team`, {
        userIds,
      })
      .then(() => {
        const newMembers: TeamMember[] = assignments.map((assignment) => {
          const user = users.find((u) => u.id === assignment.userId);
          return {
            id: Math.random().toString(36).substring(2, 9),
            userId: assignment.userId,
            name: user ? user.name : 'Unknown',
            role: assignment.role,
            projectId,
          };
        });

        toast.success('Team members added successfully!');
        onSuccess(newMembers);
        setAssignments([{ userId: '', role: '' }]);
      })
      .catch((error) => {
        console.error('Error adding team members:', error);
        toast.error('Failed to add team members');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading available team members...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Add Team Members</h4>

      {assignments.map((assignment, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <select
              value={assignment.userId}
              onChange={(e) => handleChange(index, 'userId', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              disabled={isSubmitting}
            >
              <option value="">Select a team member</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.position})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-grow">
            <input
              type="text"
              value={assignment.role}
              onChange={(e) => handleChange(index, 'role', e.target.value)}
              placeholder="Role (e.g., Developer, Designer)"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeAssignment(index)}
              disabled={assignments.length <= 1 || isSubmitting}
              className="w-full md:w-auto"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addAssignment}
          disabled={isSubmitting}
        >
          + Add Another
        </Button>

        <Button
          type="submit"
          size="sm"
          isLoading={isSubmitting}
          leftIcon={<UserPlus className="h-4 w-4" />}
        >
          Add to Project
        </Button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
