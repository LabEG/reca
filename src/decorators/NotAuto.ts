export const notAuto = (): MethodDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("reca:notAuto", true, target, propertyKey);
};
