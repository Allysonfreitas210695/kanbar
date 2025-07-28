export default interface Location {
    id: number;
    name: string;
    address: string;
    city: string;
    horario: string;
    phone: string;
    price: number;
    image: string | undefined;
    isopen: boolean; 
}