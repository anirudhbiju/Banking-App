import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const axiosInstance = axios.create({
    baseURL: apiEndpoint,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    },
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      const authTokens = localStorage.getItem('access_token');
      // console.log(authTokens);
      if (authTokens) {
        // console.log("auth:",authTokens)
        config.headers['Authorization'] = `Bearer ${authTokens}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error?.response?.status === 401
      ) {
        // console.log('Refresh token expired!');
        // console.log(originalRequest);
        alert("Unauthorized!")
        localStorage.clear();
        // console.clear();
        // window.location.replace('/login');
      } 
      // else if (
      //   error?.response?.status === 401
      // ) {
      //   console.log('Token blacklisted or invalid token!');
  
      //   localStorage.clear();
      //   // window.location.replace('/login');
      // } 
      // else if (
      //   error?.response?.status === 401 &&
      //   !originalRequest._retry
      // ) {
      //   console.log('Inside else if');
      //   originalRequest._retry = true;
      //   const accessToken = await refreshAccessToken();
      //   axiosInstance.defaults.headers.common['Authorization'] ='Bearer ' + accessToken;
      //   return axiosPrivate(originalRequest);
      // }
       else {
        throw error;
      }
    }
  );

    const refreshAccessToken = async () => {
    const authTokens = JSON.parse(localStorage.getItem('refresh_token'));
    const data = { refreshToken: authTokens };
    
    try {
      const response = await axios.post(
        `${apiEndpoint}login/refresh/`,
        data
      );
      
      console.log(response);
      
      const accessToken = response?.data?.access;
      
    //   let authTokens = JSON.stringify({
    //     accessToken: accessToken,
    //     refreshToken: refreshToken,
    //   });
      
      localStorage.setItem('access_token',response.data.access );
      localStorage.setItem('refresh_token',response.data.refresh );
      return accessToken;
    } catch (err) {
      console.log('Error occured in generating refresh token: ', err);
      localStorage.clear();
    }

  };
  const axiosPrivate = axiosInstance;
export default axiosPrivate;