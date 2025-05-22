import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import ProjectsView from './views/ProjectsView';
import CreateProjectView from './views/CreateProjectView';
import ProjectDetailView from './views/ProjectDetailView';
import EditProjectView from './views/EditProjectView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow py-6">
          <Routes>
            <Route path="/" element={<ProjectsView />} />
            <Route path="/create" element={<CreateProjectView />} />
            <Route path="/projects/:id" element={<ProjectDetailView />} />
            <Route path="/projects/:id/edit" element={<EditProjectView />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FFFFFF',
              color: '#1F2937',
              border: '1px solid #E5E7EB',
              borderRadius: '0.375rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;