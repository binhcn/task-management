import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input
              name="keyword"
              type="text"
              className="form-control"
              placeholder="Type your keyword..."
            />
            <span class="input-group-btn">
              <button type="button" class="btn btn-primary">
                <span className="fa fa-search mr-5"></span>Search
            </button>
            </span>
          </div>
        </div>
    );
  }
}
export default Search;
