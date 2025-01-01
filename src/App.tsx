import { Header } from "./components/header";
import { Main } from "./components/main";

function App() {
  return (
    <div className="flex min-h-screen min-w-96 bg-slate-600 pt-4">
      <Header />
      <Main />
    </div>
  );
}

export default App;
