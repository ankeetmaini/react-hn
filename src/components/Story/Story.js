import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { getTimeAgo } from 'utils/time';

import styles from './Story.scss';

const Story = (props) => {
  const commentsLink = props.descendants
    ? <Link to={`/item/${props.id}`}>{props.descendants} comments</Link>
    : <Link to={`/item/${props.id}`}>discuss</Link>;

  return (
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
        {' '}|{' '}
        {commentsLink}
      </div>
    </div>
  );
};

export default withRouter(Story);

Story.defaultProps = {
  descendants: 0,
};

Story.propTypes = {
  id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  by: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  descendants: PropTypes.number,
};
