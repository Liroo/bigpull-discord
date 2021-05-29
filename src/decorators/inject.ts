export const InjectClass = <T extends new (...args: any[]) => any>(classRef: T) => {
  return (protoOrDescriptor: {} | any, name?: PropertyKey): any => {
    const descriptor = {
      get(this: any) {
        const propertyName = name !== undefined ? `__${String(name)}` : `__${protoOrDescriptor.key}`;

        if (!this[propertyName]) {
          this[propertyName] = new classRef();
        }

        return this[propertyName];
      },
      enumerable: true,
      configurable: true,
    };

    // if there is no name then this is a TypeScript runtime else its the current native TC39 proposal
    return Object.defineProperty(protoOrDescriptor, name, descriptor);;
  };
};
