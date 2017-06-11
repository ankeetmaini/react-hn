import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from 'actions/HackerNewsActions';
import Story from 'components/Story';

import { ITEMS_PER_PAGE } from 'reducers/CatalogReducer';
import { SUCCESS } from 'utils/asyncStatus';
import safeTraverse from 'utils/safeTraverse';

import styles from './Stories.scss';

const categoriesMap = {
  top: 'topstories',
  new: 'newstories',
  show: 'showstories',
  ask: 'askstories',
  jobs: 'jobstories',
};

const Loading = () => <h2>Loading...</h2>;

class Stories extends Component {
  componentDidMount () {
    // fetch catalog, which means only ids
    if (this.props.match.params.type) {
      this.props.fetchCatalog({
        type: categoriesMap[this.props.match.params.type],
      });
    }
  }

  componentWillReceiveProps (props) {
    const prevType = this.props.match.params.type;
    const currentType = props.match.params.type;
    // fetch catalog, which means only ids if type has changed
    if (prevType !== currentType) {
      this.props.fetchCatalog({ type: categoriesMap[currentType] });
    }

    // now fetch story details for the page, if stories have arrived
    // and page has been changed
    if (props.catalog.asyncStatus !== SUCCESS) return;
    const prevPage = this.props.catalog.page;
    const currentPage = props.catalog.page;
    if (prevPage !== currentPage) {
      const startingIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endingIndex = startingIndex + ITEMS_PER_PAGE;
      props.catalog.data.slice(startingIndex, endingIndex).forEach((id) => {
        if (!props.stories[id] || props.stories[id].asyncStatus !== SUCCESS) {
          props.fetchStoryDetail({ type: categoriesMap[currentType], id });
        }
      });
    }
  }

  changePage (page) {
    if (
      page > 0 &&
      page <= safeTraverse(this.props, ['catalog', 'totalPages'])
    ) {
      const tab = categoriesMap[this.props.match.params.type];
      this.props.changePage({ type: tab, page });
    }
  }

  render () {
    const currentPage = safeTraverse(this.props, ['catalog', 'page']);
    const totalPages = safeTraverse(this.props, ['catalog', 'totalPages']);
    const startingIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endingIndex = startingIndex + ITEMS_PER_PAGE;
    const stories =
      this.props.catalog.asyncStatus === 'SUCCESS' &&
      this.props.catalog.data
        .slice(startingIndex, endingIndex)
        .map((id, index) => {
          if (
            !this.props.stories[id] ||
            this.props.stories[id].asyncStatus !== SUCCESS
          ) {
            return null;
          }
          return (
            <div className={styles.row} key={id}>
              <div className={styles.number}>{startingIndex + 1 + index}.</div>
              <Story {...this.props.stories[id]} />
            </div>
          );
        })
        .filter(s => !!s);
    return (
      <div className={styles.list}>
        {this.props.catalog.asyncStatus === 'PENDING' && <Loading />}
        <div className={styles.orderedList}>
          {this.props.catalog.asyncStatus === 'SUCCESS' &&
            !stories.length &&
            <Loading />}
          {stories}
        </div>
        <hr className="hr" />
        {currentPage &&
          totalPages &&
          <div className={styles.center}>
            <button onClick={this.changePage.bind(this, currentPage - 1)}>
              prev
            </button>
            {currentPage} of {totalPages}
            <button onClick={this.changePage.bind(this, currentPage + 1)}>
              next
            </button>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  catalog: state.catalog[categoriesMap[ownProps.match.params.type]] || {},
  stories: state.stories,
});

export default connect(mapStateToProps, actions)(Stories);

Stories.propTypes = {
  stories: PropTypes.object.isRequired,
  catalog: PropTypes.shape({
    asyncStatus: PropTypes.string,
    data: PropTypes.array,
    page: PropTypes.number,
  }).isRequired,
  fetchCatalog: PropTypes.func.isRequired,
  fetchStoryDetail: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  changePage: PropTypes.func.isRequired,
};
