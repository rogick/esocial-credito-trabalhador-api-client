import React, { useState } from 'react';
import { Contrato, ApiResponse, ApiError } from '../../types';
import { enviarLote } from '../../services/apiService';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ApiResponseDisplay from '../ApiResponseDisplay';

interface EnviarLoteFormProps {
  apiKey: string;
}

const initialContrato: Contrato = {
  nrCpfTrabalhador: '98765432101',
  cdMatricula: 'MAT123',
  tpInscricao: '1',
  nrInscricao: '12345678000195',
  nrContratoEmprestimo: '10000001',
  nrInstituicaoFinanceira: '001',
  vlParcela: '231.81',
  nrCompetenciaDesconto: '202509',
  cdCategoria: '101',
  dtInicioEmprestimo: '2025-09-01 10:02:50',
};

const fieldLabels: Record<keyof Contrato, string> = {
  nrCpfTrabalhador: "CPF do Trabalhador",
  cdMatricula: "Número da Matrícula",
  tpInscricao: "Tipo de Inscrição do Empregador",
  nrInscricao: "Nº de Inscrição do Empregador (Contrato)",
  nrContratoEmprestimo: "Nº do Contrato de Empréstimo",
  nrInstituicaoFinanceira: "Nº da Instituição Financeira",
  vlParcela: "Valor da Parcela",
  nrCompetenciaDesconto: "Competência de Desconto (AAAAMM)",
  cdCategoria: "Código da Categoria do Trabalhador",
  dtInicioEmprestimo: "Data de Inclusão do Empréstimo",
};


const EnviarLoteForm: React.FC<EnviarLoteFormProps> = ({ apiKey }) => {
  const [nrInscricaoEmpregador, setNrInscricaoEmpregador] = useState('12345678000195');
  const [nrLote, setNrLote] = useState('1');
  const [contratos, setContratos] = useState<Contrato[]>([initialContrato]);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const handleContratoChange = (index: number, field: keyof Contrato, value: string) => {
    const newContratos = [...contratos];
    newContratos[index] = { ...newContratos[index], [field]: value };
    setContratos(newContratos);
  };

  const addContrato = () => {
    setContratos([...contratos, { ...initialContrato, nrCpfTrabalhador: '', cdMatricula: '' }]);
  };

  const removeContrato = (index: number) => {
    setContratos(contratos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);
    try {
      const payload = {
        nrLote: parseInt(nrLote, 10),
        Lote: contratos,
      };
      const result = await enviarLote(nrInscricaoEmpregador, payload, apiKey);
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Parâmetros da Requisição</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nº de Inscrição do Empregador (URL)"
              id="nrInscricaoEmpregador"
              value={nrInscricaoEmpregador}
              onChange={(e) => setNrInscricaoEmpregador(e.target.value)}
              required
            />
            <Input
              label="Número do Lote"
              id="nrLote"
              type="number"
              value={nrLote}
              onChange={(e) => setNrLote(e.target.value)}
              required
            />
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Contratos no Lote</h2>
          <Button type="button" variant="secondary" onClick={addContrato}>
            Adicionar Contrato
          </Button>
        </div>
        <div className="space-y-6">
          {contratos.map((contrato, index) => (
            <Card key={index} className="relative border dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => removeContrato(index)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    aria-label="Remover Contrato"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
              <h3 className="text-lg font-medium mb-4">Contrato #{index + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(contrato).map((keyStr) => {
                  const key = keyStr as keyof Contrato;
                  return (
                    <Input
                      key={key}
                      label={fieldLabels[key] || key}
                      id={`contrato-${index}-${key}`}
                      value={contrato[key]}
                      onChange={(e) => handleContratoChange(index, key, e.target.value)}
                      required
                    />
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <Button type="submit" isLoading={loading} disabled={contratos.length === 0}>
          Enviar Lote
        </Button>
      </div>

      <ApiResponseDisplay loading={loading} response={response} error={error} />
    </form>
  );
};

export default EnviarLoteForm;