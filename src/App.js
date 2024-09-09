import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// 导入前端用的 @apollo/client
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

// 修改merge policy，使得手动更新cache的时候返回最新的cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// 创建ApolloClient实例，指向后端的GraphQL端口
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: cache,
});

function App() {
  return (
    <>
      {/* 用ApolloProvider包裹住所有组件 */}
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

