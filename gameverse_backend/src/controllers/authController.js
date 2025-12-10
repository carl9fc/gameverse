const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { app } = require("../config/config");


exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
   
    if (!name || !email || !password)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });

   
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "El email ya está registrado" });

    
    const user = await User.create({ name, email, password });

   
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "Usuario registrado exitosamente",
    });
  } catch (err) {
    console.error("Error en registro:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Correo y contraseña requeridos" });

    
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

  
    const valid = await user.validatePassword(password);
    if (!valid) return res.status(400).json({ message: "Credenciales inválidas" });

    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      app.jwtSecret,
      { expiresIn: "7d" }
    );

   
    return res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
