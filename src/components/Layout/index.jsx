import Navbar from '../Navbar';
import Footer from '../Footer';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', flex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
