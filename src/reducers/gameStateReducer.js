const gameStateReducer = (state, action) => {
  switch(action.type) {
    case 'start':
      return {
        ...state,
        ...action.payload,
        startTime: Date.now(),
      };
    case 'victory':
      return {
        ...state,
        ...action.payload,
        totalTime: Date.now() - state.startTime,
        victory: true,
      };
    case 'reset':
      return {
        ...action.payload,
      };
    default:
      return null;
  };
};

export default gameStateReducer;
