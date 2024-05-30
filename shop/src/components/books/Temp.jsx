import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Temp = () => {
  return (
    <>
      {[
        'warning',
      ].map((variant) => (
        <Alert key={variant} variant={variant} className='text-center my-5'>
          검색내용이 없어요
        </Alert>
      ))}
    </>
  );
}

export default Temp