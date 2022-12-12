import { Component } from "react";
import "./App.css";
import CardList from "../src/components/card-list/card-list.component.jsx";
import SearchBox from "../src/components/search-box/search-box.component.jsx";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  //this will re-render the component after it makes a fetch call to get the names of monsters
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  //moved code here to help with optimization and initializing this just once
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    // console.log("render form App.js");

    //destructuring to help with optimization of code
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    //filters monsters into a NEW array
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox
          className="search-box"
          placeholder="search monsters"
          onChangeHandler={onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
