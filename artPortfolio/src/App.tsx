
import Gallery from './Gallery';
import About from './About';
import Header from './Header';
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Content">
        <Gallery />
        <About />
      </div>
    </div>
  );
}

export default App;