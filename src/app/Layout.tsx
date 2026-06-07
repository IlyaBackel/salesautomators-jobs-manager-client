import { Outlet, Link, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <nav className="flex space-x-4 gap-10">
              <Link
                to="/leads"
                className={`px-3 py-2 rounded-md text-[1.5rem] font-medium transition ${
                  location.pathname === '/leads'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Leads
              </Link>
              <Link
                to="/jobs"
                className={`px-3 py-2 rounded-md text-[1.5rem] font-medium transition ${
                  location.pathname === '/jobs'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Jobs
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};