export const notAuto = (): MethodDecorator | PropertyDecorator => (
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.defineMetadata("reca:notAuto", true, target, propertyKey);
};
