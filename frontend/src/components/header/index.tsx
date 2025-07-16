import React from 'react';

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const logado = true;
  const voltar = false;

  return (
    <>
      {logado && (
        <div className="flex items-center justify-between bg-primary text-white px-6 pt-4">
          {voltar ? <h1>Voltar</h1> : <h1>Logo</h1>}
          <h1>Menu</h1>
        </div>
      )}
    </>
  );
};

export default Header;
