import './App.css';
import AddTask from './components/AddTask';
import TaskContent from './components/TaskContent';
import TaskHeadline from './components/TaskHeadline';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="task-container">
        <TaskHeadline />
        <div className="task-wrapper">
          <AddTask />
          <TaskContent />
        </div>
      </div>
      <Toaster
      position="bottom-center"    
        style={{
          fontSize: "1.4rem"
        }}
      />
    </>
  );
}

export default App;
