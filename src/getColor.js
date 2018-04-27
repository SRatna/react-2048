/**
 * Created by sushanta on 4/26/18.
 */
const colors = {
  2 : '#eadfd4',
  4 : '#dedbaf',
  8 : '#f2b179',
  16 : '#f5c4b2',
  32 : '#cbb68a',
  64 : '#d3a0a0',
  128 : '#b9d7fa',
  256 : '#98b2ec',
  512 : '#fac1c4',
  1024 : '#96ecc5',
  2048 : '#c7f3ff',
  4096 : '#bcfa39',
  8192 : '#d2e3af',
  16384 : '#c9c5f4',
  32768 : '#b6cbfa',
};
const getColor = number => colors[number] || '#CDC1B5';
export default getColor;