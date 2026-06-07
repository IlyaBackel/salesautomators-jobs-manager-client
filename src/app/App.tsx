import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import LeadsPage from '../pages/leads/ui/LeadsPage';
import JobsPage from '../pages/jobs/ui/JobsPage';
import JobDetailsPage from '../pages/job-page';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LeadsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;