import { DollarSign, Layers, Users, TrendingUp, Shield, Zap, Wallet, Globe, Target, Award, Gem, Clock, ArrowUp, Network, Gift, Calculator, Percent, Rocket, Brain, Key, Link, Bot, Sparkles, Scale, Eye, Radio, Infinity, Lock, Lightbulb, HeartHandshake, Timer, RefreshCw, Crown, Star, Compass, Flame, Medal, Trophy, Flag, Anchor, Coins, PiggyBank } from "lucide-react";

export interface FAQItem {
    question: string;
    answer: string;
    icon: string;
    color: string;
}

const colors = {
    primary: "292 91% 61%",
    secondary: "183 100% 50%",
    accent: "110 100% 54%",
    gold: "45 100% 50%",
    purple: "270 80% 60%",
    orange: "30 100% 55%",
    blue: "210 100% 55%",
    teal: "175 80% 45%",
};

const colorArray = Object.values(colors);

export const faqData: FAQItem[] = [
    { question: "¿Cuál es el aporte inicial en USDT para comenzar en la plataforma Tribu?", answer: "Se requiere un aporte de 50 USDT.", icon: "DollarSign", color: colors.secondary },
    { question: "¿Qué costo adicional de pasarela de pago se suma al aporte inicial en Tribu?", answer: "Se suma un costo de 1.30 USDT de la pasarela de pago.", icon: "Calculator", color: colorArray[1] },
    { question: "Para unirse a Tribu, una persona siempre debe ser referida por _____, a través de una invitación.", answer: "Alguien", icon: "Users", color: colorArray[2] },
    { question: "¿Cuál es el nombre de la primera fase en la que todos los miembros de Tribu comienzan?", answer: "La Zona Cristal.", icon: "Gem", color: colorArray[3] },
    { question: "Nombra las cuatro fases de progresión en Tribu, en orden.", answer: "Cristal, Zafiro, Esmeralda y Diamante.", icon: "Layers", color: colorArray[4] },
    { question: "¿Cuál es la posición inicial que ocupa todo nuevo miembro al entrar en un tablero de Tribu?", answer: "La posición de Pionero.", icon: "Flag", color: colorArray[5] },
    { question: "En un tablero de Tribu, ¿cuál es el nombre de la posición central que recibe los regalos?", answer: "Maestro.", icon: "Crown", color: colorArray[6] },
    { question: "Enumera las cuatro posiciones por las que pasa un miembro dentro de un tablero de Tribu hasta llegar al centro.", answer: "Pionero, Forjador, Consejero y Maestro.", icon: "ArrowUp", color: colorArray[7] },
    { question: "¿Cuántos Pioneros deben completar un tablero para que este avance y se divida?", answer: "Se deben llenar las ocho posiciones de pionero (cuatro por hemisferio).", icon: "Target", color: colorArray[0] },
    { question: "Concepto: Acopio (en Tribu)", answer: "Es un fondo comunitario que se genera con una porción de las ganancias de cada miembro al salir de un tablero, destinado a apoyar a los tableros más antiguos.", icon: "PiggyBank", color: colorArray[1] },
    { question: "¿Cuál es la ganancia neta en USDT que recibe un miembro al completar la Zona Cristal por primera vez?", answer: "Recibe 85 USDT.", icon: "Coins", color: colorArray[2] },
    { question: "Del total generado en la primera vuelta de la Zona Cristal, ¿cuánto se destina automáticamente para avanzar a la Zona Zafiro?", answer: "Se destinan 150 USDT.", icon: "TrendingUp", color: colorArray[3] },
    { question: "Del total generado en la primera vuelta de la Zona Cristal, ¿cuánto se utiliza para que el miembro repita la fase?", answer: "Se utilizan 50 USDT.", icon: "RefreshCw", color: colorArray[4] },
    { question: "¿Qué cantidad se aporta al \"Acopio\" cada vez que un miembro completa la Zona Cristal?", answer: "Se aportan 100 USDT.", icon: "HeartHandshake", color: colorArray[5] },
    { question: "¿Cuál es la ganancia neta en USDT al completar la Zona Cristal a partir de la segunda vuelta en adelante?", answer: "Se reciben 212.5 USDT.", icon: "Sparkles", color: colorArray[6] },
    { question: "¿Qué comisión recibe un patrocinador cuando su referido directo completa la Zona Cristal por primera vez?", answer: "Recibe 3 USDT.", icon: "Gift", color: colorArray[7] },
    { question: "¿Qué comisión recibe un patrocinador cuando su referido indirecto (nieto) completa la Zona Cristal por primera vez?", answer: "Recibe 2 USDT.", icon: "Network", color: colorArray[0] },
    { question: "A partir de la segunda vuelta, ¿cuál es la comisión por un referido directo que completa la Zona Cristal?", answer: "Es de 7.5 USDT.", icon: "Zap", color: colorArray[1] },
    { question: "A partir de la segunda vuelta, ¿cuál es la comisión por un referido indirecto (nieto) que completa la Zona Cristal?", answer: "Es de 5 USDT.", icon: "Link", color: colorArray[2] },
    { question: "¿Qué porcentaje total de las ganancias de un ciclo se retiene para comisiones (5%) y para la plataforma (10%)?", answer: "Se retiene un 15% en total.", icon: "Percent", color: colorArray[3] },
    { question: "¿Requiere un miembro hacer un pago de su bolsillo para entrar en la Zona Zafiro?", answer: "No, el sistema lo posiciona automáticamente usando las ganancias de la Zona Cristal.", icon: "Bot", color: colorArray[4] },
    { question: "¿Cuál es la ganancia neta en USDT al completar la Zona Zafiro por primera vez?", answer: "Se reciben 382.5 USDT.", icon: "Gem", color: colorArray[5] },
    { question: "De la ganancia de la primera vuelta en Zafiro, ¿qué cantidad se usa para posicionar al miembro en la Zona Esmeralda?", answer: "Se usan 500 USDT.", icon: "Rocket", color: colorArray[6] },
    { question: "¿Cuál es la ganancia neta en USDT al completar la Zona Zafiro a partir de la segunda vuelta?", answer: "Se reciben 807.5 USDT.", icon: "TrendingUp", color: colorArray[7] },
    { question: "¿Qué comisión se gana por un referido directo que completa la Zona Zafiro por primera vez?", answer: "Se ganan 13.5 USDT.", icon: "Award", color: colorArray[0] },
    { question: "¿Qué comisión se gana por un referido indirecto (nieto) que completa la Zona Zafiro por primera vez?", answer: "Se ganan 9 USDT.", icon: "Users", color: colorArray[1] },
    { question: "A partir de la segunda vuelta en Zafiro, la comisión por un referido directo es de _____ USDT.", answer: "28.5", icon: "Star", color: colorArray[2] },
    { question: "A partir de la segunda vuelta en Zafiro, la comisión por un referido indirecto (nieto) es de _____ USDT.", answer: "19", icon: "Medal", color: colorArray[3] },
    { question: "¿Cuál es el valor de entrada para la Zona Esmeralda?", answer: "El valor de entrada es de 500 USDT, tomados de las ganancias anteriores.", icon: "Key", color: colorArray[4] },
    { question: "¿Cuál es la ganancia neta en USDT al completar la Zona Esmeralda por primera vez?", answer: "Se reciben 1190 USDT.", icon: "Sparkles", color: colorArray[5] },
    { question: "De la ganancia de la primera vuelta en Esmeralda, ¿qué cantidad se usa para posicionar al miembro en la Zona Diamante?", answer: "Se usan 2000 USDT.", icon: "Trophy", color: colorArray[6] },
    { question: "¿Cuál es la ganancia neta en USDT al completar la Zona Esmeralda a partir de la segunda vuelta?", answer: "Se reciben 2890 USDT.", icon: "Flame", color: colorArray[7] },
    { question: "La comisión por un referido directo que completa la Zona Esmeralda por primera vez es de _____ USDT.", answer: "42", icon: "Gift", color: colorArray[0] },
    { question: "La comisión por un referido indirecto (nieto) que completa la Zona Esmeralda por primera vez es de _____ USDT.", answer: "28", icon: "Network", color: colorArray[1] },
    { question: "A partir de la segunda vuelta en Esmeralda, la comisión por un referido directo es de _____ USDT.", answer: "102", icon: "Zap", color: colorArray[2] },
    { question: "A partir de la segunda vuelta en Esmeralda, la comisión por un referido indirecto (nieto) es de _____ USDT.", answer: "68", icon: "Link", color: colorArray[3] },
    { question: "¿Cuál es el valor de entrada para la fase final, la Zona Diamante?", answer: "El valor de entrada es de 2000 USDT.", icon: "Crown", color: colorArray[4] },
    { question: "¿Cuál es la ganancia neta en USDT que se recibe cada vez que se completa la Zona Diamante?", answer: "Se reciben 11,815 USDT.", icon: "Trophy", color: colorArray[5] },
    { question: "Al no haber una quinta fase después de Diamante, ¿qué ocurre con el fondo de avance?", answer: "No se descuenta ningún fondo para avanzar, lo que aumenta la ganancia neta para el miembro.", icon: "Infinity", color: colorArray[6] },
    { question: "¿Qué comisión se recibe por un referido directo que completa la Zona Diamante?", answer: "Se reciben 417 USDT.", icon: "DollarSign", color: colorArray[7] },
    { question: "¿Qué comisión se recibe por un referido indirecto (nieto) que completa la Zona Diamante?", answer: "Se reciben 278 USDT.", icon: "Coins", color: colorArray[0] },
    { question: "¿Qué tecnologías clave utiliza Tribu para asegurar que el proceso sea transparente y automático?", answer: "Utiliza la tecnología blockchain y los smart contracts (contratos inteligentes).", icon: "Shield", color: colorArray[1] },
    { question: "Según uno de los oradores, la \"verdadera ganancia\" de Tribu reside en la fase de _____, debido a la frecuencia con que se puede ciclar.", answer: "Cristal", icon: "Gem", color: colorArray[2] },
    { question: "¿Qué sucede si un miembro, a partir de la segunda vuelta en Cristal, no ha traído a sus dos referidos?", answer: "El sistema le debita el equivalente a dos aportes y crea dos posiciones para apoyar al tablero donde esa persona comenzó.", icon: "Bot", color: colorArray[3] },
    { question: "La \"cuenta matriz\" de Tribu está diseñada para seguir y apoyar siempre al tablero más _____.", answer: "Antiguo", icon: "Anchor", color: colorArray[4] },
    { question: "¿Con qué frecuencia el sistema del \"Acopio\" verifica si puede ayudar al tablero más antiguo?", answer: "Cada 2 horas.", icon: "Timer", color: colorArray[5] },
    { question: "¿Quién es la única persona en un tablero que puede visualizar los dos hemisferios simultáneamente?", answer: "El Maestro (la persona en el centro).", icon: "Eye", color: colorArray[6] },
    { question: "Si un miembro se encuentra en un hemisferio de un tablero, su enfoque de trabajo debe estar en llenar las posiciones de _____", answer: "Su propio hemisferio", icon: "Target", color: colorArray[7] },
    { question: "¿Cuál es el lema principal de Tribu que se repite en la canción y presentaciones?", answer: "\"Si tú ganas, yo gano. Esa es la verdad.\"", icon: "HeartHandshake", color: colorArray[0] },
    { question: "En la canción de Tribu, se menciona que en el año _____ \"la historia cambió\".", answer: "2026", icon: "Sparkles", color: colorArray[1] },
    { question: "¿Cuál es la criptomoneda y la red específica que se utiliza para todas las transacciones en Tribu?", answer: "USDT en la red de BEP20 (Binance Smart Chain).", icon: "Wallet", color: colorArray[2] },
    { question: "El orador describe el modelo de Tribu no como un círculo, sino como una _____, donde se va subiendo progresivamente.", answer: "Espiral ascendente", icon: "TrendingUp", color: colorArray[3] },
    { question: "Cuando un hemisferio de un tablero se llena, ¿qué sucede con el Consejero de ese hemisferio?", answer: "Pasa a la posición de Maestro en un nuevo tablero.", icon: "Crown", color: colorArray[4] },
    { question: "La distribución de los regalos al Maestro se realiza en dos partes, una al llenarse el primer _____ y la otra al llenarse el segundo.", answer: "Hemisferio", icon: "Globe", color: colorArray[5] },
    { question: "Cuando el sistema crea posiciones para un usuario que no refirió a nadie, ¿qué ocurre con esas posiciones cuando llegan al centro?", answer: "Desaparecen, ya que no reciben regalo y su propósito es solo impulsar el tablero.", icon: "Compass", color: colorArray[6] },
    { question: "Según la recomendación del orador, ¿cuál es la estrategia más efectiva en Tribu en lugar de tener muchos directos?", answer: "Tener dos directos y apoyarlos para que crezcan en profundidad.", icon: "Brain", color: colorArray[7] },
];
