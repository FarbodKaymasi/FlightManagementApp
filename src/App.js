import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "./store"; 
import Home from "./pages/Home";
import AddFlight from "./pages/addFlight";
import FlightsList from "./pages/flightList";
import UpdateFlight from "./pages/updateFlight";
import FlightsByDestination from "./pages/flightsByDestination";
import FlightWithMostPassengers from "./pages/flightsWithMostPassenger";
import DeleteFlight from "./pages/deleteFlight";
import Menu from "./pages/Menu";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Menu />
        <Routes>

          <Route
            path="/"
            element={<Navigate to="/FlightManagementApp" replace />}
          />

          <Route path="/FlightManagementApp" element={<Home />} />
          <Route path="/add-flight" element={<AddFlight />} />
          <Route path="/flights-list" element={<FlightsList />} />
          <Route path="/update-flight" element={<UpdateFlight />} />
          <Route
            path="/flights-by-destination"
            element={<FlightsByDestination />}
          />
          <Route
            path="/most-passengers"
            element={<FlightWithMostPassengers />}
          />
          <Route path="/delete-flight" element={<DeleteFlight />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
