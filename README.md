# EFI2_javascript

# Integrantes:
Ibarra Sergio Matías: Matias-Ibarra24
Garay Santiago: sgaray512

# Enlace al backend (API Flask)
https://github.com/sgaray512/EFI2_python

# Instalaciones previas
## Instalar nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
Cargar nvm: Después de instalar, necesitas cargar nvm en la sesión actual de la terminal:
source ~/.nvm/nvm.sh
## Instalar Node.js usando nvm: Una vez nvm esté instalado, puedes instalar la versión LTS (Long Term Support) de Node.js:
nvm install --lts
Esto instalará la versión más reciente de Node.js recomendada para la mayoría de los usuarios.
Verificar la instalación: Para asegurarse de que Node.js y npm se instalaron correctamente, puedes ejecutar:
node -v
Esto mostrará la versión instalada de Node.js.
npm -v
Esto mostrará la versión instalada de npm.

# Clonar el repositorio (SSH)
git clone git@github.com:sgaray512/EFI2_javascript.git

# Instalar dependencias (package.json)
dentro de la carpeta donde se clonó el repositorio (EFI2_javascript):
npm install

# Para correr el proyecto
npm run dev