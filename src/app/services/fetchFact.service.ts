import axios from 'axios';
import { catFetchUrl } from '../variables';

export async function fetchFact() {
  try {
    const response = await axios.get(catFetchUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}
