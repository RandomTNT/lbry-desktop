import { connect } from 'react-redux';
import { makeSelectClaimIsNsfw } from 'lbry-redux';
import { doGetRecommendedContent } from 'redux/actions/search';
import { makeSelectRecommendedContentForUri, selectIsSearching } from 'redux/selectors/search';
import { selectUserVerifiedEmail } from 'redux/selectors/user';
import RecommendedVideos from './view';

const select = (state, props) => ({
  mature: makeSelectClaimIsNsfw(props.uri)(state),
  recommendedContent: makeSelectRecommendedContentForUri(props.uri)(state),
  isSearching: selectIsSearching(state),
  isAuthenticated: selectUserVerifiedEmail(state),
});

const perform = (dispatch) => ({
  doGetRecommendedContent: (uri, mature) => dispatch(doGetRecommendedContent(uri, mature)),
});

export default connect(select, perform)(RecommendedVideos);
