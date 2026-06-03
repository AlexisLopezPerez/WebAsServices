<div align="center">

# WebAsServices

[![GitHub last commit](https://img.shields.io/github/last-commit/ajgutierr3z/WebAsServices)](https://github.com/ajgutierr3z/WebAsServices/commits/main)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ajgutierr3z/WebAsServices)](https://github.com/ajgutierr3z/WebAsServices/pulls)
[![CI Status](https://github.com/ajgutierr3z/WebAsServices/actions/workflows/revisar.yml/badge.svg)](https://github.com/ajgutierr3z/WebAsServices/actions)
[![GitHub stars](https://img.shields.io/github/stars/ajgutierr3z/WebAsServices)](https://github.com/ajgutierr3z/WebAsServices/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



</div>


Repositorio oficial de la materia **Aplicaciones Web Orientada a Servicios**. Aquí encontrarás todos los códigos de ejemplo que usaremos en clase y la base para que realices tus prácticas.


---

## 📑 Tabla de Contenidos

- [📚 Estructura del Repositorio](#-estructura-del-repositorio)
- [🚀 Flujo de Trabajo para Alumnos (¿cómo entregar tu práctica?)](#-flujo-de-trabajo-para-alumnos-c%C3%B3mo-entregar-tu-pr%C3%A1ctica)
- [🤖 Automatización CI/CD](#-automatización-cicd)
- [📊 Estadísticas de Entregas](#-estadísticas-de-entregas)
- [📖 Licencia y Contacto](#licencia-y-contacto)
---


## 📚 Estructura del Repositorio

> ⚠️ **Para alumnos:** Solo deben modificar los archivos dentro de la carpeta indicada para cada práctica. El resto del repositorio es material de ejemplo del profesor.

| Carpeta | Propósito | ¿Los alumnos modifican? |
|---------|-----------|------------------------|
| `APIRest/` | Ejemplo base de API "Hola Mundo" y plantilla para la primera práctica. | ✅ **Sí** (aquí harán sus entregas) |
| `demo_soa/` | Demostraciones de arquitectura orientada a servicios. | ❌ No (solo lectura) |
| *(Futuras carpetas)* | *Se irán explicando en clase según se agreguen.* | *Dependerá del ejercicio* |

---

## 🚀 Flujo de Trabajo para Alumnos (Cómo entregar tu práctica)

Seguirás el flujo estándar de colaboración en GitHub: **Fork → Clonar → Modificar → Pull Request**.

### Paso 1: Haz un Fork
1. Asegúrate de tener una [cuenta de GitHub gratuita](https://github.com/join).
2. Ve al repositorio original: `https://github.com/ajgutierr3z/WebAsServices`
3. Haz clic en el botón **Fork** (esquina superior derecha).

### Paso 2: Clona tu Fork
```bash
git clone https://github.com/TU_USUARIO/WebAsServices.git
cd WebAsServices
```

### Paso 3: Modifica (solo la carpeta que se indicada)
Ejemplo para la primera práctica: crea un archivo dentro de APIRest/ con tu nombre:
```php
# Si usas PHP
echo "<?php echo 'Hola desde [Tu Nombre]'; ?>" > APIRest/tu_nombre.php
```
o python
```python
# Si usas Python
echo "print('Hola desde [Tu Nombre]')" > APIRest/tu_nombre.py
```
### Paso 4: Sube los cambios
```bash
git add .
git commit -m "Práctica: [Tu Nombre Completo]"
git push origin main
```
### Paso 5: Crea el Pull Request (PR)
- Ve a tu fork en GitHub.
- Haz clic en "Compare & pull request" (botón amarillo).
- Verifica que diga:
```bash
base repository: ajgutierr3z/WebAsServices ←
head repository: TU_USUARIO/WebAsServices
```
- Escribe un título (ej. "Entrega de [Tu Nombre]") y haz clic en "Create pull request".
- ✅ Listo. Tu entrega queda registrada. No es necesario que yo haga merge.
> 📖 Para más detalles, consulta la guía completa en el [blog de Frexus](https://www.frexus.dev/post/github-y-pull-requests/).

---
## 🤖 Automatización CI/CD

Este repositorio utiliza **GitHub Actions** para automatizar la revisión de entregas.

### ¿Qué valida automáticamente?

| Validación | Estado | Descripción |
|------------|--------|-------------|
| Protección `demo_soa/` | ✅ Activo | Bloquea modificaciones a ejemplos del profesor |
| Protección `.github/` | ✅ Activo | Protege la configuración del CI |
| Sintaxis PHP/Python/JS | ✅ Activo | Verifica que el código sea válido |
| Tamaño de archivos | ✅ Activo | Limita archivos a 100KB |
| Extensiones permitidas | ✅ Activo | Solo .php, .py, .js, .html, .css |

### 📊 Resultados en cada PR

Cuando un alumno crea un Pull Request, el CI:
1. **Revisa automáticamente** la estructura
2. **Deja un comentario** con los resultados
3. **Agrega labels** como `auto-validado`
4. **No cierra el PR** (el profesor lo hace manualmente)

![Estado del CI](https://github.com/ajgutierr3z/WebAsServices/actions/workflows/revisar.yml/badge.svg)

---
## 📊 Estadísticas de Entregas

### 📈 Métricas del repositorio

| Métrica | Valor |
|---------|-------|
| Total de PRs | ![GitHub pull requests](https://img.shields.io/github/issues-pr/ajgutierr3z/WebAsServices) |
| Entregas validadas |  ![PRs Cerrados](https://img.shields.io/github/issues-pr-closed/ajgutierr3z/WebAsServices?label=&color=success) |
| Alumnos activos | ![GitHub forks](https://img.shields.io/github/forks/ajgutierr3z/WebAsServices?label=&color=informational) |
| Cobertura de prácticas | Todas|

### 🏷️ Estado de las entregas

Usamos labels para clasificar los PRs:

- 🟢 `entrega-completa` - Entregas que cumplen todos los requisitos
- 🟡 `needs-feedback` - Esperando revisión del profesor
- 🔵 `feedback-dado` - Ya se proporcionó retroalimentación
- 🟣 `ejemplo-destacado` - Casos destacados

### 📊 Dashboard visual

Puedes ver el tablero de proyectos aquí:  
[![Project Status](https://img.shields.io/badge/Project-Kanban-blue)](https://github.com/users/ajgutierr3z/projects/2)

---

### ¿Qué esperar después de tu PR?
| Acción del profesor	| ¿Qué significa para ti?|
|---------------------|------------------------|
|Comentario en el PR	| Revisé tu código, puede tener feedback para mejorar.|
|PR cerrado (sin merge)|	Entregaste correctamente, la práctica queda registrada.|
|PR cerrado (con merge)|	Tu código fue incorporado al repositorio principal (casos excepcionales).|
---
### ¿Por qué usar Pull Requests y no enviar archivos?
- Aprendes el flujo real que se usa en todas las empresas de software.
- Recibes feedback en el código línea por línea.
- Todo queda trazable para tu portafolio.

### Licencia y contacto
- Profesor: Alfredo de Jesús Gutiérrez Gómez
- Blog: [frexus.dev](www.frexus.dev)
- Propósito: Exclusivamente educativo.
- Licencia: MIT (puedes usar el código, pero cita la fuente).

