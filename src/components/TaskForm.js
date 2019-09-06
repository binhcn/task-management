import React, { Component } from 'react';

class TaskForm extends Component {
	render() {
		return (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">
						Add your task
              <span
							className="fa fa-times-circle text-right"
						></span>
					</h3>
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
							<label>Name: </label>
							<input
								type="text"
								className="form-control"
								name="name"
							/>
						</div>

						<label>Status: </label>
						<select
							className="form-control"
							name="status"
						>
							<option value={true}>Active</option>
							<option value={false}>Hidden</option>
						</select><br />

						<div className="text-center">
							<button type="submit" className="btn btn-warning">
								<span className="fa fa-plus mr-5"></span>Save
                  </button>&nbsp;
                  <button type="button" className="btn btn-danger">
								<span className="fa fa-close mr-5"></span>Cancel
                  </button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default TaskForm;
