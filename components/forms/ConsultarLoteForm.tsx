import React, { useState } from 'react';
import { ApiResponse, ApiError } from '../../types';
import { consultarLote } from '../../services/apiService';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ApiResponseDisplay from '../ApiResponseDisplay';

interface ConsultarLoteFormProps {
  apiKey: string;
}

const ConsultarLoteForm: React.FC<ConsultarLoteFormProps> = ({ apiKey }) => {
  const [nrInscricaoEmpregador, setNrInscricaoEmpregador] = useState('12345678000195');
  const [nrLote, setNrLote] = useState('1');

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);
    try {
      const result = await consultarLote(nrInscricaoEmpregador, nrLote, apiKey);
      setResponse(result);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Parâmetros da Consulta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nº de Inscrição do Empregador"
              id="nrInscricaoEmpregadorConsulta"
              value={nrInscricaoEmpregador}
              onChange={(e) => setNrInscricaoEmpregador(e.target.value)}
              required
            />
            <Input
              label="Número do Lote"
              id="nrLoteConsulta"
              type="number"
              value={nrLote}
              onChange={(e) => setNrLote(e.target.value)}
              required
            />
          </div>
        </div>
      </Card>
      
      <div className="mt-8">
        <Button type="submit" isLoading={loading}>
          Consultar Lote
        </Button>
      </div>

      <ApiResponseDisplay loading={loading} response={response} error={error} />
    </form>
  );
};

export default ConsultarLoteForm;