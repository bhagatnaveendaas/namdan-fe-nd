export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 10;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export const isCloseToTop = ({ contentOffset }) => {
  const paddingToTop = 1;
  return contentOffset.y <=
    paddingToTop;
};
