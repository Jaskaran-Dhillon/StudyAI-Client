import axios from "../axios";
const domain = process.env.REACT_APP_BASE_URL;

const summarize = async (data) => {
  return await axios.post(`${domain}/aiService/summarize`, data,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    responseType: "blob"
  });
};

export const aiService = {
  summarize
};
