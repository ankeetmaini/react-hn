import React from 'react';
import PropTypes from 'prop-types';

import { getTimeAgo } from 'utils/time';

import styles from './Story.scss';

const Story = props => (
  <div className={styles.story}>
    <div>
      <a className={styles.url} href={props.url}>
        <span className={styles.title}>
          {props.title}
        </span>
      </a>
    </div>
    <div className={`${styles.small} ${styles.url}`}>
      {props.score}
      {' '}
      point
      {props.score > 1 ? 's' : ''}
      {' '}
      by
      {' '}
      {props.by}
      {' '}
      {getTimeAgo(props.time)}
    </div>
  </div>
);

export default Story;

Story.propTypes = {
  time: PropTypes.number.isRequired,
  by: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
