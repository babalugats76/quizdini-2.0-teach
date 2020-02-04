import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { Container, Grid, Header, Label, Segment } from 'semantic-ui-react';
import { useData, useTitle } from '../../hooks';
import { Icon, Loader } from '../UI';
import { zonedTimeToUtc } from 'date-fns-tz';
import { addDays, eachDayOfInterval, format, max, parseISO } from 'date-fns';

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
    <Container as="main" className="page medium" fluid id="match-stats">
      {(error && <pre>{JSON.stringify(error, null, 4)}</pre>) ||
        (showLoader && <Loader />) || <TestChart {...stats} />}
    </Container>
  );
};

const TestChart = props => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let end, maxTick, minTick, playsByDay, start, x, y, yMax;

    if (typeof myChart !== 'undefined') myChart.destroy();

    if (props.pings && props.pings.length > 0) {
      start = max([
        zonedTimeToUtc(
          addDays(new Date(), -30),
          Intl.DateTimeFormat().resolvedOptions().timeZone
        ),
        zonedTimeToUtc(
          parseISO(props.createDate),
          Intl.DateTimeFormat().resolvedOptions().timeZone
        )
      ]);
      console.log(start);
      console.log(format(start, 'MM/dd/yyyy'));
      end = zonedTimeToUtc(
        new Date(),
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      console.log('end in utc', end);
      console.log(format(end, 'MM/dd/yyyy'));
      playsByDay = props.pings.reduce((accum, i) => {
        accum[i.day] = i.plays;
        return accum;
      }, []);
      x = eachDayOfInterval({
        start: start,
        end: end
      }).map(day => format(day, 'MM/dd/yyyy'));
      console.log(x);
      y = x.map(day => playsByDay[day] || 0);
      console.log(y);
      yMax = Math.max(...y);
      minTick = format(addDays(start, -1), '"MM/dd/yyyy"');
      maxTick = format(addDays(end, 1), '"MM/dd/yyyy"');
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
    <div className="content-wrapper">
      <Grid divided>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Segment>
              <Header size="medium">
                <Icon name="question" />
                <Header.Content className="game-title">
                  {props.title}
                </Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center">
            <Segment className="stat-total">
              <span className="stat-value">{props.totals.plays}</span>
              <span className="stat-label">Plays</span>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Segment className="stat-total">
              <span className="stat-value">{props.totals.avgScore}</span>
              <span className="stat-label">Avg. Score</span>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment
              id="plays-bar-chart"
              padded
              style={{ backgroundColor: '#fff' }}
            >
              <canvas ref={ref => (canvasRef.current = ref)} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <pre>{JSON.stringify(props, null, 4)}</pre>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default MatchStats;
