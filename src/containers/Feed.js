import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Fact from '../components/Fact';
import { selectLocation } from '../reducers/status';

import './Feed.less';

const DownloadButton = ({ data, filename, label }) => {
  const blob = new Blob([data], { type: 'application/msword' });
  console.log('Blob is ready for data', data);
  const fileData = window.URL.createObjectURL(blob);
  return (
    <div className="btn-group">
      <a href={fileData} rel='noopener noreferer' target='_blank' download={filename} className="btn  btn-default btn-sm">
      {label}
      </a>
    </div>
  );
};


class Feed extends Component {

  state = {
    selected: {},
    exported: []
  }

  formatFactForExport = fact =>
`${fact.nameRu} ${fact.date}
${fact.description}
`

  // formatFactForExport = fact => <Fact fact={fact} persons={this.props.persons.byId} />

  prepareForExport = (selected) =>
    Object.keys(selected).reduce((prev, stateId) => {
      if (selected[stateId] === true) {
        const factId = stateId;
        return [...prev, this.formatFactForExport(this.props.facts.byId[factId])];
      }
      return prev;
    }, [])

  handleChange = (data) => {
    console.log('have new data in handle change', data);
    const selected = { ...this.state.selected, ...data };
    const exported = this.prepareForExport(selected);
    this.setState({ selected, exported });
  }
  handleHover = (factId) => {
    this.props.selectLocation(factId);
  }


  render() {
    return (
      <div className='feed'>
        <h3> Лента событий </h3>
        <div className='feedFact'>{this.props.currentFacts.map((year, yearId) => year.map(factId =>
          <div
            key={`div_${factId}`}
            onMouseEnter={() => this.handleHover(factId)}
            onMouseLeave={() => this.handleHover(null)}
            onClick={() => this.handleChange({ [factId]: !this.state.selected[factId] })}
            className={this.state.selected[factId] === true
              ? 'selectedFact' : 'regularFact'}
          >
            <Fact fact={this.props.facts.byId[factId]} persons={this.props.persons.byId} />
          </div>
        ))}</div>
        <DownloadButton
          filename="facts.doc"
          label="Экспорт в doc"
          data={this.state.exported}
        />
        <DownloadButton
          filename="facts.pdf"
          label="Экспорт в pdf"
          data={this.state.exported}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { facts: state.facts, currentFacts: state.timeline.facts.current, persons: state.persons };
}
function mapDispatchToProps(dispatch) {
  return {
    selectLocation: bindActionCreators(selectLocation, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
