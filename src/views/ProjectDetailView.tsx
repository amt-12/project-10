import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Edit,
  Trash2,
  UserPlus,
  CalendarClock,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import { toast } from "react-hot-toast";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Skeleton from "../components/ui/Skeleton";
import TeamMemberList from "../components/project/TeamMemberList";
import TeamMemberForm from "../components/project/TeamMemberForm";
import { Project } from "../types";
import { formatDate, getRelativeDueStatus } from "../utils/date";
import { Modal, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

const ProjectDetailView: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRemovingMember, setIsRemovingMember] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load project
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/projectManagement/getProjectById/${id}`)
      .then((response) => {
        setProject(response.data.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error loading project:", err);
        setError("Failed to load project details. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (!id) return;

    if (window.confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      axios
        .delete(
          `http://localhost:5001/api/projectManagement/deleteProject/${id}`
        )
        .then(() => {
          toast.success("Project deleted successfully!");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error deleting project:", err);
          toast.error("Failed to delete project.");
        })
        .finally(() => setIsDeleting(false));
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (!id) return;

    setIsRemovingMember(true);
    axios
      .delete(
        `http://localhost:5001/api/projectManagement/removeTeamMember/${id}/${memberId}`
      )
      .then(() => {
        setProject((prev) =>
          prev
            ? {
                ...prev,
                teamMembers: prev.teamMembers.filter((m) => m.id !== memberId),
              }
            : prev
        );
        toast.success("Team member removed.");
      })
      .catch((err) => {
        console.error("Error removing member:", err);
        toast.error("Failed to remove member.");
      })
      .finally(() => setIsRemovingMember(false));
  };

  const handleUpdate = () => {
    if (!id || !project) return;
  
    setIsSubmitting(true);
    form
      .validateFields()
      .then((values) => {
        const updatedProject = {
          ...project,
          ...values,
          dueDate: values.dueDate ? values.dueDate.toISOString() : project.dueDate,
        };
  
        const {teamMembers,createdAt,updatedAt,__v, _id, ...safeProject} = updatedProject;
  
        axios
          .put(
            `http://localhost:5001/api/projectManagement/updateProject/${id}`,
            safeProject
          )
          .then(() => {
            toast.success("Project updated successfully!");
            setProject(updatedProject);
            setIsEditModalOpen(false);
          })
          .catch((err) => {
            console.error("Update failed:", err);
            toast.error("Failed to update project.");
          })
          .finally(() => setIsSubmitting(false));
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
      });
  };
  

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="primary">Open</Badge>;
      case "in-progress":
        return <Badge variant="warning">In Progress</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      default:
        return null;
    }
  };

  const renderSkeleton = () => (
    <>
      <Skeleton height="h-8" width="w-3/4" />
      <Skeleton height="h-4" width="w-1/2" />
    </>
  );

  if (isLoading) {
    return <PageContainer>{renderSkeleton()}</PageContainer>;
  }

  if (error || !project) {
    return (
      <PageContainer>
        <div className="text-red-600">{error || "Project not found"}</div>
        <Link to="/">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </PageContainer>
    );
  }

  const dueStatus = getRelativeDueStatus(project.dueDate, project.status);

  return (
    <PageContainer
      title={project.name}
      subtitle={`Created on ${formatDate(project.startDate)}`}
      action={
        <div className="flex gap-2">
          <Button
            variant="outline"
            leftIcon={<Edit />}
            onClick={() => {
              form.setFieldsValue({
                name: project.name,
                description: project.description,
                dueDate: dayjs(project.dueDate),
              });
              setIsEditModalOpen(true);
            }}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            leftIcon={<Trash2 />}
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="flex gap-2 mb-4">
              {getStatusBadge(project.status)}
              {project.status !== "completed" && dueStatus === "overdue" && (
                <Badge variant="danger">Overdue</Badge>
              )}
              {project.status !== "completed" &&
                dueStatus === "approaching" && (
                  <Badge variant="warning">Due Soon</Badge>
                )}
            </div>
            <p>{project.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarClock className="mr-1.5 h-4 w-4 text-gray-400" />
              <span>
                {formatDate(project.startDate)} - {formatDate(project.dueDate)}
              </span>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500">
          <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
          <span>2 team members</span>
        </div>

          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
            <Button
              size="sm"
              leftIcon={<UserPlus />}
              onClick={() => setShowTeamForm(!showTeamForm)}
            >
              {showTeamForm ? "Cancel" : "Add"}
            </Button>
          </div>
          <Card>
            {showTeamForm && (
              <TeamMemberForm
                projectId={id!}
                onSuccess={(newMembers) => {
                  setShowTeamForm(false);
                  setProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          teamMembers: [
                            ...(prev.teamMembers || []),
                            ...newMembers,
                          ],
                        }
                      : prev
                  );
                }}
              />
            )}
            <TeamMemberList
              members={project.teamMembers || []}
              onRemoveMember={handleRemoveMember}
              isLoading={isRemovingMember}
            />
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Project"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleUpdate}
        confirmLoading={isSubmitting}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select a due date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ProjectDetailView;
