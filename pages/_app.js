import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { PostProvider } from "../contexts/PostContext";
import { TaskProvider } from "../contexts/TaskContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PostProvider>
        <TaskProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </TaskProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default MyApp;
