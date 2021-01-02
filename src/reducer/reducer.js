const Reducer = (prevState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          user: action.user,
          isLoading: false,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          user: null,
        };
      default:
        return prevState;
    }
  };
  export default Reducer;