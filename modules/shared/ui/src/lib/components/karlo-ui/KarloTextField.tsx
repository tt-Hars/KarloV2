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

/**
 * A customized Material UI TextField component.
 *
 * @param {KarloTextFieldProps} props - The props for the text field.
 * @returns {JSX.Element} The rendered text field component.
 */
export const KarloTextField = (props: KarloTextFieldProps) => {
  return <StyledTextField variant="outlined" fullWidth {...props} />;
};
