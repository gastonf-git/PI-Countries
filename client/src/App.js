import "./App.css";
import { Route } from "react-router-dom";
import InitialLanding from './views/InitialLanding/InitialLanding.jsx'
import Countrys from "./views/Countrys/Countrys.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Filters from "./components/Filters/Filters.jsx";
import CountryDetail from "./views/CountryDetail/CountryDetail.jsx";
import CreateActivity from "./views/CreateActivity/CreateActivity";

const App = () => {
  return (
    <>

    <Route path="/countries" component={Navbar} />
    <Route exact path="/countries">
      <Filters />
      <Countrys/>
    </Route>
    <Route exact path="/countries/countrydetail/:id" component={CountryDetail} />
    <Route exact path="/countries/create" component={CreateActivity} />
    <Route exact path="/" component={InitialLanding} />
  </>
  )
}

export default App