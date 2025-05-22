import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import { Plus } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import ProjectCard from '../components/project/ProjectCard';
import Skeleton from '../components/ui/Skeleton';
import { Project } from '../types';
import axios from 'axios';

const { Option } = Select;

const ProjectsView: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  console.log('projects', projects);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const loadProjects = () => {
      setIsLoading(true);
      axios
        .get('http://localhost:5001/api/projectManagement/getAllProjects')
        .then((response) => {
          setProjects(response.data.data); // Assuming your API returns the project data in 'data'
          setError(null); // Clear any previous errors
        })
        .catch((err) => {
          console.error('Failed to fetch projects:', err);
          setError('Failed to load projects. Please try again later.');
        })
        .finally(() => {
          setIsLoading(false); // Stop the loading spinner when done
        });
    };

    loadProjects();
  }, []); 

  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, i) => (
      <div key={`skeleton-${i}`} className="h-64">
        <Skeleton className="h-full rounded-lg" />
      </div>
    ));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Validate the form values
    form
      .validateFields()
      .then((values) => {
        // Prepare project data
        const projectData = {
          ...values,
          startDate: values.startDate.format('YYYY-MM-DD'),
          dueDate: values.dueDate.format('YYYY-MM-DD'),
        };
  
        axios
          .post('http://localhost:5001/api/projectManagement/createProject', projectData)
          .then((response) => {
            if (response) {
              message.success('Project created successfully');
              setIsModalOpen(false); 
              form.resetFields(); // Reset the form fields
            
            } else {
              message.error('Failed to create project');
            }
          })
          .catch((error) => {
            // Handle error
            console.error('Error creating project:', error);
            message.error('Failed to create project');
          });
      })
      .catch((errorInfo) => {
        console.error('Form validation failed:', errorInfo);
        message.error('Please fill in all required fields');
      });
  };

  const [form] = Form.useForm();

  return (
    <PageContainer
      title="Projects"
      subtitle="Manage your team projects"
      action={
        <Button onClick={showModal} leftIcon={<Plus className="h-4 w-4" />}>
          New Project
        </Button>
      }
    >
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          renderSkeletons()
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <div className="col-span-full bg-gray-50 rounded-lg p-10 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">Create your first project to get started</p>
            <Button onClick={showModal} leftIcon={<Plus className="h-4 w-4" />}>
              Create Project
            </Button>
          </div>
        )}
      </div>

      <Modal
        title="Create New Project"
        open={isModalOpen}
        footer
      >
        <Form
          form={form}
          layout="vertical"
          name="projectForm"
          initialValues={{ status: 'open' }}
          onFinish={handleOk}
        >
          <Form.Item
            label="Project Name"
            name="name"
            rules={[{ required: true, message: 'Please input your project name!' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your project description!' }]}
          >
            <Input.TextArea rows={3} placeholder="Project description" />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: 'Please select the due date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            initialValue="open"
            rules={[{ required: true, message: 'Please select the project status!' }]}
          >
            <Select>
              <Option value="open">Open</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ProjectsView;
