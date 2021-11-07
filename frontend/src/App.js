import { BrowserRouter as Router,Route} from "react-router-dom";
import Upload from "./components/upload.component"
import Column from "./components/columns.component";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>   
      {/* <br/> */}
      <Route path="/" exact component={Upload} />
      <Route exact path="/column" component={Column}/>
      </Router>
  );
}

export default App;
