export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp).toLocaleString().split('. ');
  const time = date[3].slice(0, -3);
  const str = `${date[1]}월 ${date[2]}일 ${time}`;
  return str;
};
