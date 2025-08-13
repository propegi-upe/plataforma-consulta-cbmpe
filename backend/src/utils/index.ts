export function detectFieldType(
  filter: string,
): 'cnpj' | 'cpf' | 'protocol' | 'text' {
  const onlyNumbers = filter.replace(/\D/g, ''); // remove não-dígitos

  if (/^\d{14}$/.test(onlyNumbers)) return 'cnpj'; // 14 dígitos → CNPJ
  if (/^\d{11}$/.test(onlyNumbers)) return 'cpf'; // 11 dígitos → CPF
  if (/^\d+$/.test(onlyNumbers)) return 'protocol'; // apenas números → protocolo

  return 'text'; // texto → nome ou empresa
}
