import {Switch, Route, BrowserRouter} from 'react-router-dom'
import DataViews from './components/DataViews/index'
import GridView from './components/GridView/index'
import TableView from './components/TableView/index'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={DataViews} />
      <Route exact path="/grid" component={DataViews} />
      <Route exact path="/table" component={DataViews} />
    </Switch>
  </BrowserRouter>
)

export default App
