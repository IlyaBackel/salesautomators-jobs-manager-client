import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import LeadsPage from '../pages/leads/ui/LeadsPage';
import JobsPage from '../pages/jobs/ui/JobsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LeadsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Route>
    </Routes>
  );
}

export default App;