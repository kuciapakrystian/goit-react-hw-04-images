import { Dna } from 'react-loader-spinner';

export const Loader = ({ isLoading }) => {
  return (
    <Dna
      visible={isLoading}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{
        display: 'block',
        marginTop: '5px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    />
  );
};