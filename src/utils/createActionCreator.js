export default function createActionCreator (
  [REQUEST_ACTION, SUCCESS_ACTION, FAILURE_ACTION],
  api,
) {
  return function actionCreator (req) {
    return (dispatch) => {
      dispatch({
        type: REQUEST_ACTION,
        payload: { req },
      });

      return api(req).then(
        res => dispatch({ type: SUCCESS_ACTION, payload: { res, req } }),
        err => dispatch({ type: FAILURE_ACTION, payload: { res: err, req } }),
      );
    };
  };
}
