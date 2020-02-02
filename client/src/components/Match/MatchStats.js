import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { Container } from 'semantic-ui-react';
import { useData, useTitle } from '../../hooks';
import { Loader } from '../UI';
const { addDays, eachDayOfInterval, format, max, parse } = require('date-fns');

let myChart;

const MatchStats = props => {
  const { location: { state: { matchId = undefined } = {} } = {} } = props;

  // local state - dirty toggle
  const [state, setState] = useState({
    dirty: false,
    matchId: matchId
  });

  // API data
  const { data: stats, error, initialized, loading } = useData({
    url: '/api/match/stats/' + state.matchId,
    deps: [state.matchId, state.dirty]
  });

  // set page title
  useTitle({
    title: state.matchId ? (stats ? stats.title : 'Loading...') : '',
    deps: [state.matchId]
  });

  const showLoader = !initialized && (loading || !stats);

  return (
    <Container as="main" className="page large" fluid id="match-stats">
      {(error && <pre>{JSON.stringify(error, null, 4)}</pre>) ||
        (showLoader && <Loader />) || <TestChart {...stats} />}
    </Container>
  );
};

const TestChart = props => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let chartRange,
      dateRange,
      labels,
      createDate,
      maxBound,
      minBound,
      startDate,
      values;

    if (typeof myChart !== 'undefined') myChart.destroy();

    if (props.last30 && props.last30.length > 0) {
      createDate = parse(props.createDate, 'MM/dd/yyyy', new Date());
      startDate = max([addDays(Date.now(), -30), createDate]);
      dateRange = props.last30.reduce((accum, item) => {
        accum[item.day] = item.plays;
        return accum;
      }, []);
      chartRange = eachDayOfInterval({
        start: startDate,
        end: Date.now()
      }).map(day => format(day, 'MM/dd/yyyy'));
      values = chartRange.map(item => dateRange[item] || 0);
      minBound = format(addDays(startDate, -1), '"MM/dd/yyyy"');
      maxBound = format(addDays(Date.now(), 1), '"MM/dd/yyyy"');
    }

    myChart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        //Bring in data
        labels: chartRange,
        datasets: [
          {
            label: 'Plays',
            fill: false,
            spanGaps: true,
            showLine: true,
            steppedLine: false,
            lineTension: 0.1,
            data: values
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Sample Chart'
        },
        animation: {
          easing: 'linear'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true
              },
              distribution: 'linear',
              type: 'time',
              ticks: {
                min: minBound,
                max: maxBound
              },
              time: {
                unit: 'week',
                parser: 'MM/DD/YYYY',
                round: true,
                isoWeekday: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }
          ],
          yAxes: [
            {
              ticks: { beginAtZero: true }
            }
          ]
        }
      }
    });
  }, [props.last30, props.createDate]);
  return (
    <div>
      <pre>{JSON.stringify(props, null, 4)}</pre>
      <canvas ref={ref => (canvasRef.current = ref)} />
    </div>
  );
};

export default MatchStats;
