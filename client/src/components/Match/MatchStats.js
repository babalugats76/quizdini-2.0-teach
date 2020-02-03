import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { Container, Segment } from 'semantic-ui-react';
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
    let createDate, maxTick, minTick, playsByDay, startDate, x, y, yMax;

    if (typeof myChart !== 'undefined') myChart.destroy();

    if (props.pings && props.pings.length > 0) {
      createDate = parse(props.createDate, 'MM/dd/yyyy', new Date());
      startDate = max([addDays(Date.now(), -30), createDate]);
      playsByDay = props.pings.reduce((accum, i) => {
        accum[i.day] = i.plays;
        return accum;
      }, []);
      x = eachDayOfInterval({ start: startDate, end: Date.now() }).map(day =>
        format(day, 'MM/dd/yyyy')
      );
      console.log(x);
      y = x.map(day => playsByDay[day] || 0);
      console.log(y);
      yMax = Math.max(...y);
      minTick = format(addDays(startDate, -1), '"MM/dd/yyyy"');
      maxTick = format(addDays(Date.now(), 1), '"MM/dd/yyyy"');
    }

    myChart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: x,
        datasets: [
          {
            label: 'Plays',
            data: y,
            barThickness: 'flex',
            backgroundColor: 'rgba(255,0,0,1.0)'
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Game Plays By Day'
        },
        animation: {
          easing: 'easeInOutQuart'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                offsetGridLines: false
              },
              type: 'time',
              ticks: {
                min: minTick,
                max: maxTick
              },
              time: {
                unit: 'week',
                parser: 'MM/DD/YYYY',
                isoWeekday: true,
                displayFormats: {
                  week: 'ddd, MMM Do'
                }
              },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }
          ],
          yAxes: [
            {
              type: 'linear',
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                precision: 0,
                suggestedMax: yMax + yMax / 5
              }
            }
          ]
        }
      }
    });
  }, [props.pings, props.createDate]);
  return (
    <div>
      <Segment padded style={{ backgroundColor: '#fff' }}>
        <canvas ref={ref => (canvasRef.current = ref)} />
      </Segment>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </div>
  );
};

export default MatchStats;
