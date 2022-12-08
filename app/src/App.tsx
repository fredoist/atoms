import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth, Create, Home, User } from '@pages';
import { Layout } from '@components';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/@:username" element={<User />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}
