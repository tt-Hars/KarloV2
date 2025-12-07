import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&.Mui-focused fieldset': {
      borderWidth: '2px',
    },
  },
  marginBottom: theme.spacing(2), // Default bottom spacing for forms
}));

export type KarloTextFieldProps = TextFieldProps;

export const KarloTextField = (props: KarloTextFieldProps) => {
  return <StyledTextField variant="outlined" fullWidth {...props} />;
};
