import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './Login';
import DashboardPage from './DashboardPage';
import CalendarPage from './CalendarPage';
import EventsPage from './EventsPage';
import InstructorsAssignmentPage from './InstructorsAssignmentPage';
import InstructorHoursReportPage from './InstructorHoursReportPage';
import InstructorHoursByCurriculumPage from './InstructorHoursByCurriculumPage';
import AdminPage from './AdminPage';
import './App.css';

// Componente que envuelve una ruta protegida con el Layout
const ProtectedPageWithLayout = ({ children }) => (
  <ProtectedRoute>
    <Layout>
      {children}
    </Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedPageWithLayout>
              <DashboardPage />
            </ProtectedPageWithLayout>
          } />
          <Route path="/calendar" element={
            <ProtectedPageWithLayout>
              <CalendarPage />
            </ProtectedPageWithLayout>
          } />
          <Route path="/events" element={
            <ProtectedPageWithLayout>
              <EventsPage />
            </ProtectedPageWithLayout>
          } />
          <Route path="/instructors-assignment" element={
            <ProtectedPageWithLayout>
              <InstructorsAssignmentPage />
            </ProtectedPageWithLayout>
          } />
          <Route path="/instructor-hours-report" element={
            <ProtectedPageWithLayout>
              <InstructorHoursReportPage />
            </ProtectedPageWithLayout>
          } />
          <Route path="/instructor-hours-by-curriculum" element={
            <ProtectedPageWithLayout>
              <InstructorHoursByCurriculumPage />
            </ProtectedPageWithLayout>
          } />
          <Route path="/admin" element={
            <ProtectedPageWithLayout>
              <AdminPage />
            </ProtectedPageWithLayout>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
