import mongoose from 'mongoose';

// ATENÇÃO: Substitua pela sua string de conexão do MongoDB
// Pode ser do MongoDB Atlas ou uma instância local.
// Ex: "mongodb://localhost:27017/minhacolecao"
const MONGO_URI = 'mongodb://127.0.0.1:27017/colecaoDiscos';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    process.exit(1); // Sai da aplicação em caso de falha na conexão
  }
};

export default connectDB;