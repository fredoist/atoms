import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Create, Home } from '@pages';
import { Layout } from '@components';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Layout>
    </Router>
  );
}
