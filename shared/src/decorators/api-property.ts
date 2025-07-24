export function ApiProperty(options?: any) {
  return function (target: any, propertyKey: string) {
    if (typeof window !== "undefined") return;

    import("@nestjs/swagger")
      .then(({ ApiProperty: NestApiProperty }) => {
        return NestApiProperty(options)(target, propertyKey);
      })
      .catch(() => {});
  };
}
