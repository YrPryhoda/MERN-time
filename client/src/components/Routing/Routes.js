import React from 'react'
import {Route, Switch} from 'react-router';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import EditProfile from '../dashboard/create_forms/EditProfile';
import AddExperience from '../dashboard/create_forms/AddExperience';
import AddEducation from '../dashboard/create_forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Login from '../layout/Login';
import NotFound from '../layout/NotFound';
import Register from '../layout/Register';
import Alert from '../layout/Alert';
import CreateProfile from '../dashboard/create_forms/CreateProfile';


const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/post/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
