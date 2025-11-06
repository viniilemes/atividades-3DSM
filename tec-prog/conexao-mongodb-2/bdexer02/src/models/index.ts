import mongoose from "mongoose";
const { Schema } = mongoose;

// Esquema para 'districts' (será subdocumento) 
const DistrictSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    required: true
  }
});

// Esquema para 'cities' (será subdocumento) 
const CitySchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    required: true
  },
  // 'district' é um array de subdocumentos de 'city' 
  districts: [DistrictSchema]
});

// Esquema para 'states' (o modelo principal) 
const StateSchema = new Schema({
  name: {
    type: String,
    maxlength: 20,
    required: true,
    unique: true // 'name' de State não aceita valores repetidos
  },
  // 'city' é um array de subdocumentos de 'state' 
  cities: [CitySchema]
});

// Apenas 'State' é compilado como um modelo.
// 'cities' e 'districts' serão salvos dentro da coleção 'states' 
const State = mongoose.model("State", StateSchema);

export { State };