import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Auth/Login';
import GeneralManagerLayout from '../layouts/GeneralManagerLayout';
import ProfilePage from '../pages/Profile/ProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';
import DefaultRoute from '../components/DefaultRoute'; // Kullanıcının rolüne göre yönlendirme için
import Layout from '../layouts/Layout';
import UsersPage from '../pages/Users/UsersPage';
import UserPage from '../pages/Users/UserPage';
import EditUserPage from '../pages/Users/EditUserPage';
import CreateUserPage from '../pages/Users/CreateUserPage';
import ShowPage from '../pages/Show/ShowPage';
import ShowDetailPage from '../pages/Show/ShowDetailPage';
import EditShowPage from '../pages/Show/EditShowPage';
import CreateShowPage from '../pages/Show/CreateShowPage';
import MatchCreatePage from '../pages/Match/MatchCreatePage';
import PromoCreatePage from '../pages/Promo/PromoCreatePage';
import MatchEditPage from '../pages/Match/MatchEditPage';
import PromoEditPage from '../pages/Promo/PromoEditPage';
import BrandManagerLayout from '../layouts/BrandManagerLayout';
import WrestlersPage from '../pages/Wrestlers/WrestlersPage';
import WrestlerDetailPage from '../pages/Wrestlers/WrestlerDetailPage';
import WrestlerEditPage from '../pages/Wrestlers/WrestlerEditPage';
import TrainingPage from '../pages/TrainingRequest/TrainingPage';
import CreateTrainingRequest from '../pages/TrainingRequest/CreateTrainingRequest';
import EditTrainingRequest from '../pages/TrainingRequest/EditTrainingRequest';
import ScenarioPage from '../pages/Scenerio/ScenarioPage';
import CreateScenario from '../pages/Scenerio/CreateScenario';
import ScenerioEdit from '../pages/Scenerio/ScenerioEdit';
import WrestlerLayout from '../layouts/WrestlerLayout';
import CoachLayout from '../layouts/CoachLayout';
import WriterLayout from '../layouts/WriterLayout';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login Sayfası */}
          <Route path="/login" element={<Login />} />

          {/* Kullanıcı login olduktan sonra role göre yönlendirme */}
          <Route path="/" element={<DefaultRoute />} />

          {/* Genel Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Genel Sayfalar */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/user/edit/:id" element={
              <ProtectedRoute role="General Manager">
              <EditUserPage />
              </ProtectedRoute>
              } />
            <Route path="/user/create" element={
              <ProtectedRoute role="General Manager">
              <CreateUserPage />
              </ProtectedRoute>
              } />

            {/* Show Sayfaları */}
            <Route
              path="/shows"
              element={
                <ProtectedRoute role={['General Manager', 'Brand Manager', 'Coach', 'Writer', 'Wrestler']}>
                  <ShowPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/show/:id"
              element={
                <ProtectedRoute role={['General Manager', 'Brand Manager', 'Coach', 'Writer', 'Wrestler']}>
                  <ShowDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/show/edit/:id"
              element={
                <ProtectedRoute role="General Manager">
                  <EditShowPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/show/create"
              element={
                <ProtectedRoute role="General Manager">
                  <CreateShowPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/show/:id/create-match"
              element={
                <ProtectedRoute role={['General Manager', 'Brand Manager']}>
                  <MatchCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/match/edit/:id"
              element={
                <ProtectedRoute role={['General Manager', 'Brand Manager']}>
                  <MatchEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/show/:id/create-promo"
              element={
                <ProtectedRoute role={['General Manager', 'Brand Manager']}>
                  <PromoCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/promo/edit/:id"
              element={
                <ProtectedRoute role={['General Manager', 'Brand Manager']}>
                  <PromoEditPage />
                </ProtectedRoute>
              }
            />
            <Route
            path="/wrestlers"
            element={
              <ProtectedRoute role="Brand Manager">
                <WrestlersPage />
              </ProtectedRoute>
            }
            /> 
            <Route
              path="/wrestler/:id"
              element={
                <ProtectedRoute role="Brand Manager">
                  <WrestlerDetailPage />
                </ProtectedRoute>
              }
            /> 
            <Route
              path="/wrestler/edit/:id"
              element={
                <ProtectedRoute role="Brand Manager">
                  <WrestlerEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trainings"
              element={
              <ProtectedRoute role={['Brand Manager', 'Coach', 'Wrestler']}>
                <TrainingPage />
              </ProtectedRoute>
            }
            />
            <Route
              path="/training/create"
              element={
              <ProtectedRoute role="Brand Manager">
                <CreateTrainingRequest />
              </ProtectedRoute>
            }/>
            <Route
              path="/training/edit/:id"
              element={
              <ProtectedRoute role="Brand Manager">
                <EditTrainingRequest />
              </ProtectedRoute>
            }/>
            <Route
              path="/scenarios"
              element={
              <ProtectedRoute role={['Brand Manager',"Writer","Wrestler"]}>
                <ScenarioPage />
              </ProtectedRoute>
            }/> 
            <Route
              path="/scenario/create"
              element={
              <ProtectedRoute role="Brand Manager">
                <CreateScenario />
              </ProtectedRoute>
            }/>
            <Route
              path="/scenario/edit/:id"
              element={
              <ProtectedRoute role="Brand Manager">
                <ScenerioEdit />
              </ProtectedRoute>
            }/>     
          </Route>

          {/* General Manager Sayfaları */}
          <Route
            path="/general-manager"
            element={
              <ProtectedRoute role="General Manager">
                <GeneralManagerLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brand-manager"
            element={
              <ProtectedRoute role="Brand Manager">
                <BrandManagerLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Coach"
            element={
              <ProtectedRoute role="Coach">
                <CoachLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Writer"
            element={
              <ProtectedRoute role="Writer">
                <WriterLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Wrestler"
            element={
              <ProtectedRoute role="Wrestler">
                <WrestlerLayout />
              </ProtectedRoute>
            }
          />  
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
