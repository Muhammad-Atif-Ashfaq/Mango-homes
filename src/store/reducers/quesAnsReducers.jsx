const initialState = {
  data: [],
};

const quesAnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUT_DATA":
      return {
        ...state,
        data: state.data.push(action.payload),
      };
    default:
      return state;
  }
};

export default quesAnsReducer;
