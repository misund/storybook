import React from 'react';
import styled from 'react-emotion';

import { Link, Location, Match } from '../router';

import Heading from '../heading/heading';

const Container = styled('nav')({
  background: 'silver',
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
});
const Inner = styled('div')({
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  padding: 10,
  overflow: 'auto',
  minHeight: '100%',
  boxSizing: 'border-box',
});

const Head = styled('div')({});
const Main = styled('div')({
  flex: 1,
  marginTop: 20,
});
const Foot = styled('div')({});

const Bar = styled('ul')({
  display: 'flex',
  margin: 0,
  padding: 0,
  borderRadius: 5,
  overflow: 'hidden',
  background: 'gray',
  justifyContent: 'space-between',
  height: 40,
  marginTop: 20,
});

const BarLi = styled('li')(({ active }) => ({
  display: 'block',
  margin: 0,
  padding: 0,
  flex: 1,
  background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
  borderTop: '2px solid transparent',
  borderBottom: active ? '2px solid hotpink' : '2px solid transparent',

  '& > a': {
    cursor: 'pointer',
    color: 'inherit',
    display: 'block',
    padding: 10,
    textAlign: 'center',
  },
}));

const BarItem = ({ path, children, active }) => (
  <BarLi active={active}>
    <Link to={path}>{children}</Link>
  </BarLi>
);

const Notifications = styled('ul')({
  position: 'absolute',
  display: 'block',
  bottom: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  zIndex: 2,
});
const Notification = styled('li')({
  margin: 0,
  padding: 0,
  display: 'flex',
  height: 50,
  marginTop: 10,
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 0, 0, 0.4)',
});
const NotificationSpacer = styled('div')({
  height: 60,
});

const A = styled('a')({
  color: 'inherit',
  textDecoration: 'none',
});

const Nav = ({ title, url, notifications = [], sections = [] }) => (
  <Container>
    <Inner>
      <Head>
        <Heading>
          <A href={url}>{title}</A>
        </Heading>
        {sections.length ? (
          <Bar>
            {sections.map(({ id, name, path }) => (
              <Match key={id} path={path}>
                {({ match }) => (
                  <BarItem key={id} active={match} path={path}>
                    {name}
                  </BarItem>
                )}
              </Match>
            ))}
          </Bar>
        ) : null}
      </Head>
      <Main>
        {sections.map(({ id, path, nav: render }) => (
          <Match key={id} path={path}>
            {({ match }) => (match ? render() : null)}
          </Match>
        ))}
      </Main>
      <Foot>
        {notifications.map(({ id }) => (
          <NotificationSpacer key={id} />
        ))}
      </Foot>
    </Inner>
    {notifications.length ? (
      <Notifications>
        {notifications.map(({ id, content }) => (
          <Notification key={id}>{content}</Notification>
        ))}
      </Notifications>
    ) : null}
  </Container>
);

export { Nav };