export interface ICreateRentalDTO {
  id?: string;
  total?: number;
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  end_date?: Date;
}
