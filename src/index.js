import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { AuthContextProvider } from "contexts/AuthContext";
import courses from "views/pages/courses/courses";
import ProtectedRoute from "contexts/ProtectedRoutes";

function App() {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/auth">
                  <ProtectedRoute>
                    <AuthLayout />
                  </ProtectedRoute>
                </Route>

                <Route path="/admin">
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                </Route>
{/* 
                <Route path="/rtl" component={RTLLayout} /> */}

                {/* <Route path='/admin/courses/:id' component={courses} /> */}
                <Redirect from="/" to="/admin" />
              </Switch>
            </BrowserRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
