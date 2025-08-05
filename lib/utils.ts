import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calcula cuánto tiempo ha pasado desde una fecha dada 
// y lo devuelve como una cadena en español (ej: hace 3 días).
export function timeAgo(timestamp: string): string{
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: {[key: string]: number} = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    dia: 864000,
    hora: 3600,
    minuto: 60,
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1){
      return `hace ${count} ${unit}${count > 1 ? 's' : ''}`;
    }
  }
  return 'Justo Ahora';
}


// Genera una cadena aleatoria de una longitud dada
export function generateRandomString(length = 10){
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk¿lmnopqrstuvwxyz0123456789";
  let result = '';
  for (let i = 0; i < length; i++){
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}