import React, { Component } from "react";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import axios from "axios";
import Loading from "./Loading";

class App extends Component {
  state = {
    authors: [],
    currentAuthor: null,
    filteredAuthors: [],
    loading: true
  };
  fetchAuthors = async () => {
    try {
      let response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );

      this.setState({
        authors: response.data,
        filteredAuthors: response.data,
        loading: false
      });
    } catch (errors) {
      console.error(errors);
    }
  };

  componentDidMount() {
    this.fetchAuthors();
  }

  //selectAuthor = author => this.setState({ currentAuthor: author });
  selectAuthor = async authorId => {
    try {
      let response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${authorId}/`
      );
      this.setState({ currentAuthor: response.data, loading: false });
    } catch (errors) {
      console.error(errors);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <div>
          <AuthorsList
            auth={this.state.authors}
            authors={this.state.filteredAuthors}
            selectAuthor={this.selectAuthor}
            filterAuthors={this.filterAuthors}
            loading={this.state.loading}
          />
        </div>
      );
    }
  };

  // handleLoading = () => {
  //   if (this.state.loading) {
  //     return <div>Loading</div>;
  //   } else {
  //     return this.getContentView();
  //   }
  // };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>

          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
