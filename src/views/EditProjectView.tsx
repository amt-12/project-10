import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/ui/Button';
import ProjectForm from '../components/project/ProjectForm';
import Skeleton from '../components/ui/Skeleton';
import { Project } from '../types';
import { fetchProjectById, updateProject } from '../services/api';

const EditProjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchProjectById(id);
        setProject(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProject();
  }, [id]);
  
  const handleSubmit = async (updatedProject: Project) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      await updateProject(id, updatedProject);
      toast.success('Project updated successfully!');
      navigate(`/projects/${id}`);
    } catch (err) {
      console.error('Failed to update project:', err);
      toast.error('Failed to update project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <PageContainer
        title="Edit Project"
        subtitle="Update project details"
      >
        <div className="max-w-3xl mx-auto">
          <Skeleton height="h-96" />
        </div>
      </PageContainer>
    );
  }
  
  if (error || !project) {
    return (
      <PageContainer
        title="Edit Project"
        subtitle="Update project details"
      >
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Project not found'}
        </div>
        <Link to="/">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Projects
          </Button>
        </Link>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer
      title="Edit Project"
      subtitle="Update project details and settings"
      action={
        <Link to={`/projects/${id}`}>
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Project
          </Button>
        </Link>
      }
    >
      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </PageContainer>
  );
};

export default EditProjectView;