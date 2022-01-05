import "./App.css";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/register' element={<SignUp />} />
					<Route path='/dashboard' element={<PrivateRoute />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
