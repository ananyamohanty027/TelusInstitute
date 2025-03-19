import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/common/Layout";
import { Home } from "./pages/Home/Home.jsx";
// import { BlogSinglePage } from "./components/common/BlogSinglePage";
import { About } from "./pages/About/About.jsx";
import { Courses } from "./pages/Course/Courses.jsx";
import { Blog } from "./pages/Blog/Blog.jsx";
import { Instructor } from "./pages/Instructor/Instructor.jsx";
import { Login } from "./pages/Login/login";
import Register from './pages/Login/register.jsx';
import Gallery from './pages/Gallery/gallery.jsx';
import Contact from "./components/common/Contact/Contact.jsx";
import Certificate from "./pages/Certificate/Certificate.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path='/about'
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path='/courses'
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path='/instructor'
          element={
            <Layout>
              <Instructor />
            </Layout>
          }
        />
        <Route
          path='/blog'
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        {/* <Route
          path='/single-blog'
          element={
            <Layout>
              <BlogSinglePage />
            </Layout>
          }
        /> */}
        <Route
          path='/login'
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path='/gallery'
          element={
            <Layout>
              <Gallery />
            </Layout>
          }
        />
        <Route
          path='/contact'
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path='/certificate'
          element={
            <Layout>
              <Certificate />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
