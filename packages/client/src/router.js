import Main from './containers/Main'
import ProjectCard from './containers/ProjectCard'
import React from 'react';

import {Route, Switch, Redirect} from 'react-router';

export default () => <Switch>
  <Route exact path="/" component={Main}/>
  <Route exact path="/project/:project_name" component={ProjectCard}/>
</Switch>

