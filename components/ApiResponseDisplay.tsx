
import React from 'react';
import { ApiResponse, ApiError } from '../types';
import Card from './ui/Card';

interface ApiResponseDisplayProps {
  loading: boolean;
  response: ApiResponse | null;
  error: ApiError | null;
}

const ApiResponseDisplay: React.FC<ApiResponseDisplayProps> = ({ loading, response, error }) => {
  if (loading) {
    return (
      <Card className="mt-6">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-3 text-gray-700 dark:text-gray-300">Aguardando resposta da API...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6 border border-red-500/50">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Erro na Requisição</h3>
        <pre className="mt-2 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </Card>
    );
  }

  if (response) {
    return (
      <Card className="mt-6 border border-green-500/50">
        <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Resposta da API</h3>
        <pre className="mt-2 text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      </Card>
    );
  }

  return null;
};

export default ApiResponseDisplay;
