import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store';

import appConfig from './utils/appConfig';

const TaskListComponent = React.lazy(() => import('./components/taskListComponent'));
const BaseComponent = React.lazy(() => import('./components/baseComponent'))

function App() {

  const getAllAppRoutes = () => {
    const taskRoutes = appConfig.statusTypes.map((eachType) => {
      const path = eachType.statusId.toLowerCase();
      return (
        <Route path={path} element={<TaskListComponent filter={eachType.statusId} />}  />
      )
    });
    console.log(taskRoutes)
    return (
      <Route path='tasks' element={<BaseComponent />} >
        <Route path='' element={<Navigate replace to={'/tasks/all_tasks'} />} />
        {taskRoutes}
      </Route>
    );
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to={'/tasks/all_tasks'} />} />
          {getAllAppRoutes()}
          <Route path='*' element={<Navigate replace to={'/tasks/all_tasks'} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App
