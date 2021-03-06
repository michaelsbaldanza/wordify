import React, { Component } from "react";
import { getWordId } from "../../services/API";
import storageService from "../../services/storageService";
import Definition from "../Definition/Definition";
import "./API";

export class API extends Component {
  state = {
    id: "Welcome",
    definition: "Search for a word and find its definition",
    search: "",
  };

  async componentDidMount() {
    let WordId = await getWordId();
    console.log(WordId[0].meta.id);
    console.log(WordId[0].shortdef);
    console.log("i mounted");
  }

  handleChange = async (e) => {
    e.preventDefault();
    console.log("handleChange ran");
    console.log(e.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit ran");
    console.log(e.target.search.value);

    const search = e.target.search.value;
    let WordId = await getWordId(search);
    console.log(WordId[0].meta.id);
    console.log(WordId[0]);
    console.log(WordId[0].shortdef);
    const id = WordId[0].meta.id;
    const definition = WordId[0].shortdef;

    let stringId = id.toString();
    var newId;
    var colon;
    if (stringId.includes(":")) {
      colon = id.indexOf(":");
      newId = stringId.slice(0, colon);
      this.setState({
        id: newId,
        definition: definition,
      });
    } else {
      console.log("word doesnt have a colon");
      this.setState({
        id: id,
        definition: definition,
      });
    }
  };

  handleSave = (e) => {
    console.log("I ran handleSave");
    console.log(this.state.id);
    const savedWord = this.state;
    storageService.save(savedWord);
  };

  render() {
    {
      if (this.props.user) {
        return (
          <div className="container">
            <div className="left-side">
              <span className="other-title">Search</span>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    className="title-input"
                    type="text"
                    placeholder="search"
                    name="search"
                    onChange={this.handleChange}
                  />
                  <input type="submit" name="submit" className="submit-save" />
                </div>
              </form>
              {this.state.id} <br />
              <button onClick={this.handleSave} className="submit-save">
                Save
              </button>
            </div>
            <div className="right-side">
              <div className="def-container">
                <span>{this.state.id}</span>
                <Definition definition={this.state.definition} />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="left-side">
              <span className="other-title">Search</span>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    className="title-input"
                    type="text"
                    placeholder="search"
                    name="search"
                    onChange={this.handleChange}
                  />
                  <input type="submit" name="submit" className="submit-save" />
                </div>
              </form>
              {this.state.id} <br />
            </div>
            <div className="right-side">
              <div className="def-container">
                <span>{this.state.id}</span>
                <Definition definition={this.state.definition} />
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default API;
