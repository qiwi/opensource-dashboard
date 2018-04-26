import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import stats from '../controllers/actions/stats'
import projectList from '../controllers/actions/projectList'
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

class MainComponent extends Component {
  constructor(...args) {
    super(...args)

    projectList.getProjectList()
    stats.getStats()
  }
  render() {
    const statsData = this.props.stats
    const projectList = this.props.projectList

    if (statsData) {
      options.series = [{
        name: 'Coverage',
        data: statsData.data.coverage.map(({date, covered_percent}) => [new Date(date).getTime(), covered_percent])
      }, {
        name: 'Build',
        data: statsData.data.builds.map(({date, success}) => [new Date(date).getTime(), success ? success * 100 : null])
      }, {
        name: 'Debt',
        data: statsData.data.climate.map(({date, debtRatio}) => [new Date(date).getTime(), debtRatio])
      }]
    }

    return <div>
      <h3>github.com/qiwi pulse</h3>
      {
        statsData
          ? <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        : null
      }
      {
        projectList
          ? projectList.data.map(({name}) => (<li><a href={'/project/' + name}>{name}</a></li>))
          : null
      }

    </div>
  }
}

export default connect(({stats, projectList}) => ({stats, projectList}))(MainComponent);
