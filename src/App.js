import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";


function App() {
  return (
    <>
      <AuthContextProvider>

        <Routes>
          {/* Route enables which component should render on which path */}
          <Route path='/' element={<Navigate to='/feed' />} />
          <Route path='/login' element={<RedirectToFeed>< Login /></RedirectToFeed>} />
          <Route path='/signup' element={<RedirectToFeed>< Signup /></RedirectToFeed>} />
          {/* <Route path='/feed' element={< Feed />} /> */}
          <Route path='/feed' element={<PrivateRoute>< Feed /></PrivateRoute>} />
          {/* <Route path='/profile' element={< Profile />} /> */}
          <Route path='/profile' element={<PrivateRoute>< Profile /></PrivateRoute>} />
          <Route path='/*' element={< PageNotFound />} />


          {/* Jasbir sir code: this is according to earlier version of react-router-dom */}
          {/* <PrivateRoute path="/feed" comp={Feed}></PrivateRoute> */}

          {/* these two route functions give the same out
          
          <Route path="/"><Feed></Feed></Route>
          <Route path="/" render={(props) => { return <Feed {...props}></Feed> }}></Route>
          
          */}
        </Routes>
      </AuthContextProvider>
    </>
  );
}


// Jasbir sir code: this is according to earlier version of react-router-dom
// function PrivateRoute(props) {
//   let Component = props.comp;

//   // check if you are logged in
//   let cUser = useContext(AuthContext);
//   // cUser => null => login page
//   // cUser => anything
//   return (
//     <Route {...props}
//       render={
//         (props) => {
//           // logic
//           return cUser != null ? <Component {...props}></Component>:<Redirect to='/login'></Redirect>
//         }
//       }>

//     </Route>
//   )

// }

function PrivateRoute({ children }) {
  let cUser = useContext(AuthContext);
  return cUser != null ? children : <Navigate to='/login' />
}
function RedirectToFeed({ children }) {
  let cUser = useContext(AuthContext);
  return cUser == null ? children : <Navigate to='/feed' />
}

export default App;
