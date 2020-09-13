import util from 'util';

export enum LogType {
    info,
    warn,
    error
}

const createLogger = ( type: LogType ) => ( ...args: any ) => {
    const log = args.map( ( item: any ) => {
        if ( typeof item === 'object' ) {
            return util.inspect( item, { depth: 5, colors: true } );
        }
        return item;
    } )

    switch ( type ) {
        case LogType.info:
            console.info( ...log );
            break;
        case LogType.warn:
            console.warn( ...log );
            break;
        case LogType.error:
            console.error( ...log );
            break;
        default:
            console.log( ...log );
            break;
    }
};

export default {
    info: createLogger( LogType.info ),
    warn: createLogger( LogType.warn ),
    error: createLogger( LogType.error ),
}