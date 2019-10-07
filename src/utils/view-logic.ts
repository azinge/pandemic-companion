import { LocationColor } from '../graphql/types';

export const getHexColorFromLocationColor = (locationColor: LocationColor) => {
  switch (locationColor) {
    case LocationColor.BLACK:
      return 'black';
    case LocationColor.YELLOW:
      return 'yellow';
    case LocationColor.RED:
      return 'red';
    case LocationColor.BLUE:
      return 'blue';
    default:
      return 'white';
  }
};
