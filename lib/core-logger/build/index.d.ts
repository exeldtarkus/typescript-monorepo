declare enum ELogLevels {
    error = "[ERROR]",
    warn = "[WARNING]",
    info = "[INFO]",
    http = "[HTTP]",
    debug = "[DEBUG]",
    trace = "[TRACE]",
    fatal = "[FATAL]",
    nothing = "[NOTHING]"
}
declare enum ELogStage {
    start = "[START]",
    process = "[PROCESSING]",
    end = "[END]"
}
declare const logger: {
    (): void;
    info(...str: any[]): void;
    warn(...str: any[]): void;
    error(...str: any[]): void;
    nothing(...str: any[]): void;
    debug(...str: any[]): void;
    trace(...str: any[]): void;
    fatal(...str: any[]): void;
};
export { ELogStage, ELogLevels };
export default logger;
