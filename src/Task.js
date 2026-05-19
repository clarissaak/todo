import './styles/Task.css';

function Task() {
  return (
    <div className="task ${this.createTask(this.task)}">
      <input type="checkbox"/>
      <p>desc</p>
    </div>
  );
}
export default Task;