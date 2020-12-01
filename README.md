# WorkoutLogger

## Project Description

This is a simple user interface for my Workout API project. The structure of
this project is based on what I learned in the following course: https://codewithmosh.com/p/mastering-react

The basic technology stack is:

- React (UI Library)
- Bootstrap (front-end component library)
- Joi-browser (user-input validation)
- React-router-dom (routing)

Additional resources that helped me:

- https://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date
- https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
- https://www.learnenough.com/css-and-layout-tutorial
- https://reacttraining.com/react-router/web/example/auth-workflow
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
- https://www.w3schools.com/howto/howto_css_loader.asp
- https://stackoverflow.com/questions/8549529/what-is-the-difference-between-screen-and-only-screen-in-media-queries
- https://www.learnenough.com/css-and-layout-tutorial?single_page=1#sec-details-mobile-dropdown
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Defining_transitions
- https://www.w3schools.com/jsref/met_win_confirm.asp
- https://gist.github.com/primaryobjects/aacf6fa49823afb2f6ff065790a5b402
- https://reacttraining.com/react-router/web/example/query-parameters
- https://github.com/jerairrest/react-chartjs-2
- https://stackoverflow.com/questions/44154939/load-local-images-in-react-js
- https://stackoverflow.com/questions/3518002/how-can-i-set-the-default-value-for-an-html-select-element
- https://getbootstrap.com/docs/4.0/
- https://github.com/reactchartjs/react-chartjs-2
- https://lottiefiles.com/15514-dumbell-animation
- https://github.com/chenqingspring/react-lottie
- https://lottiefiles.com/user/6833
- https://lottiefiles.com/21460-exercises
- https://stackoverflow.com/questions/61845933/react-lottie-not-showing-animation-not-showing-web
- https://www.w3schools.com/jsref/jsref_slice_array.asp
- https://favicon.io/
- https://codepen.io/websitebeaver/pen/oLGGNz
- https://stackoverflow.com/questions/16201948/how-to-exclude-particular-class-name-in-css-selector/16202009
- https://blog.heroku.com/deploying-react-with-zero-configuration
- https://devcenter.heroku.com/articles/renaming-apps

## Project Setup

1. Install Node.js: https://nodejs.org/
2. Download project files
3. `$ cd workout-logger` # navigate to the project's root directory
4. `$ npm i` # install the packages listed in package.json
5. `$ npm start` # start server
6. Done. If you have also set up the corresponding Workout API project, you can navigate to http://localhost:3000/ to test the full project.

## Routes and Components

### Login/Logout

| URL     | Corresponding Component |
| ------- | ----------------------- |
| /login  | Login                   |
| /logout | Logout                  |

### Users Resource

| URL            | Corresponding Component |
| -------------- | ----------------------- |
| /users/index   | UserIndex               |
| /users/me/edit | UserNew                 |
| /users/me/show | UserShow                |

### Workouts Resource

| URL                | Corresponding Component |
| ------------------ | ----------------------- |
| /workouts/index    | WorkoutIndex            |
| /workouts/new      | WorkoutNew              |
| /workouts/:id/edit | WorkoutEdit             |

### TargetExercises Resource

| URL                                     | Corresponding Component |
| --------------------------------------- | ----------------------- |
| /workouts/:wid/target_exercise/:id/edit | TargetExerciseEdit      |
| /workouts/:wid/target_exercise          | TargetExerciseNew       |

### CompletedWorkouts Resource

| URL                          | Corresponding Component |
| ---------------------------- | ----------------------- |
| /completed_workouts/index    | CompletedWorkoutIndex   |
| /completed_workouts/new      | CompletedWorkoutNew     |
| /completed_workouts/:id/edit | CompletedWorkoutEdit    |

### CompletedExercises Resource

| URL                                                  | Corresponding Component |
| ---------------------------------------------------- | ----------------------- |
| /completed_workouts/:wid/completed_exercise/:id/edit | CompletedExerciseEdit   |
| /completed_workouts/:wid/completed_exercise          | CompletedExerciseNew    |

### Muscles Resource

| URL               | Corresponding Component |
| ----------------- | ----------------------- |
| /muscles/index    | MuscleIndex             |
| /muscles/new      | MuscleNew               |
| /muscles/:id/edit | MuscleEdit              |

### Exercises Resource

| URL                 | Corresponding Component |
| ------------------- | ----------------------- |
| /exercises/index    | ExerciseIndex           |
| /exercises/new      | ExerciseNew             |
| /exercises/:id/edit | ExerciseEdit            |

### Misc Components

| URL        | Corresponding Component |
| ---------- | ----------------------- |
| /          | HomePage                |
| /not-found | NotFound                |

## Services

These functions connect the React UI to the Node API.

### Auth Service

| Function       | API URL     | Result                                |
| -------------- | ----------- | ------------------------------------- |
| login          | POST /login | Authenticate user, save JWT on client |
| logout         | N/A         | Delete JWT from client                |
| loginWithJwt   | N/A         | Login without calling server          |
| getCurrentUser | N/A         | Extract user data from JWT            |
| getJwt         | N/A         | Return JWT from client                |

### HTTP Service

| Function | API URL | Result                     |
| -------- | ------- | -------------------------- |
| setJwt   | N/A     | Add JWT to request headers |

### User Service

| Function   | API URL           | Result                |
| ---------- | ----------------- | --------------------- |
| getUsers   | GET /users        | Return all users      |
| getUser    | GET /users/me     | Return logged-in user |
| saveUser   | POST /users       | Create new user       |
| deleteUser | DELETE /users/:id | Delete specified user |
| updateUser | PUT /users/me     | Update logged-in user |

### Muscle Service

| Function     | API URL             | Result                  |
| ------------ | ------------------- | ----------------------- |
| getMuscles   | GET /muscles        | Return all muscles      |
| getMuscle    | GET /muscles/:id    | Return specific muscle  |
| saveMuscle   | POST /muscles       | Create new muscle       |
| deleteMuscle | DELETE /muscles/:id | Delete specified muscle |
| updateMuscle | PUT /muscles/:id    | Update specified muscle |

### Exercise Service

| Function       | API URL               | Result                    |
| -------------- | --------------------- | ------------------------- |
| getExercises   | GET /exercises        | Return all exercises      |
| getExercise    | GET /exercises/:id    | Return specific exercise  |
| saveExercise   | POST /exercises       | Create new exercise       |
| deleteExercise | DELETE /exercises/:id | Delete specified exercise |
| updateExercise | PUT /exercises/:id    | Update specified exercise |

### Workout Service

| Function      | API URL              | Result                   |
| ------------- | -------------------- | ------------------------ |
| getWorkouts   | GET /workouts        | Return all workouts      |
| getWorkout    | GET /workouts/:id    | Return specific workout  |
| saveWorkout   | POST /workouts       | Create new workout       |
| deleteWorkout | DELETE /workouts/:id | Delete specified workout |
| updateWorkout | PUT /workouts/:id    | Update specified workout |

### TargetExercise Service

| Function             | API URL                                           | Result                           |
| -------------------- | ------------------------------------------------- | -------------------------------- |
| getTargetExercise    | GET /workouts/wid/target_exercises/:id            | Return specific target exercise  |
| saveTargetExercise   | POST /workouts/wid/target/:id/completed_exercises | Create new target exercise       |
| deleteTargetExercise | DELETE /workouts/wid/target_exercises/:id         | Delete specified target exercise |
| updateTargetExercise | PUT /workouts/wid/target_exercises/:id            | Update specified target exercise |

### CompletedWorkout Service

| Function               | API URL                        | Result                             |
| ---------------------- | ------------------------------ | ---------------------------------- |
| getCompletedWorkouts   | GET /completed_workouts        | Return all completed workouts      |
| getCompletedWorkout    | GET /completed_workouts/:id    | Return specific completed workout  |
| saveCompletedWorkout   | POST /completed_workouts       | Create new completed workout       |
| deleteCompletedWorkout | DELETE /completed_workouts/:id | Delete specified completed workout |
| updateCompletedWorkout | PUT /completed_workouts/:id    | Update specified completed workout |

### CompletedExercise Service

| Function                | API URL                                                       | Result                              |
| ----------------------- | ------------------------------------------------------------- | ----------------------------------- |
| getCompletedExercise    | GET /completed_workouts/wid/completed_exercises/:id           | Return specific completed exercise  |
| saveCompletedExercise   | POST /completed_workouts/wid/workouts/:id/completed_exercises | Create new completed exercise       |
| deleteCompletedExercise | DELETE /completed_workouts/wid/completed_exercises/:id        | Delete specified completed exercise |
| updateCompletedExercise | PUT /completed_workouts/wid/completed_exercises/:id           | Update specified completed exercise |
