import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      searchInput: '',
      disPlayQ: []
    })

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handledisplayQ = this.handledisplayQ.bind(this);
    this.findMatchedQ = this.findMatchedQ.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSearchInput(event) {
    event.preventDefault();
    var input = event.target.value;
    if(input.length < 3) {
      return;
    } else {
      this.setState({
        searchInput: input
      });
    }
  }


  handledisplayQ(input) {
    console.log('input in Search: ', input)
    if(input === '') {
      return;
    } else {
      var matchedQ = this.findMatchedQ(input);
      this.setState ({
        disPlayQ: matchedQ
      })
    }
  }

  findMatchedQ(input) {
    console.log('test findMatched')
    var matchedQ = [];
    var matchedA = []
    var questions = this.props.questions;
    for (var i = 0; i < questions.length; i++) {
      var lowerInput = input.toLowerCase();
      var lowerquestion = questions[i].question_body.toLowerCase();
      if(lowerquestion.includes(lowerInput)) {
        matchedQ.push(questions[i])
      }
    }
    return matchedQ;
  }

  handleClick() {
    this.handledisplayQ(this.state.searchInput);
  }

  render() {
    console.log(this.state.disPlayQ);
    console.log('if this.state.displayQ is array: ', Array.isArray(this.state.disPlayQ));
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem", margin: "15px"};
    return (
      <>
        <div>
          <input className="search-field" type="text" placeholder="Have a question? Search for answers…" style={BarStyling} onChange={(event) => { this.handleSearchInput(event) }}></input>
          <button onClick = {this.handleClick}>submit question</button>
        </div>
        <div>
          {/* {this.state.disPlayQ} */}
          {this.state.disPlayQ.map(
            q =>
            <div>
              matched Q:
              <li key={q.question_id}>
                {q.question_body}
                <br />
                Answers:
              </li>
              <div key={q.question_id}>
                {Object.values(q.answers).map(
                  a =>
                  <li>{a.body}</li>
                )}
              </div>
            </div>
          )
            }
        </div>
      </>
    )
  }

}

export default Search;