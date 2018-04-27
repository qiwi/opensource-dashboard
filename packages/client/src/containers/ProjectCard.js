import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import stats from '../controllers/actions/stats'
import project from '../controllers/actions/project'
import { connect } from 'react-redux';

const options = {
  title: {
    text: ''
  },
  chart: {
    type: 'spline'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
      month: '%e. %b',
      year: '%b'
    },
    title: {
      text: 'Date'
    }
  },
  yAxis: {
    title: {
      text: 'Value, %'
    },
    min: 0,
    max: 100
  },
  series: [{
    data: []
  }]
}

class ProjectCardComponent extends Component {
  constructor(...args) {
    super(...args)
    const {project_name} = this.props.match.params;

    project.getProject(project_name)
  }
  render() {
    const {project_name} = this.props.match.params;
    const projectData = this.props.project

    if (projectData) {
      options.series = [{
        name: 'Coverage',
        data: projectData.data.coverage.map(({date, covered_percent}) => [new Date(date).getTime(), covered_percent])
      }, {
        name: 'Build',
        data: projectData.data.builds.map(({date, success}) => [new Date(date).getTime(), success === null ? null : +success * 100])
      }, {
        name: 'Debt',
        data: projectData.data.climate.map(({date, debtRatio}) => [new Date(date).getTime(), debtRatio])
      }]
    }

    return <div>
      <h3>github.com/qiwi/{project_name}</h3>
      {
        projectData
          ? <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
          : null
      }

    </div>
  }
}

export default connect(({project}) => ({project}))(ProjectCardComponent);
