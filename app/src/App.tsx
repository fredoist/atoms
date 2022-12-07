import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Create, Home, User } from '@pages';
import { Layout } from '@components';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/@:username" element={<User />} />
        </Routes>
      </Layout>
    </Router>
  );
}
