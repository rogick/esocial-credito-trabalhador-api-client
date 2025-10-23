
import React, { useState } from 'react';
import { ApiEndpoint } from './types';
import EnviarLoteForm from './components/forms/EnviarLoteForm';
import ConsultarLoteForm from './components/forms/ConsultarLoteForm';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ApiEndpoint>(ApiEndpoint.EnviarLote);
  const [apiKey, setApiKey] = useState<string>('');

  const renderForm = () => {
    switch (activeTab) {
      case ApiEndpoint.EnviarLote:
        return <EnviarLoteForm apiKey={apiKey} />;
      case ApiEndpoint.ConsultarLote:
        return <ConsultarLoteForm apiKey={apiKey} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
            Cliente API eSocial Consignado
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Interface para interagir com os endpoints de recepção e consulta de lotes.
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Configuração da API</h2>
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Chave da API (Bearer Token)
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Cole seu token de autorização aqui"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-6 sm:space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab(ApiEndpoint.EnviarLote)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === ApiEndpoint.EnviarLote
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
              }`}
            >
              Enviar Lote
            </button>
            <button
              onClick={() => setActiveTab(ApiEndpoint.ConsultarLote)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === ApiEndpoint.ConsultarLote
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
              }`}
            >
              Consultar Lote
            </button>
          </nav>
        </div>

        <div>
          {renderForm()}
        </div>
      </main>

       <footer className="text-center py-4 mt-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>Desenvolvido como uma ferramenta de teste para a API eSocial Consignado.</p>
        </footer>
    </div>
  );
};

export default App;
