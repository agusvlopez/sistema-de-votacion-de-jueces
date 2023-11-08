import yup from 'yup';

//creamos el Schema que se va a encargar de validar el producto
export const gameCreateSchema = yup.object({
    name: yup.string("El nombre debe ser escrito en palabras.").required("El nombre es un campo requerido"),
    genre: yup.string("El género debe ser escrito en letras.").required("El género es un campo requerido"),
    members: yup.array("Debe ser un array.").of(yup.string("Los nombres deben ser en string")).required("Los nombres de los participantes que hicieron el juego es un campo requerido"),
    edition: yup.number("El año de edición debe ser escrito en números.").required("El año de edición es un campo requerido.")
});

export const gameUpdateSchema = yup.object({
    name: yup.string("El nombre debe ser escrito en palabras."),
    genre: yup.string("El género debe ser escrito en letras."),
    members: yup.array("Debe ser un array.").of(yup.string("Los nombres deben ser en string")),
    edition: yup.number("El año de edición debe ser escrito en números.")
});