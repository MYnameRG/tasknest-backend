export default Object.freeze({
    "PORT": process.env.PORT,
    "NODE_ENV": process.env.NODE_ENV,
    "MONGODB_URI": process.env.MONGODB_URI,
    "JWT_SECRET": process.env.JWT_SECRET,
    "OPENAI_API_KEY": process.env.OPENAI_API_KEY,
    "GOOGLEAI_API_KEY": process.env.GOOGLEAI_API_KEY,
    "LLM_SERVICE_TYPE": process.env.LLM_SERVICE_TYPE,
    "LLM_MODEL_TYPE": process.env.LLM_MODEL_TYPE
});