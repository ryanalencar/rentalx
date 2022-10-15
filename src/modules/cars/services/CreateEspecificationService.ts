import { SpecificationsRepository } from "../repositories/specification/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateEspecificationService {
  constructor(private specificationsRepository: SpecificationsRepository) { }

  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    this.specificationsRepository.create({ description, name });
  }
}

export { CreateEspecificationService };
