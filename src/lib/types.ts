export interface IFile {
    _id?:string;
    url: string;
    category: string;
    title?: string;
    description?: string;
}

export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    country: string;
    dateOfBirth: string;
    email: string;
    password:string;
    additinalInfo?: string;
    file?: IFile[]


}