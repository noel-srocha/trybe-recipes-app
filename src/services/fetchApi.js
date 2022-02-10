const fetchApi = async (url) => {
  const result = await fetch(url).then((response) => response.json());
  return result;
};

export default fetchApi;
