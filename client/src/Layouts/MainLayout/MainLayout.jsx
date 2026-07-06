import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;