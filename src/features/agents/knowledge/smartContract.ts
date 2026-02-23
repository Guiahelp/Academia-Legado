import { faqData } from '@/shared/lib/faqData';

export const SMART_CONTRACT_KNOWLEDGE = `
--- CONOCIMIENTO DE DOMINIO: FUNCIONAMIENTO DEL SMART CONTRACT ---
Información estricta y técnica. Usar SOLO si el usuario hace preguntas directas sobre cómo funciona el dinero, los pagos, las mesas o el contrato. Si la pregunta es sobre mentalidad, ventas o academia, ignora esta sección.

1. NATURALEZA DEL NEGOCIO
- No somos una empresa ni plataforma de inversión.
- Somos una Academia Educativa acoplada a un Contrato Inteligente Descentralizado de economía colaborativa al 100%.

2. ¿CÓMO CIRCULA EL DINERO? (100% P2P)
- El 100% de los aportes (aportes de $50 USDT, etc.) viaja de Billetera a Billetera.
- La academia/creadores NO tocan el dinero, NO retienen fondos y NO pueden "congelar" pagos.
- No hay que "pedir retiros", el dinero llega en tiempo real a la billetera cripto personal (Trust Wallet, MetaMask) del usuario.

3. ESTRUCTURA DE MESAS Y CICLADO (S6)
- El contrato opera mediante matrices de 6 posiciones debajo del usuario (2 en el primer nivel, 4 en el segundo nivel).
- Nivel 1 (2 posiciones directas): Estos pagos NO van para el usuario, suben a su patrocinador (Línea Ascendente).
- Nivel 2 (4 posiciones indirectas/directas): 
  a) Posición 1, 2 y 3: Estos pagos caen 100% directos a la billetera del usuario en tiempo real.
  b) Posición 4 (El Reciclaje): Este último pago NO va al usuario. Se utiliza automáticamente para "limpiar" o "reciclar" la matriz. Vuelve a comprar la misma mesa vacía para que el usuario pueda volver a cobrar infinitas veces, y ese pago sube al patrocinador.

4. EL COSTO DE RED Y GAS
- Aunque el aporte es en USDT (Tether), la red funciona sobre la BNB Chain (BEP-20) o Polygon (MATIC).
- Siempre se necesita una fracción de moneda nativa (BNB o MATIC) para pagar el "Gas Fee" (Comisión de red) que firman el contrato. Sin Gas, el contrato no puede disparar los cobros P2P.

5. PREGUNTAS FRECUENTES (BASE DE DATOS EXACTA)
A continuación la lista estricta de preguntas y respuestas oficiales. Si el usuario pregunta algo relacionado, usa esta información literal:
${faqData.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}

REGLA DE ORO DE RESPUESTA SOBRE EL CONTRATO:
Nunca uses términos como "Inversión", "ROI", o "Retorno garantizado". Se habla de "Aporte", "Ciclos", "Crecimiento de Red" y "Economía Colaborativa".
------------------------------------------------------------------
`;
