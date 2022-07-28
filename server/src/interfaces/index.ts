export interface IResult {
  [key: string]: any
}

export interface IProgram<T> {
  findCountWithFilter(): Promise<T[]>;
  findBySkipAndLimitForDirectoryAdk(skip: number): Promise<T[]>;
  updateDirectoryAdkName(id: string): Promise<T[]>;
}

export interface IUser<T> {
  findById(id: string): Promise<T[]>;
}

export interface IStudent<T> {
  findCountWithFilter(): Promise<T[]>;
  findBySkipAndLimitForDirectoryAdk(skip: number): Promise<T[]>;
  updateDirectoryAdkName(id: string): Promise<T[]>;
}

export interface IScope<T> {
  findById(id: string): Promise<T[]>;
}

export interface ICronDetails<T> {
  findById(id: string): Promise<T[]>;
}

export interface IDirectoryPreference {
  contactMethod: string,
  contactPreferences: string,
  hideEmail: string,
  hidePhone: string,
  schedulingLink: string,
  userId?: any
}