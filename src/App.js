import './App.css';
import TaskHeadline from './components/TaskHeadline';

function App() {
  return (
    <>
      <div className="task-container">
        <TaskHeadline />
        {/* <div className="task-wrapper">
          <AddTask />
          <TaskContent />
        </div> */}
      </div>
      {/* <Toaster
      position="bottom-center"    
        style={{
          fontSize: "1.4rem"
        }}
      /> */}
    </>
  );
}

export default App;
