
export interface MapperInterface<Type> {
  fromJson(json: any): Type;
  fromList(json: any): Type[];
}
