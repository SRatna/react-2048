/**
 * Created by sushanta on 4/26/18.
 */
const colors = {
  2 : '#eadfd4',
  4 : '#cac7a0',
  8 : '#f2b179',
  16 : '#f59563',
  32 : '#cbb68a',
  64 : '#d3a0a0',
  128 : '#b9d7fa',
  256 : '#676fcc',
  512 : '#fa65b9',
  1024 : '#5eb28c',
  2048 : '#4394f0',
  4096 : '#bcfa39',
  8192 : '#6dfaac',
  16384 : '#9d65fa',
  32768 : '#14faed',
};
const getColor = number => colors[number] || '#CDC1B5';
export default getColor;