import Navbar from "./components/Navbar.jsx";
import ArticlesDashboardPage from "./pages/ArticlesDashboardPage.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <ArticlesDashboardPage />
    </div>
  );
};

export default App;
