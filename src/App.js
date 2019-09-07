import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import {findIndex} from 'lodash';

class App extends Component {

  constructor(props) {
    super(props);
    var tasks = [];
    if (localStorage && localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    this.state = {
      tasks,
      isDisplayForm: false,
      taskEditing: null,         //Based on taskEditing to know TaskForm is add or modify
      filterName: '',
      filterStatus: -1,
      keyword: '',
      sortBy: 'name',         // shouldn't object type
      sortValue: 1
    }
  }

  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateId(),
        name: 'Learn programming',
        status: true
      },
      {
        id: this.generateId(),
        name: 'Go swimming',
        status: false
      },
      {
        id: this.generateId(),
        name: 'Go to bed',
        status: true
      }
    ];
    this.setState({
      tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateId() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({             //TaskForm: modify --> add
        isDisplayForm: true,
        taskEditing: null
      });
    }else{
      this.setState({             
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onSubmit = (data) => {
    // console.log(typeof data.status);
    // console.log(typeof "true");
    var {tasks} = this.state;
    if (data.id === '') {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }    
    this.setState({
      tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var {tasks} = this.state;
    var index = findIndex(tasks, task => {
      return task.id === id;
    });
    if (index > -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id)
        result = index;
    });
    return result;
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if (index > -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
        filterName: filterName.toLowerCase(),
        filterStatus
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword
    });
  }

  onSort = (sortBy, sortValue) => {
    this.setState({             // Nhận từ state component dưới rồi chuyền props trở lại
        sortBy,
        sortValue
    })
  }

  render() {
    var { tasks, isDisplayForm, taskEditing, filterName, filterStatus, keyword, sortBy, sortValue } = this.state;
    if (filterName) {            // !== null !== 0 !== undefined
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(filterName) !== -1;
      });
    }        
    tasks = tasks.filter(task => {
      if (filterStatus === -1) return task;
      else return task.status === (filterStatus === 1 ? true : false);
    });
    if (keyword) {            
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      });
    }

    var elmTaskForm = isDisplayForm 
      ? <TaskForm 
          onSubmit={this.onSubmit} 
          onCloseForm={this.onCloseForm}
          task={taskEditing}
        /> 
      : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Management</h1><hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : 'col-xs-0 col-sm-0 col-md-0 col-lg-0'}>
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Add your task
            </button>
            <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
              Generate sample data
            </button>
            <TaskControl 
                onSearch={this.onSearch} 
                onSort={this.onSort}
                sortBy={sortBy}
                sortValue={sortValue}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  tasks={tasks} 
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
