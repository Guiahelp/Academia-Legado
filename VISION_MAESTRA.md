# Visión Maestra: Tribu Legado (Academia Legado)

Este documento es el **Norte Conceptual** del proyecto. Dicta el propósito, modelo de negocio, flujo de usuario y arquitectura a largo plazo de la plataforma. Cualquier desarrollo futuro debe alinearse con estos principios.

## 1. El Concepto y Propósito Principal
Tribu Legado no es solo un sistema de citas ni una simple página web; es un **Embudo Educativo Gamificado** diseñado para transformar a personas sin experiencia previa en profesionales del marketing digital, la tecnología (IA/Blockchain) y la prospección.

*   **Identidad Pública**: Academia de educación, formación y capacitación en la nueva economía digital.
*   **Modelo de Ingreso**: La plataforma ofrece educación premium. **No somos una comunidad que ofrece beneficios económicos directos ni un sistema de inversión**.
*   **Valor Agregado (Contrato Inteligente)**: De forma externa y como un beneficio opcional, existe una economía colaborativa operada por un contrato inteligente (Smart Contract). Si el emprendedor decide participar con $50 USD (pago único externo), puede generar beneficios económicos producto del crecimiento de su red, pero **nuestra promesa de valor se centra en otorgar acceso vitalicio a educación en IA, Web3 y embudos, retribuyendo con conocimiento y herramientas cualquier inversión.**

## 2. Flujo del Usuario (User Journey)

1.  **Atracción (Landing Page)**: Diseño simple, premium (dark/neon), con un CTA claro: "Iniciar Viaje Legado".
2.  **Onboarding Interactivo (Agentes IA)**: El usuario es recibido por Nikola y Albert. A través de libretos específicos, captan la atención y establecen el marco mental.
3.  **Conversión (Video Pitch)**: Tras la interacción con la IA, un video de 3 minutos explica a fondo el ecosistema: la sinergia entre IA, blockchain, comunidad y la economía colaborativa de $50 USD.
4.  **Operación (La WebApp)**: Una vez dentro, el usuario tiene acceso a dos núcleos principales: La Academia y La Guía del Éxito.

## 3. Componentes Core de la Plataforma

### A. La Academia (Educación Gamificada)
*   Contenidos estructurados por módulos (Cripto, IA, Marketing).
*   **Mecánica de Desbloqueo**: El contenido no está disponible de golpe. Para avanzar, el usuario DEBE demostrar aprendizaje mediante acciones concretas (Quizzes, validaciones interactivas).
*   *Objetivo*: Dar alto valor al esfuerzo y asegurar el consumo real del material.

### B. La Guía del Éxito (El Mapa de Acción)
*   Sistema de 9 pasos para enseñar a prospectar y usar tecnología "como a un niño de primaria".
*   **Asistencia Continua**: Nikola y Albert acompañan cada paso del camino (Ej: obligando a firmar el "Contrato Psicológico").
*   *Objetivo*: Que el usuario pase de perseguir prospectos a ser buscado (Inbound Marketing).

## 4. Progresión del Usuario (Gamification & Upgrades)

El sistema premia el esfuerzo y los resultados, no solo el pago inicial:
*   **Nivel 1 (Iniciado)**: Interacción manual/texto en la WebApp. Acceso a módulos básicos.
*   **Nivel 2 (Avanzado)**: Desbloqueo de herramientas premium como el Bot de Telegram (acciones por voz, CRM hands-free).
*   **Nivel 3 (Emprendedor Expansión)**: Clonación del sistema. Obtienen su propia **WebApp Personalizada** (subdominio/dominio).

## 5. Arquitectura Técnica a Futuro (Modelo Master-Tenant)

*   La aplicación actual (`tribukegadosaas`) funciona como la **WebApp Maestra**.
*   A futuro, la infraestructura debe permitir que los usuarios nivel "Emprendedor Expansión" tengan instancias personalizadas.
*   **Regla de Oro Architectónica**: Cualquier actualización de contenido, código o estrategia en la "Maestra" debe propagarse automáticamente hacia todas las réplicas/subdominios de los miembros de la comunidad. No se deben crear silos desconectados.

---
*Documento autogenerado en memoria tras la directiva del Arquitecto (2026).*
