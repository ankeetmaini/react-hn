import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from 'actions/HackerNewsActions';
import { SUCCESS } from 'utils/asyncStatus';
import get from 'utils/safeTraverse';

import Story from 'components/Story';
import Comment from 'components/Comment';

import styles from './Item.scss';

class Item extends React.Component {
  componentDidMount () {
    this.props.fetchComments(this.props.match.params.id);
  }

  render () {
    // conveniently use the <Story />
    // to render the Story with headline,
    // and <Comment /> to recursively show nested comments
    if (get(this.props, ['story', 'asyncStatus']) !== SUCCESS) {
      return <h2>Loading...</h2>;
    }
    return (
      <div className={styles.list}>
        <div className={styles.orderedList}>
          <Story {...this.props.story} />
          <hr className="hr" />
        </div>
        {this.props.story.kids &&
          this.props.story.kids.length &&
          <div style={{ paddingLeft: 12 }}>
            <Comment {...this.props.story} stories={this.props.stories} />
          </div>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  story: state.stories[ownProps.match.params.id],
  stories: state.stories,
});

Item.propTypes = {
  story: PropTypes.object.isRequired,
  stories: PropTypes.object.isRequired,
  fetchComments: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, actions)(Item);
