import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fact from '../components/Fact';
import InputCheckBox from '../components/InputCheckBox';

// import './Feed.less';

const DownloadButton = ({ data, filename, label }) => {
  const blob = new Blob([data], { type: 'application/msword' });
  console.log('Blob is ready for data', data);
  const fileData = window.URL.createObjectURL(blob);
  return (
    <div className="btn-group">
    <a href={fileData} rel='noopener noreferer' target='_blank' download={filename} className="btn btn-default btn-sm">
    {label}
    </a>
    <a className="btn btn-default btn-sm"> PDF </a>
    </div>
  );
};


class Feed extends Component {

  state = {}

  formatFactForExport = fact =>
`${fact.nameRu} ${fact.date}
${fact.description}
`

  // formatFactForExport = fact => <Fact fact={fact} persons={this.props.persons.byId} />

  prepareForExport = (selected) =>
    Object.keys(selected).reduce((prev, stateId) => {
      if (selected[stateId] === 1) {
        const factId = stateId.split(/_/)[1];
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


  render() {
    return (
      <div className='feed'>
        <h3> Лента событий </h3>
        <div>{this.props.currentFacts.map((year, yearId) => year.map(factId =>
                  <div key={`div_${factId}`}>
                    <InputCheckBox
                      name={`${yearId}_${factId}`}
                      checked={false}
                      cb={this.handleChange}
                    />
                    <Fact fact={this.props.facts.byId[factId]} persons={this.props.persons.byId} />
                  </div>
                ))}</div>
        <DownloadButton
          filename="facts.doc"
          label="Экспорт в doc"
          data={this.state.exported}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { facts: state.facts, currentFacts: state.timeline.facts.current, persons: state.persons };
}

export default connect(mapStateToProps)(Feed);
