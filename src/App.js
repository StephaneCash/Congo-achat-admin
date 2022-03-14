import './App.css';
import RoutesAdmin from './routes/RoutesAdmin';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "@fontsource/open-sans";
import { UserAuthContextProvider } from "./config/useContextComponent";
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <RoutesAdmin />
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
