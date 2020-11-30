export default interface ICreatePropertyDTO {
  costumer_id: string;
  realtor_id: string;
  contracttype_id: number;
  propertytype_id: number;
  desc: string;
  area: string;
  roons: number;
  garage: number;
  suite: number;
  latitude: string;
  longitude: string;
  price: string;
  city_id: number;
  state_id: number;
  situation: string;
  status: boolean;
}
