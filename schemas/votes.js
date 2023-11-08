import yup from 'yup';

//creamos el Schema que se va a encargar de validar el producto
export const voteCreateSchema = yup.object({
    gameplay: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required(),
    art: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required(),
    sound: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required(),
    theme: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required(),

});
