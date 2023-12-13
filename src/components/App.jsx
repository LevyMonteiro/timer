import '../styles/App.css';
import Display from './Display';
import Controls from './Controls';
import { Footer } from './footer';

export default function App() {
  return (
    <div className='wrapper'>
      <Display />
      <Controls />
      <Footer />
    </div>
  );
}

export {};
