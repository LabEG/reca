export const notRedraw = (): MethodDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("reca:notRedraw", true, target, propertyKey);
};
