import * as colors from './__colors';

export const table = {
  header: {
    backgroundColor: colors.grey100,
    borderColor: colors.grey900
  },
  cell: {
    borderColor: colors.grey900
  }
};

export const card = {
  backgroundColor: colors.white,
  shadowColor: colors.grey300
};
export const textField = {
  labelFontWeight: 500,
  borderColor: colors.grey900,
  focusShadow: colors.grey900
};
export const modal = {
  header: {
    borderColor: colors.grey300
  },
  footer: {
    borderColor: colors.grey300
  },
  container: {
    width: 600,
    height: 350,
    backgroundColor: colors.white,
    boxShadowColor: colors.grey800
  },
  overlay: {
    backgroundColor: colors.grey900,
    opacity: 0.5
  }
};
export const iconButton = {
  width: 24,
  height: 24,
  color: colors.grey500,
  activeColor: colors.grey200
};
export const flashMessages = {
  borderRadius: 5,
  backgroundColor: colors.red700
};
export const typography = {
  textColor: colors.white
};
export const button = {
  borderRadius: 5,
  backgroundColorActive: colors.green500,
  backgroundColor: colors.green600
};
export const backgroundColor = colors.grey50;
export const appBar = {
  height: 64,
  backgroundColor: colors.grey900
};
export { colors };
