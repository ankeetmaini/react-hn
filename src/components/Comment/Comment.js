import React from 'react';
import PropTypes from 'prop-types';

import { getTimeAgo } from 'utils/time';
import get from 'utils/safeTraverse';
import styles from './Comment.scss';

const Comment = ({ kids = [], stories }) => {
  // check if first comment is loaded, then bail
  // by showing a loader
  const c = get(stories, [kids[0]]);
  if (!c) return <h3>Loading...</h3>;
  return (
    <div>
      {kids.map((kid) => {
        const comment = stories[kid];
        return (
          <div className={styles.comment}>
            <div className={styles.link}>
              <span className={styles.triangle} />
              {' '}
              {comment.by}
              {' '}
              {getTimeAgo(comment.time)}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: comment.text }}
              className={styles.text}
            />
            {comment.kids &&
              comment.kids.length &&
              <Comment {...comment} stories={stories} />}
          </div>
        );
      })}
    </div>
  );
};

Comment.propTypes = {
  stories: PropTypes.object.isRequired,
  kids: PropTypes.array.isRequired,
};

export default Comment;
