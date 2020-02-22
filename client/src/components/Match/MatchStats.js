import React, { useEffect, useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';
import { Container, Grid, Segment, Table } from 'semantic-ui-react';
import { zonedTimeToUtc, format, utcToZonedTime } from 'date-fns-tz';
import { addDays, eachDayOfInterval, max, parse, parseISO } from 'date-fns';
import { useData, useTitle } from '../../hooks';
import { Button, Loader } from '../UI';
import MatchHeader from './MatchHeader';

Chart.defaults.global.defaultFontFamily = "'marcher-regular', sans-serif";
Chart.defaults.global.defaultFontSize = 13;
Chart.defaults.global.defaultFontColor = 'rgba(10,10,10,.75)';

const MatchStats = props => {
  const { location: { state: { matchId = undefined } = {} } = {} } = props;

  const initialState = {
    dirty: false,
    matchId: matchId
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'REFRESH':
        return {
          ...state,
          dirty: !state.dirty // toggle dirty (for api refresh)
        };
      default:
        return state;
    }
  }, initialState);

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
    <Container as="section" className="page medium" fluid id="match-stats">
      {(error && <pre>{JSON.stringify(error, null, 4)}</pre>) ||
        (showLoader && <Loader />) || (
          <Stats
            {...stats}
            refreshing={loading}
            onRefresh={() => dispatch({ type: 'REFRESH' })}
          />
        )}
    </Container>
  );
};

const Stats = props => {
  const {
    onRefresh,
    options: { duration, itemsPerBoard },
    refreshing,
    title,
    termCount,
    terms,
    totals: { plays = 0, avgScore = 0, avgHitRate = 0 } = {}
  } = props;

  return (
    <div className="content-wrapper">
      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <nav>
              <Button
                as={Link}
                disabled={refreshing}
                icon="back"
                labelPosition="left"
                size="tiny"
                tabIndex={-1}
                to={{
                  pathname: '/dashboard',
                  state: { from: 'MATCH' }
                }}
                type="button"
              >
                BACK
              </Button>
              <Button
                floated="right"
                icon="refresh-cw"
                labelPosition="right"
                loading={refreshing}
                onClick={onRefresh}
                size="tiny"
                tabIndex={1}
                type="button"
              >
                REFRESH
              </Button>
            </nav>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Segment>
              <MatchHeader
                content={title}
                duration={duration}
                itemsPerBoard={itemsPerBoard}
                termCount={termCount}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="3" stretched>
          <Grid.Column textAlign="center">
            <Segment className="stat-total" disabled={!plays}>
              <span>{plays.toLocaleString()}</span>
              <span>Total Plays</span>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Segment className="stat-total" disabled={!avgHitRate}>
              <span>{+avgHitRate.toFixed(1)}%</span>
              <span>Avg. Hit Rate</span>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Segment className="stat-total" disabled={!avgScore}>
              <span>{+avgScore.toFixed(2)}</span>
              <span>Avg. Score</span>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <PingChart {...props} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TermTable id="terms-table" terms={terms} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default MatchStats;

let pingChart;

const PingChart = ({ createDate, pings = [] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let end, maxTick, minTick, playsByDay, start, x, y, yMax;

    function renderChart() {
      if (typeof pingChart !== 'undefined') pingChart.destroy();
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

      end = zonedTimeToUtc(
        Date.now(),
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      playsByDay = pings.reduce((accum, i) => {
        accum[i.day] = i.plays;
        return accum;
      }, []);
      x = eachDayOfInterval({
        start: utcToZonedTime(start, 'UTC'),
        end: utcToZonedTime(end, 'UTC')
      }).map(day => format(day, 'MM/dd/yyyy'));

      y = x.map(day => playsByDay[day] || 0);
      yMax = Math.max(...y);
      minTick = format(addDays(utcToZonedTime(start, 'UTC'), -1), 'MM/dd/yyyy');
      maxTick = format(addDays(utcToZonedTime(end, 'UTC'), 1), 'MM/dd/yyyy');
      pingChart = new Chart(canvasRef.current, {
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
              backgroundColor: 'rgba(170, 84, 255, .15)',
              borderColor: 'rgba(113, 28, 255, .75)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(113, 28, 255, 1.0)',
              hoverBorderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            fontSize: 18,
            fontStyle: 'normal',
            fontFamily: "'marcher-medium', sans-serif",
            lineHeight: 1.3,
            position: 'top',
            text: 'Daily Activity'
          },
          tooltips: {
            callbacks: {
              title: function(tooltipItem) {
                return format(
                  zonedTimeToUtc(
                    parse(tooltipItem[0].xLabel, 'MM/dd/yyyy', new Date()),
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  ),
                  'EEE, LLL do'
                );
              }
            }
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
                  fontSize: 12,
                  max: maxTick,
                  maxRotation: 180,
                  maxTicksLimit: 5,
                  min: minTick,
                  minRotation: 0
                },
                time: {
                  unit: 'week',
                  parser: 'MM/DD/YYYY',
                  isoWeekday: true,
                  displayFormats: {
                    week: 'ddd, MMM D'
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
                  fontSize: 12,
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
    <Segment
      disabled={!pings.length}
      id="plays-bar-chart"
      padded
      style={{ backgroundColor: '#fff' }}
    >
      <canvas ref={ref => (canvasRef.current = ref)} />
    </Segment>
  );
};

const TermTable = ({ id, terms }) => {
  const renderHtml = value => (
    <span
      dangerouslySetInnerHTML={{ __html: value.replace(/(^")|("$)/g, '') }}
    />
  );

  const renderRows = ({ terms }) => {
    return terms.map(val => {
      const { term, hits, misses, hitRate } = val;
      const rateStrata =
        hitRate <= 60 ? 'negative' : hitRate <= 80 ? 'warning' : 'positive';
      const rateProp =
        rateStrata === 'negative'
          ? { negative: true }
          : rateStrata === 'warning'
          ? { warning: true }
          : { positive: true };

      return (
        <Table.Row key={term}>
          <Table.Cell content={renderHtml(term)} />
          <Table.Cell textAlign="center">{hits.toLocaleString()}</Table.Cell>
          <Table.Cell textAlign="center">{misses.toLocaleString()}</Table.Cell>
          <Table.Cell textAlign="center" {...rateProp}>
            {hitRate}%
          </Table.Cell>
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
            <Table.HeaderCell width={7}>Term</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={3}>
              Hits
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={3}>
              Misses
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={3}>
              Hit Rate
            </Table.HeaderCell>
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
