import yup from 'yup';

//creamos el Schema que se va a encargar de validar el producto
export const voteCreateSchema = yup.object({
    Jugabilidad: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required("Jugabilidad es un campo requerido."),
    Arte: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required("Arte es un campo requerido."),
    Sonido: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required("Sonido es un campo requerido."),
    Tematica: yup.number().min(1).max(10, 'El puntaje debe ser de 1 a 10').required("Tematica es un campo requerido."),

});
