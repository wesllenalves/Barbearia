import React from 'react';

export default function ListErrorsValidation({ dados }) {
  return (
    <>
      <ul>
        {Object.keys(dados).map((item, index) => (
          <li key={index.toString()}>{dados[item]}</li>
        ))}
      </ul>
    </>
  );
}
