
import axios, { AxiosError, type AxiosResponse } from "axios";

import { IternalServerError, NotFoundError, ServiceUnavailableError, UnauthorizedError } from "../model/errors";

const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1/',
});
const handleAxiosError = (error: AxiosError) => {
    
  
    switch (error.response?.status) {
      case 401:
    
        throw new UnauthorizedError("Unauthorized", error);
      case 404:
        throw new NotFoundError("Not Found", error);
      case 500:
        throw new IternalServerError("Internal Server Error", error);
      case 503:
        throw new ServiceUnavailableError("Service Unavailable", error);
      default:
        throw new IternalServerError("System Error", error);
    }
  }
export const fetchCountries = async () => {
    try {
        const response = await api.get('all').catch(handleAxiosError);
       
        return response.data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};

export const fetchCountry = async (searchInput : string) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${searchInput}`
    ).catch(handleAxiosError);
      
      return response.data;
  } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
  }
};

export const fetchCountryByRegion = async (searchInput : string) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${searchInput}`
    ).catch(handleAxiosError);
      
      return response.data;
  } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
  }
};