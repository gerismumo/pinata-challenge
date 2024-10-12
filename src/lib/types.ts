export interface IFile {
    id?:string;
    url: string;
    category: string;
    title?: string;
    description?: string;
}

export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    country: string;
    dateOfBirth: string;
    email: string;
    password:string;
    additinalInfo?: string;
    file?: IFile[]


}