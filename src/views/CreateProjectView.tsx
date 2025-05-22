import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PageContainer from '../components/layout/PageContainer';
import ProjectForm from '../components/project/ProjectForm';
import { Project } from '../types';
import { createProject } from '../services/api';

const CreateProjectView: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (project: Project) => {
    try {
      setIsSubmitting(true);
      await createProject(project);
      toast.success('Project created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      title="Create New Project"
      subtitle="Add a new project to your workspace"
    >
      <ProjectForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </PageContainer>
  );
};

export default CreateProjectView;