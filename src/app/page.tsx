import Box from '@mui/material/Box';
import CustomForm from "@/section/Forms/orderCreate";

export default function Home() {
 return (
  <>
   <Box component="section" sx={{ maxWidth: 991, mx: 'auto', width: '100%', p: 2, border: '1px dashed grey' }}>
     <CustomForm />
   </Box>
  </>
 );
}
