
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Footer from './components/footer';
import Login from './components/login';
import Logout from './components/logout';
import UserIndex from './components/users/userIndex';
import UserNew from './components/users/userNew';
import UserEdit from './components/users/userEdit';
import UserShow from './components/users/userShow';
import CompletedWorkoutIndex from './components/completed_workouts/workoutIndex';
import CompletedWorkoutNew from './components/completed_workouts/workoutNew';
import CompletedWorkoutEdit from './components/completed_workouts/workoutEdit';
import CompletedExerciseNew from './components/completed_exercises/completedExerciseNew';
import CompletedExerciseEdit from './components/completed_exercises/completedExerciseEdit';
import MuscleIndex from './components/muscles/muscleIndex';
import MuscleNew from './components/muscles/muscleNew';
import MuscleEdit from './components/muscles/muscleEdit';
import ExerciseIndex from './components/exercises/exerciseIndex';
import ExerciseNew from './components/exercises/exerciseNew';
import ExerciseEdit from './components/exercises/exerciseEdit';
import HomePage from './components/homePage';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './components/notFound';

class App extends Component {
  render() {
    return (
      <div className="custom-base-container">
        <NavBar className="custom-navbar"/>
        <main className="custom-container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path="/users/index"
              component={UserIndex}
              redirect_path="/users/me/show"
              admin_required={true}
            />
            <Route path="/users/new" component={UserNew} />
            <ProtectedRoute
              path="/users/me/edit"
              component={UserEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/users/me/show"
              component={UserShow}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/completed_workouts/index"
              component={CompletedWorkoutIndex}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/completed_workouts/new"
              component={CompletedWorkoutNew}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/completed_workouts/:id/edit"
              component={CompletedWorkoutEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/workouts/:id/completed_exercise"
              component={CompletedExerciseNew}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/completed_exercise/:id/edit"
              component={CompletedExerciseEdit}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/muscles/index"
              component={MuscleIndex}
              redirect_path="/login"
              admin_required={true}
            />
            <ProtectedRoute
              path="/muscles/new"
              component={MuscleNew}
              redirect_path="/muscles/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/muscles/:id/edit"
              component={MuscleEdit}
              redirect_path="/muscles/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/exercises/index"
              component={ExerciseIndex}
              redirect_path="/login"
            />
            <ProtectedRoute
              path="/exercises/new"
              component={ExerciseNew}
              redirect_path="/exercises/index"
              admin_required={true}
            />
            <ProtectedRoute
              path="/exercises/:id/edit"
              component={ExerciseEdit}
              redirect_path="/exercises/index"
              admin_required={true}
            />
            <Route path="/not-found" component={NotFound} />;
            <Route path="/" component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
