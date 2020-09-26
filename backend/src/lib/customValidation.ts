import validator from 'validator';

export function isValidId( id: string ) {
    return ( id && validator.isNumeric( id ) && parseInt( id ) >= 1 );
}