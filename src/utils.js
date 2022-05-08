import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const STANDARD_WIDTH = 375;
const CURRENT_WIDTH = width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;

const USE_FOR_BIGGER_SIZE = true;

export const deviceDimension = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export function dynamicSize(size) {
  return K * size;
}

export function getFontSize(size) {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dynamicSize(size);
    return newSize;
  }
  return size;
}

export default utils = {
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  randomNumberGenerate: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjn49sWagJH3rhtoK75fKpoju6FZ1-Q170g&usqp=CAU";
  },
};

// "splash": {
//   "image": "./assets/splash.png",
//   "resizeMode": "cover",
//   "backgroundColor": "#ffffff"
// },