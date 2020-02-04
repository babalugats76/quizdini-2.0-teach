import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import {
  Container,
  Grid,
  Header,
  Segment,
  Table,
  Pagination
} from 'semantic-ui-react';
import { useData, useTitle } from '../../hooks';
import { Icon, Loader } from '../UI';
import { zonedTimeToUtc, format, utcToZonedTime } from 'date-fns-tz';
import { addDays, eachDayOfInterval, max, parseISO } from 'date-fns';

let myChart;
Chart.defaults.global.defaultFontFamily = "'Lexend Deca', sans-serif";
Chart.defaults.global.defaultFontSize = 13;

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
  const {
    title,
    createDate,
    pings = [],
    terms,
    totals: { plays = 0, avgScore = 0, avgHitRate = 0 } = {}
  } = props;

  useEffect(() => {
    let end, maxTick, minTick, playsByDay, start, x, y, yMax;

    function renderChart() {
      if (typeof myChart !== 'undefined') myChart.destroy();
      /*       if (pings && !pings.length) return; */
      start = max([
        zonedTimeToUtc(
          addDays(Date.now(), -30),
          Intl.DateTimeFormat().resolvedOptions().timeZone
        ),
        zonedTimeToUtc(
          parseISO(createDate),
          Intl.DateTimeFormat().resolvedOptions().timeZone
        )
      ]);
      /*       console.log("start", format(utcToZonedTime(start, "UTC"), "MM/dd/yyyy"));
        console.log("start-1", format(addDays(utcToZonedTime(start, "UTC"), -1), "MM/dd/yyyy")); */

      end = zonedTimeToUtc(
        Date.now(),
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      /*       console.log("end", format(utcToZonedTime(end, "UTC"), "MM/dd/yyyy"));
        console.log("end+1", format(addDays(utcToZonedTime(end, "UTC"), 1), "MM/dd/yyyy")); */

      playsByDay = pings.reduce((accum, i) => {
        accum[i.day] = i.plays;
        return accum;
      }, []);
      x = eachDayOfInterval({
        start: utcToZonedTime(start, 'UTC'),
        end: utcToZonedTime(end, 'UTC')
      }).map(day => format(day, 'MM/dd/yyyy'));

      console.log(x);
      y = x.map(day => playsByDay[day] || 0);
      console.log(y);
      yMax = Math.max(...y);
      minTick = format(addDays(utcToZonedTime(start, 'UTC'), -1), 'MM/dd/yyyy');
      console.log(minTick);
      maxTick = format(addDays(utcToZonedTime(end, 'UTC'), 1), 'MM/dd/yyyy');
      console.log(maxTick);
      myChart = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: x,
          datasets: [
            {
              label: 'Plays',
              data: y,
              barThickness: 'flex',
              maxBarThickness: 40,
              minBarLength: 2,
              backgroundColor: 'rgba(255,0,0,1.0)'
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            fontFamily: "'marcher-medium', sans-serif",
            fontSize: 18,
            fontStyle: 'normal',
            lineHeight: 1.3,
            position: 'top',
            text: 'Daily Game Plays'
          },
          legend: {
            display: true
          },
          animation: {
            easing: 'easeInQuart'
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
                  labelString: 'Date (GMT/UTC)'
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
                  suggestedMax: Math.max(yMax + yMax / 5, 10)
                }
              }
            ]
          }
        }
      });
    }
    renderChart();
  }, [pings, createDate]);

  return (
    <div className="content-wrapper">
      <Grid stackable>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Segment>
              <Header size="medium">
                <Icon name="question" />
                <Header.Content className="game-title">{title}</Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="3" stretched>
          <Grid.Column textAlign="center">
            <Segment className="stat-total" disabled={!plays}>
              <span className="stat-value">{plays.toLocaleString()}</span>
              <span className="stat-label">Total Plays</span>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Segment className="stat-total" disabled={!avgHitRate}>
              <span className="stat-value">{+avgHitRate.toFixed(2)}%</span>
              <span className="stat-label">Avg. Hit Rate</span>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Segment className="stat-total" disabled={!avgScore}>
              <span className="stat-value">{+avgScore.toFixed(2)}</span>
              <span className="stat-label">Avg. Score</span>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment
              disabled={!pings.length}
              id="plays-bar-chart"
              padded
              style={{ backgroundColor: '#fff' }}
            >
              {!pings.length && <span>No Recent Activity...</span>}
              <canvas
                // style={{ ...(!pings.length ? { display: "none" } : null) }}
                ref={ref => (canvasRef.current = ref)}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TermTable id="terms-table" terms={terms} />
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

const TermTable = ({ id, terms }) => {
  const renderHtml = value => (
    <span
      dangerouslySetInnerHTML={{ __html: value.replace(/(^")|("$)/g, '') }}
    />
  );

  const renderRows = ({ terms }) => {
    return terms.map(val => {
      const { term, hits, misses, hitRate } = val;

      return (
        <Table.Row key={term}>
          <Table.Cell content={renderHtml(term)} />
          <Table.Cell textAlign="center">{hits}</Table.Cell>
          <Table.Cell textAlign="center">{misses}</Table.Cell>
          <Table.Cell textAlign="center">{+hitRate.toFixed(2)}%</Table.Cell>
        </Table.Row>
      );
    });
  };

  const rows = renderRows({ terms });

  return (
    <Segment id={id} disabled={!terms.length}>
      <Table celled compact="very" striped>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Term</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Hits</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Misses</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Hit Ratio</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {terms.length > 0 ? (
            rows
          ) : (
            <Table.Row>
              <Table.Cell>No terms...</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Segment>
  );
};
