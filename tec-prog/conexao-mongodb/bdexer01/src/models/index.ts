// Define os esquemas e modelos 
import mongoose from "mongoose";
const { Schema } = mongoose;

// Esquema para 'cars' 
const CarSchema = new Schema({
  model: {
    type: String,
    maxlength: 15,
    required: true,
    unique: true // 'model' não pode ter valores repetidos 
  }
});

// Esquema para 'people' 
const PersonSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    required: true,
    unique: true // 'name' não pode ter valores repetidos 
  }
});

// Compila os modelos 'Car' e 'Person' primeiro para poder usá-los na validação
const Car = mongoose.model("Car", CarSchema);
const Person = mongoose.model("Person", PersonSchema);

// Esquema para 'phones'
const PhoneSchema = new Schema({
  idpeople: { // Chave estrangeira para 'people' 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person', // Referencia o modelo 'Person'
    required: true,
    // Validação para garantir que a pessoa existe
    validate: {
      validator: async function (id: string) {
        const person = await Person.findById(id);
        return !!person; // Retorna true se a pessoa existir
      },
      message: 'Pessoa (idpeople) fornecida não existe'
    }
  },
  number: {
    type: String,
    required: true,
    // Validação de 11 dígitos numéricos usando regex
    match: [/^[0-9]{11}$/, 'O número deve ter exatamente 11 dígitos numéricos']
  }
});

// Esquema para 'car_by_person' (Relação N:N)
const CarByPersonSchema = new Schema({
  idpeople: { // FK para 'people'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
    validate: { // Validação de existência da pessoa
      validator: async function (id: string) {
        const person = await Person.findById(id);
        return !!person;
      },
      message: 'Pessoa (idpeople) fornecida não existe'
    }
  },
  idcar: { // FK para 'cars' 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
    validate: { // Validação de existência do carro
      validator: async function (id: string) {
        const car = await Car.findById(id);
        return !!car;
      },
      message: 'Carro (idcar) fornecido não existe'
    }
  }
});

// Compila os modelos restantes
const Phone = mongoose.model("Phone", PhoneSchema);
const CarByPerson = mongoose.model("CarByPerson", CarByPersonSchema);

// Exporta todos os modelos
export { Car, Person, Phone, CarByPerson };