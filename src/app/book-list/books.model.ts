export class Book{
    public id:number;
    public title:string;
    public authors:Author[];
    public subjects:string[];
    public bookshelves: string[];
    public languages: string[];
    public copyright: boolean;
    public media_type: string;
    public formats: {[mimeType:string]:string};
    public download_count: number;
}
interface Author{
    birth_year:number;
    death_year:number;
    name:string;
}