import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import { ERoutes, routes } from "./general/constants";
import { ObjectsTable } from "./pages/ObjectsTable/ObjectsTable";
import { ObjectPage } from "./pages/ObjectPage/ObjectPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes[ERoutes.Index]} element={<ObjectsTable />} />
        <Route path={routes[ERoutes.Navigation]} >
          <Route path=":objectId" element={<ObjectPage />} />
        </Route>
      </Routes >
    </BrowserRouter >
  )
}

export default App
