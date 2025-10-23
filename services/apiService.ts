
import { API_BASE_URL } from '../constants';
import { EnviarLotePayload, ApiResponse } from '../types';

interface ApiCallOptions {
  method: 'POST' | 'GET';
  endpoint: string;
  apiKey: string;
  body?: any;
  params?: Record<string, string>;
}

async function callApi<T,>({ method, endpoint, apiKey, body, params }: ApiCallOptions): Promise<T> {
  if (!apiKey) {
    throw new Error('API Key (Bearer Token) é obrigatória.');
  }

  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  const headers = new Headers({
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  });

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `HTTP error! status: ${response.status}`, details: await response.text() };
    }
    throw errorData;
  }
  
  // Handle cases where response might be empty
  const responseText = await response.text();
  if (!responseText) {
      return {} as T;
  }

  return JSON.parse(responseText) as T;
}

export const enviarLote = (nrInscricaoEmpregador: string, payload: EnviarLotePayload, apiKey: string): Promise<ApiResponse> => {
  return callApi<ApiResponse>({
    method: 'POST',
    endpoint: `receberlote`,
    apiKey,
    body: payload,
    params: { nrInscricaoEmpregador },
  });
};

export const consultarLote = (nrInscricaoEmpregador: string, nrLote: string, apiKey: string): Promise<ApiResponse> => {
  return callApi<ApiResponse>({
    method: 'POST', // The documentation image shows a POST, not a GET.
    endpoint: `consultarlote`,
    apiKey,
    params: { nrInscricaoEmpregador, nrLote },
  });
};
